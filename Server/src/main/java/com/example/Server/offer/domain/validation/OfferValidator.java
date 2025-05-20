package com.example.Server.offer.domain.validation;

import com.example.Server.exception.ValidationException;
import com.example.Server.offer.domain.dto.CreateOfferDTO;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Component
public class OfferValidator {
    public static void validateCreateRequest(CreateOfferDTO req) {
        StringBuilder error = new StringBuilder();

        if (req.getProductId() == null) {
            error.append("Product ID is required. ");
        }

        if (req.getBuyerId() == null) {
            error.append("Buyer ID is required. ");
        }

        if (req.getQuantity() <= 0) {
            error.append("Quantity must be greater than 0. ");
        }

        if (req.getPrice() == null || req.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            error.append("Price must be greater than 0. ");
        }

        if (req.getDuration() == null || req.getDuration().isBefore(ZonedDateTime.now())) {
            error.append("Duration date must be in the future. ");
        }

        if (req.getPaymentMethod() == null) {
            error.append("Payment Method is required");
        }

        if (req.getAddress() == null) {
            error.append("Address is required");
        }

        if (!error.isEmpty()) {
            throw new ValidationException(error.toString().trim());
        }
    }
}
