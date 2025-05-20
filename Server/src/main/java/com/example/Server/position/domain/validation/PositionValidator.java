package com.example.Server.position.domain.validation;

import com.example.Server.position.domain.dto.CreatePositionDTO;
import com.example.Server.exception.ValidationException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Component
public class PositionValidator {

    public static void validateCreateRequest(CreatePositionDTO req) {
        StringBuilder error = new StringBuilder();

        if (req.getProductId() == null) {
            error.append("Product ID is required. ");
        }

        if (req.getSellerId() == null) {
            error.append("Seller ID is required. ");
        }

        if (req.getPieces() <= 0) {
            error.append("Pieces must be greater than 0. ");
        }

        if (req.getMinPrice() == null || req.getMinPrice().compareTo(BigDecimal.ZERO) <= 0) {
            error.append("Min price must be greater than 0. ");
        }

        if (req.getExpirationDate() == null || req.getExpirationDate().isBefore(ZonedDateTime.now())) {
            error.append("Expiration date must be in the future. ");
        }

        if (!error.isEmpty()) {
            throw new ValidationException(error.toString().trim());
        }
    }
}
