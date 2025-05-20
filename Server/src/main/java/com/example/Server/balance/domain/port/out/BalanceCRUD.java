package com.example.Server.balance.domain.port.out;

import com.example.Server.balance.domain.model.Balance;

import java.math.BigDecimal;
import java.util.Optional;

public interface BalanceCRUD {

    Optional<Balance> findByUserId(Long userId);

    Balance save(Balance balance);
}
