package com.example.Server.offer.domain.port.in;

import com.example.Server.offer.domain.model.Offer;
import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

public interface OfferService {
    Offer createOffer(Long productId, Long buyerId, BigDecimal price, Integer quantity, ZonedDateTime duration, String paymentMethod, String address, Long positionId, String productTitle);
    List<Offer> getOffersByProductAndStatus(Long productId, @Nullable String statusFilter);
}
