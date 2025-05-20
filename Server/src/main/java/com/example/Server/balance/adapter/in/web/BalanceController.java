package com.example.Server.balance.adapter.in.web;

import com.example.Server.balance.domain.dto.BalanceDTO;
import com.example.Server.balance.domain.model.Balance;
import com.example.Server.balance.domain.port.in.BalanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BalanceController {

    private final BalanceService balanceService;

    public BalanceController(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    @GetMapping("/balance/{userId}")
    public ResponseEntity<Balance> getBalance(@PathVariable Long userId) {
        Balance balance = balanceService.getBalance(userId);
        return ResponseEntity.ok(balance);
    }
}
