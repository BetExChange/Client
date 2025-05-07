package com.example.Server.position.adapter.out.persistence;

import com.example.Server.position.domain.model.Position;
import com.example.Server.position.domain.dto.BestPositionsDTO;
import com.example.Server.position.domain.dto.PositionDTO;
import com.example.Server.position.domain.model.BestPositions;

public class PositionMapper {
    public static Position toDomain(PositionEntity e) {
        return new Position(
                e.getId(),
                e.getProductId(),
                e.getSellerId(),
                e.getMinPrice(),
                e.getPieces(),
                e.getExpirationDate(),
                e.getStatus()
        );
    }

    public static PositionEntity toEntity(Position p) {
        PositionEntity e = new PositionEntity();
        e.setId(p.getId());
        e.setProductId(p.getProductId());
        e.setSellerId(p.getSellerId());
        e.setMinPrice(p.getMinPrice());
        e.setPieces(p.getPieces());
        e.setExpirationDate(p.getExpirationDate());
        e.setStatus(p.getStatus());
        return e;
    }

    public static PositionDTO toDto(Position p) {
        PositionDTO d = new PositionDTO();
        d.setId(p.getId());
        d.setProductId(p.getProductId());
        d.setSellerId(p.getSellerId());
        d.setPieces(p.getPieces());
        d.setMinPrice(p.getMinPrice());
        d.setExpirationDate(p.getExpirationDate());
        d.setStatus(p.getStatus().name());
        return d;
    }

    public static BestPositionsDTO toDto(BestPositions b) {
        BestPositionsDTO d = new BestPositionsDTO();
        if (b.getBestPricePosition() != null) {
            d.setBestPricePosition(toDto(b.getBestPricePosition()));
        }
        if (b.getBestQuantityPosition() != null) {
            d.setBestQuantityPosition(toDto(b.getBestQuantityPosition()));
        }
        return d;
    }
}
