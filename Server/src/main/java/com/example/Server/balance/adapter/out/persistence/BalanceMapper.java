package com.example.Server.balance.adapter.out.persistence;

import com.example.Server.balance.domain.dto.BalanceDTO;
import com.example.Server.balance.domain.model.Balance;

public class BalanceMapper {
    public static Balance toDomain(BalanceEntity e) {
        return new Balance(
                e.getUserId(),
                e.getUserBalance()
        );
    }

    public static BalanceEntity toEntity(Balance b) {
        BalanceEntity e = new BalanceEntity();
        e.setUserId(b.getUserId());
        e.setUserBalance(b.getUserBalance());
        return e;
    }

    public static BalanceDTO toDto(Balance b) {
        BalanceDTO d = new BalanceDTO();
        d.setUserId(b.getUserId());
        d.setUserBalance(b.getUserBalance());
        return d;
    }
}
