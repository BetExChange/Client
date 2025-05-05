package com.example.Server.dto;

public class BestPositionsDTO {
    private PositionDTO bestPricePosition;
    private PositionDTO bestQuantityPosition;

    public BestPositionsDTO() {}

    public PositionDTO getBestPricePosition() {
        return bestPricePosition;
    }
    public void setBestPricePosition(PositionDTO bestPricePosition) {
        this.bestPricePosition = bestPricePosition;
    }

    public PositionDTO getBestQuantityPosition() {
        return bestQuantityPosition;
    }
    public void setBestQuantityPosition(PositionDTO bestQuantityPosition) {
        this.bestQuantityPosition = bestQuantityPosition;
    }
}