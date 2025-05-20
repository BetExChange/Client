package com.example.Server.offer.adapter.out.persistence;

import com.example.Server.offer.domain.model.Status;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "offers")
public class OfferEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="product_id", nullable=false)
    private Long productId;

    @Column(name="buyer_id", nullable=false)
    private Long buyerId;

    @Column(name="price", nullable=false)
    private BigDecimal price;

    @Column(name="quantity", nullable=false)
    private Integer quantity;

    @Column(name="duration", nullable=false)
    private ZonedDateTime duration;

    @Column(name="payment_method", nullable = false)
    private String paymentMethod;

    @Column(name="address", nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable=false)
    private Status status;

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
