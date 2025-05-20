package com.example.Server.offer.domain.service;

import com.example.Server.balance.domain.port.in.BalanceService;
import com.example.Server.notification.model.dto.CreateNotificationDTO;
import com.example.Server.notification.service.NotificationService;
import com.example.Server.offer.domain.model.Status;
import com.example.Server.offer.domain.model.Offer;
import com.example.Server.offer.domain.port.in.OfferService;
import com.example.Server.offer.domain.port.out.OfferCRUD;
import com.example.Server.position.domain.model.Position;
import com.example.Server.position.domain.port.out.PositionCRUD;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OfferServiceImpl implements OfferService {
    private final OfferCRUD offerRepository;
    private final PositionCRUD positionRepository;
    private final NotificationService notificationService;
    private final BalanceService balanceService;

    public OfferServiceImpl(OfferCRUD offerRepository, PositionCRUD positionRepository, NotificationService notificationService, BalanceService balanceService) {
        this.offerRepository = offerRepository;
        this.positionRepository = positionRepository;
        this.notificationService = notificationService;
        this.balanceService = balanceService;
    }

    @Override
    public Offer createOffer(Long productId, Long buyerId, BigDecimal price, Integer quantity, ZonedDateTime duration, String paymentMethod, String address, Long positionId, String productTitle){
        Offer offer = new Offer();
        offer.setProductId(productId);
        offer.setBuyerId(buyerId);
        offer.setPrice(price);
        offer.setQuantity(quantity);
        offer.setDuration(duration);
        offer.setPaymentMethod(paymentMethod);
        offer.setAddress(address);

        if (positionId != null) {
            // Explicit position passed: accept directly
            Position position = positionRepository.findById(positionId)
                    .orElseThrow(() -> new IllegalArgumentException("Position not found: " + positionId));
            if (offer.getStatus() == Status.valueOf("ACCEPTED")) {
                throw new IllegalStateException("Position already accepted: " + positionId);
            }

            // Mark both entities as accepted/traded
            position.setStatus(Status.valueOf("ACCEPTED"));
            positionRepository.save(position);

            offer.setStatus(Status.valueOf("ACCEPTED"));
            Offer saved = offerRepository.save(offer);

            // Send notifications

            notificationService.createNotification(new CreateNotificationDTO(
                    buyerId,
                    String.format("Your offer for product: %s has been matched!", productTitle)
            ));
            notificationService.createNotification(new CreateNotificationDTO(
                    position.getSellerId(),
                    String.format("A position for your product: %s has been matched!", productTitle)
            ));

            // Update balances: buyer pays, seller receives
            BigDecimal total = price.multiply(BigDecimal.valueOf(quantity));
            balanceService.transfer(offer.getBuyerId(), position.getSellerId(), total);
            return saved;
        }

        // No explicit position: attempt to find a matching one by criteria
        Optional<Position> matching = positionRepository.findAll().stream()
                .filter(p -> p.getProductId().equals(productId))
                .filter(p -> p.getMinPrice().compareTo(price) == 0)
                .filter(p -> Objects.equals(p.getPieces(), quantity))
                .filter(p -> p.getStatus() != Status.valueOf("ACCEPTED"))
                .findFirst();

        if (matching.isPresent()) {
            Position position = matching.get();
            // Accept match
            position.setStatus(Status.valueOf("ACCEPTED"));
            positionRepository.save(position);

            offer.setStatus(Status.valueOf("ACCEPTED"));
            Offer saved = offerRepository.save(offer);

            // Notifications
            notificationService.createNotification(new CreateNotificationDTO(
                    buyerId,
                    String.format("Your offer for product: %s has been matched!", productTitle)
            ));
            notificationService.createNotification(new CreateNotificationDTO(
                    position.getSellerId(),
                    String.format("A position for your product: %s has been matched!", productTitle)
            ));

            BigDecimal total = price.multiply(BigDecimal.valueOf(quantity));
            balanceService.transfer(offer.getBuyerId(), position.getSellerId(), total);
            return saved;
        }

        // No match: standard open offer
        offer.setStatus(Status.valueOf("OPEN"));

        // No transaction balance movement, but hold reserved funds if needed
        balanceService.reserve(buyerId, price.multiply(BigDecimal.valueOf(quantity)));
        return offerRepository.save(offer);
    }

    @Override
    public List<Offer> getOffersByProductAndStatus (Long productId, String statusFilter) {
        return offerRepository.findAll().stream()
                .filter(o -> o.getProductId().equals(productId))
                .filter(o -> statusFilter == null ||
                        o.getStatus().name().equalsIgnoreCase(statusFilter.trim()))
                .filter(Offer::isOpen)
                .collect(Collectors.toList());
    }
}
