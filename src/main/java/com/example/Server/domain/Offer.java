package com.example.Server.domain;

import com.example.Server.model.Status;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return status == Status.OPEN
                && duration.isAfter(ZonedDateTime.now());
    }

    /**
     * 1) Filter by product + optional status, then only open ones.
     */
    public static List<Offer> filterByProductAndStatus(
            List<Offer> all,
            Long productId,
            Optional<String> statusFilter) {

        return all.stream()
                .filter(o -> o.productId.equals(productId))
                .filter(o -> statusFilter.map(s -> o.status.name().equalsIgnoreCase(s)).orElse(true))
                .filter(Offer::isOpen)
                .collect(Collectors.toList());
    }

    /**
     * 2) Factory for new Offer.
     */
    public static Offer createNew(
            Long productId,
            Long buyerId,
            int quantity,
            BigDecimal price,
            ZonedDateTime duration,
            String paymentMethod,
            String address) {

        Offer o = new Offer();
        o.productId = productId;
        o.buyerId = buyerId;
        o.quantity = quantity;
        o.price = price;
        o.duration = duration;
        o.paymentMethod = paymentMethod;
        o.address = address;
        o.status = Status.OPEN;
        return o;
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
