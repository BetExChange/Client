package com.example.Server.position.domain.dto;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public class CreatePositionDTO {
    private Long productId;
    private Long sellerId;
    private Integer pieces;
    private BigDecimal minPrice;
    private ZonedDateTime expirationDate;

    public CreatePositionDTO() {}

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }

    public Integer getPieces() { return pieces; }
    public void setPieces(Integer pieces) { this.pieces = pieces; }

    public BigDecimal getMinPrice() { return minPrice; }
    public void setMinPrice(BigDecimal minPrice) { this.minPrice = minPrice; }

    public ZonedDateTime getExpirationDate() { return expirationDate; }
    public void setExpirationDate(ZonedDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }
}
