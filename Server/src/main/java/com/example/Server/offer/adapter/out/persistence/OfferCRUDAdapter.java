package com.example.Server.offer.adapter.out.persistence;

import com.example.Server.offer.domain.model.Offer;
import com.example.Server.offer.domain.port.out.OfferCRUD;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class OfferCRUDAdapter implements OfferCRUD {
    private final OfferJpaRepository jpa;

    public OfferCRUDAdapter(OfferJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Offer save(Offer domain) {
        OfferEntity entity = OfferMapper.toEntity(domain);
        OfferEntity saved  = jpa.save(entity);
        return OfferMapper.toDomain(saved);
    }

    @Override
    public Optional<Offer> findById(Long id) {
        return jpa.findById(id)
                .map(OfferMapper::toDomain);
    }

    @Override
    public List<Offer> findAll() {
        return jpa.findAll().stream()
                .map(OfferMapper::toDomain)
                .collect(Collectors.toList());
    }
}
