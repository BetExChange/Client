package com.example.Server.balance.domain.model;

import java.math.BigDecimal;

public class Balance {
    private Long userId;
    private BigDecimal userBalance;

    public Balance() {};

    public Balance(Long userId, BigDecimal userBalance) {
        this.userId = userId;
        this.userBalance = userBalance;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getUserBalance() {
        return userBalance;
    }

    public void setUserBalance(BigDecimal userBalance) {
        this.userBalance = userBalance;
    }
}
