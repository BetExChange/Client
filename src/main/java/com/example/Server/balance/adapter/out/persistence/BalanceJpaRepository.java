package com.example.Server.balance.adapter.out.persistence;

import com.example.Server.offer.adapter.out.persistence.OfferEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceJpaRepository extends JpaRepository<BalanceEntity, Long> {
}
