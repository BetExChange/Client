package com.example.Server.port.in;

import com.example.Server.model.BestPositions;
import com.example.Server.domain.Position;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

public interface PositionService {
    Position createPosition(Long productId, Long sellerId, int pieces, BigDecimal minPrice, ZonedDateTime expirationDate);
    List<Position> getPositionsByProductAndStatus(Long productId, Optional<String> statusFilter);
    List<Position> getPositionsByUserAndProduct(Long userId, Long productId);
    BestPositions getBestOpenPositions(Long productId);
    void deletePosition(Long positionId);
}

