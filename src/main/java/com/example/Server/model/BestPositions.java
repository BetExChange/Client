package com.example.Server.model;

import com.example.Server.domain.Position;

public class BestPositions {
    private final Position bestPricePosition;
    private final Position bestQuantityPosition;

    public BestPositions(Position bestPrice, Position bestQuantity) {
        this.bestPricePosition = bestPrice;
        this.bestQuantityPosition = bestQuantity;
    }

    public Position getBestPricePosition() {
        return bestPricePosition;
    }
    public Position getBestQuantityPosition() {
        return bestQuantityPosition;
    }
}
