package com.example.Server.balance.domain.dto;

import java.math.BigDecimal;

public class BalanceDTO {
    private Long userId;
    private BigDecimal userBalance;

    public BalanceDTO() {};

    public BigDecimal getUserBalance() {
        return userBalance;
    }

    public void setUserBalance(BigDecimal userBalance) {
        this.userBalance = userBalance;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
