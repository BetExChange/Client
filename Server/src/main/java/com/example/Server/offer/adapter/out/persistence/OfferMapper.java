package com.example.Server.offer.adapter.out.persistence;

import com.example.Server.offer.domain.dto.OfferDTO;
import com.example.Server.offer.domain.model.Offer;

public class OfferMapper {
    public static Offer toDomain(OfferEntity e) {
        return new Offer(
                e.getId(),
                e.getProductId(),
                e.getBuyerId(),
                e.getPrice(),
                e.getQuantity(),
                e.getDuration(),
                e.getPaymentMethod(),
                e.getAddress(),
                e.getStatus()
        );
    }

    public static OfferEntity toEntity(Offer o) {
        OfferEntity e = new OfferEntity();
        e.setId(o.getId());
        e.setProductId(o.getProductId());
        e.setBuyerId(o.getBuyerId());
        e.setPrice(o.getPrice());
        e.setQuantity(o.getQuantity());
        e.setDuration(o.getDuration());
        e.setPaymentMethod(o.getPaymentMethod());
        e.setAddress(o.getAddress());
        e.setStatus(o.getStatus());
        return e;
    }

    public static OfferDTO toDto(Offer o) {
        OfferDTO d = new OfferDTO();
        d.setId(o.getId());
        d.setProductId(o.getProductId());
        d.setBuyerId(o.getBuyerId());
        d.setQuantity(o.getQuantity());
        d.setPrice(o.getPrice());
        d.setDuration(o.getDuration());
        d.setPaymentMethod(o.getPaymentMethod());
        d.setAddress(o.getAddress());
        d.setStatus(o.getStatus().name());
        return d;
    }
}
