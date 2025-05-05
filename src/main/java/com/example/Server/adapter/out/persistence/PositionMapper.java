package com.example.Server.adapter.out.persistence;

import com.example.Server.domain.Position;
import com.example.Server.model.PositionEntity;

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
}
