package com.example.Server.balance.adapter.out.persistence;

import com.example.Server.balance.domain.model.Balance;
import com.example.Server.balance.domain.port.out.BalanceCRUD;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class BalanceCRUDAdapter implements BalanceCRUD {
    private final BalanceJpaRepository jpa;

    public BalanceCRUDAdapter(BalanceJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Optional<Balance> findByUserId(Long userId) {
        return jpa.findById(userId)
                .map(BalanceMapper::toDomain);
    }

    @Override
    public Balance save(Balance balance) {
        BalanceEntity entity = BalanceMapper.toEntity(balance);
        BalanceEntity saved = jpa.save(entity);
        return BalanceMapper.toDomain(saved);
    }
}
