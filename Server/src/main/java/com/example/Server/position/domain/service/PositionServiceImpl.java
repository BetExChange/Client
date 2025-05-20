package com.example.Server.position.domain.service;

import com.example.Server.balance.domain.port.in.BalanceService;
import com.example.Server.notification.model.dto.CreateNotificationDTO;
import com.example.Server.notification.service.NotificationService;
import com.example.Server.offer.domain.model.Offer;
import com.example.Server.offer.domain.model.Status;
import com.example.Server.offer.domain.port.out.OfferCRUD;
import com.example.Server.position.domain.port.in.PositionService;
import com.example.Server.position.domain.port.out.PositionCRUD;
import com.example.Server.position.domain.model.BestPositions;
import com.example.Server.position.domain.model.Position;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PositionServiceImpl implements PositionService {

    private final PositionCRUD positionRepository;
    private final OfferCRUD offerRepository;
    private final NotificationService notificationService;
    private final BalanceService balanceService;

    public PositionServiceImpl(PositionCRUD repository, OfferCRUD offerRepository, NotificationService notificationService, BalanceService balanceService) {
        this.positionRepository = repository;
        this.offerRepository = offerRepository;
        this.notificationService = notificationService;
        this.balanceService = balanceService;
    }

    @Override
    public Position createPosition(Long productId, Long sellerId, int pieces, BigDecimal minPrice, ZonedDateTime expirationDate, Long offerId, String productTitle) {
        Position position = new Position();
        position.setProductId(productId);
        position.setSellerId(sellerId);
        position.setPieces(pieces);
        position.setMinPrice(minPrice);
        position.setExpirationDate(expirationDate);

        if (offerId != null) {
            // Explicit offer passed: accept directly
            Offer offer = offerRepository.findById(offerId)
                    .orElseThrow(() -> new IllegalArgumentException("Offer not found: " + offerId));
            if (offer.getStatus() == Status.valueOf("ACCEPTED")) {
                throw new IllegalStateException("Offer already accepted: " + offerId);
            }

            // Mark both entities as accepted/traded
            offer.setStatus(Status.valueOf("ACCEPTED"));
            offerRepository.save(offer);

            position.setStatus(Status.valueOf("ACCEPTED"));
            Position saved = positionRepository.save(position);

            // Send notifications

            notificationService.createNotification(new CreateNotificationDTO(
                    offer.getBuyerId(),
                    String.format("Your offer for product %s has been matched!", productTitle)
            ));
            notificationService.createNotification(new CreateNotificationDTO(
                    sellerId,
                    String.format("Your position for product %s has been matched!", productTitle)
            ));

            // Update balances: buyer pays, seller receives
            BigDecimal total = minPrice.multiply(BigDecimal.valueOf(pieces));
            balanceService.transfer(offer.getBuyerId(), sellerId, total);
            return saved;
        }

        // No explicit offer: attempt to find a matching one by criteria
        Optional<Offer> matching = offerRepository.findAll().stream()
                .filter(o -> o.getProductId().equals(productId))
                .filter(o -> o.getPrice().compareTo(minPrice) == 0)
                .filter(o -> o.getQuantity().equals(pieces))
                .filter(o -> o.getStatus() != Status.valueOf("ACCEPTED"))
                .findFirst();

        if (matching.isPresent()) {
            Offer offer = matching.get();
            // Accept match
            offer.setStatus(Status.valueOf("ACCEPTED"));
            offerRepository.save(offer);

            position.setStatus(Status.valueOf("ACCEPTED"));
            Position saved = positionRepository.save(position);

            // Notifications
            notificationService.createNotification(new CreateNotificationDTO(
                    offer.getBuyerId(),
                    String.format("Your offer for product %s has been matched!", productTitle)
            ));
            notificationService.createNotification(new CreateNotificationDTO(
                    sellerId,
                    String.format("Your position for product %s has been matched!", productTitle)
            ));

            BigDecimal total = minPrice.multiply(BigDecimal.valueOf(pieces));
            balanceService.transfer(offer.getBuyerId(), sellerId, total);
            return saved;
        }

        // No match: standard open position
        position.setStatus(Status.valueOf("OPEN"));
        return positionRepository.save(position);
    }

    @Override
    public List<Position> getPositionsByProductAndStatus(Long productId, String statusFilter) {
        return positionRepository.findAll().stream()
                .filter(p -> p.getProductId().equals(productId))
                .filter(p -> statusFilter == null ||
                        p.getStatus().name().equalsIgnoreCase(statusFilter.trim()))
                .filter(Position::isOpen)
                .collect(Collectors.toList());
    }

    @Override
    public List<Position> getPositionsByUserAndProduct(Long userId, Long productId) {
        List<Position> all = positionRepository.findAll();
        return all.stream()
                .filter(p -> p.getSellerId().equals(userId)
                        && p.getProductId().equals(productId))
                .filter(Position::isOpen)
                .collect(Collectors.toList());
    }

    @Override
    public BestPositions getBestOpenPositions(Long productId) {
        List<Position> open = getPositionsByProductAndStatus(
                productId, "OPEN"
        );
        Optional<Position> bestPrice = open.stream()
                .filter(Position::isOpen)
                .min(Comparator.comparing(Position::getMinPrice));
        Optional<Position> bestQuantity = open.stream()
                .filter(Position::isOpen)
                .max(Comparator.comparing(Position::getPieces));
        return new BestPositions(bestPrice.orElse(null),
                bestQuantity.orElse(null));
    }

    @Override
    public void deletePosition(Long positionId) {
        Position position = positionRepository.findById(positionId)
                .orElseThrow(() -> new IllegalArgumentException("Position not found: " + positionId));
        position.ensureDeletable();
        positionRepository.delete(position);
    }
}
