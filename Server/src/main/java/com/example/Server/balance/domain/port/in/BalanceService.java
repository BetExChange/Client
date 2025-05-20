package com.example.Server.balance.domain.port.in;

import com.example.Server.balance.domain.model.Balance;

import java.math.BigDecimal;

public interface BalanceService {
    void transfer(Long buyerId, Long sellerId, BigDecimal total);
    Balance getBalance(Long userId);
    void reserve(Long userId, BigDecimal amount);
}
