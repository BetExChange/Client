package com.example.Server.position.domain.port.in;

import com.example.Server.position.domain.model.BestPositions;
import com.example.Server.position.domain.model.Position;
import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

public interface PositionService {
    Position createPosition(Long productId, Long sellerId, int pieces, BigDecimal minPrice, ZonedDateTime expirationDate);
    List<Position> getPositionsByProductAndStatus(Long productId, @Nullable String statusFilter);
    List<Position> getPositionsByUserAndProduct(Long userId, Long productId);
    BestPositions getBestOpenPositions(Long productId);
    void deletePosition(Long positionId);
}

