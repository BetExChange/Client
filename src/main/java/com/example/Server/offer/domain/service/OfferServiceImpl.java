package com.example.Server.offer.domain.service;

import com.example.Server.offer.domain.model.Status;
import com.example.Server.offer.domain.model.Offer;
import com.example.Server.offer.domain.port.in.OfferService;
import com.example.Server.offer.domain.port.out.OfferCRUD;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OfferServiceImpl implements OfferService {
    private final OfferCRUD repository;

    public OfferServiceImpl(OfferCRUD repository) {
        this.repository = repository;
    }

    @Override
    public Offer createOffer(Long productId, Long buyerId, BigDecimal price, Integer quantity, ZonedDateTime duration, String paymentMethod, String address){
        Offer offer = new Offer();
        offer.setProductId(productId);
        offer.setBuyerId(buyerId);
        offer.setPrice(price);
        offer.setQuantity(quantity);
        offer.setDuration(duration);
        offer.setPaymentMethod(paymentMethod);
        offer.setAddress(address);
        offer.setStatus(Status.valueOf("OPEN"));
        return repository.save(offer);
    }

    @Override
    public List<Offer> getOffersByProductAndStatus (Long productId, String statusFilter) {
        return repository.findAll().stream()
                .filter(o -> o.getProductId().equals(productId))
                .filter(o -> statusFilter == null ||
                        o.getStatus().name().equalsIgnoreCase(statusFilter.trim()))
                .filter(Offer::isOpen)
                .collect(Collectors.toList());
    }
}
