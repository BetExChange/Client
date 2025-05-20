package com.example.Server.balance.domain.service;

import com.example.Server.balance.domain.model.Balance;
import com.example.Server.balance.domain.port.in.BalanceService;
import com.example.Server.balance.domain.port.out.BalanceCRUD;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class BalanceServiceImpl implements BalanceService {

    private final BalanceCRUD balanceRepository;

    public BalanceServiceImpl(BalanceCRUD balanceRepository) {
        this.balanceRepository = balanceRepository;
    }

    @Override
    public void transfer(Long buyerId, Long sellerId, BigDecimal total) {
        Balance buyer = balanceRepository.findByUserId(buyerId)
                .orElseThrow(() -> new IllegalArgumentException("Buyer not found: " + buyerId));
        Balance seller = balanceRepository.findByUserId(sellerId)
                .orElseThrow(() -> new IllegalArgumentException("Seller not found: " + sellerId));

        if (buyer.getUserBalance().compareTo(total) < 0) {
            throw new IllegalStateException("Insufficient funds for user: " + buyerId);
        }

        // Perform transfer
        buyer.setUserBalance(buyer.getUserBalance().subtract(total));
        seller.setUserBalance(seller.getUserBalance().add(total));

        // Persist updated balances
        balanceRepository.save(buyer);
        balanceRepository.save(seller);

    }

    @Override
    public Balance getBalance(Long userId) {
        return balanceRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
    }

    @Override
    public void reserve(Long userId, BigDecimal amount) {
        Balance balance = balanceRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User balance not found"));

        if (balance.getUserBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Insufficient funds to reserve");
        }

        balance.setUserBalance(balance.getUserBalance().subtract(amount));
        balanceRepository.save(balance);
    }
}
