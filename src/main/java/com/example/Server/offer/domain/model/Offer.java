package com.example.Server.offer.domain.model;

import java.math.BigDecimal;
import java.time.*;

public class Offer {
    private Long id;
    private Long productId;
    private Long buyerId;
    private BigDecimal price;
    private Integer quantity;
    private ZonedDateTime duration;
    private String paymentMethod;
    private String address;
    private Status status;

    public Offer() {
    }

    public Offer(Long id, Long productId, Long buyerId, BigDecimal price, Integer quantity, ZonedDateTime duration, String paymentMethod, String address, Status status) {
        this.id = id;
        this.productId = productId;
        this.buyerId = buyerId;
        this.price = price;
        this.quantity = quantity;
        this.duration = duration;
        this.paymentMethod = paymentMethod;
        this.address = address;
        this.status = status;
    }

    public boolean isOpen() {
        ZoneId zone = ZoneId.systemDefault();

        LocalDateTime endOfToday = LocalDate
                .now(zone)
                .minusDays(1)
                .atTime(LocalTime.MAX);
        ZonedDateTime todayEndOfDay = endOfToday.atZone(zone);

        return status == Status.OPEN
                && !duration.isBefore(todayEndOfDay);
    }

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

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ZonedDateTime getDuration() {
        return duration;
    }

    public void setDuration(ZonedDateTime duration) {
        this.duration = duration;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
