package com.example.Server.domain;

import com.example.Server.model.Status;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

public class Position {
    private Long id;
    private Long productId;
    private Long sellerId;
    private BigDecimal minPrice;
    private Integer pieces;
    private ZonedDateTime expirationDate;
    private Status status;  // enum: OPEN, ACCEPTED, EXPIRED

    public Position() {}

    public Position(Long id, Long productId, Long sellerId, BigDecimal minPrice, Integer pieces, ZonedDateTime expirationDate, Status status) {
        this.id = id;
        this.productId = productId;
        this.sellerId = sellerId;
        this.minPrice = minPrice;
        this.pieces = pieces;
        this.expirationDate = expirationDate;
        this.status = status;
    }

    public boolean isOpen() {
        return status == Status.OPEN
                && expirationDate.isAfter(ZonedDateTime.now());
    }

    public void ensureDeletable() {
        if (status == Status.ACCEPTED) {
            throw new IllegalStateException("Cannot delete an accepted position");
        }
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getProductId() {
        return productId;
    }
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    public Long getSellerId() {
        return sellerId;
    }
    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }
    public BigDecimal getMinPrice() {
        return minPrice;
    }
    public void setMinPrice(BigDecimal minPrice) {
        this.minPrice = minPrice;
    }
    public Integer getPieces() {
        return pieces;
    }
    public void setPieces(Integer pieces) {
        this.pieces = pieces;
    }
    public ZonedDateTime getExpirationDate() {
        return expirationDate;
    }
    public void setExpirationDate(ZonedDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
}
