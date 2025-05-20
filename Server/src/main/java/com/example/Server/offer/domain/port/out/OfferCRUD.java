package com.example.Server.offer.domain.port.out;

import com.example.Server.offer.domain.model.Offer;

import java.util.List;
import java.util.Optional;

public interface OfferCRUD {
    Offer save(Offer offer);
    Optional<Offer> findById(Long id);
    List<Offer> findAll();
}
