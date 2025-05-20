package com.example.Server.position.domain.port.out;

import com.example.Server.position.domain.model.Position;

import java.util.List;
import java.util.Optional;

public interface PositionCRUD {
    Position save(Position position);
    Optional<Position> findById(Long id);
    List<Position> findAll();
    void delete(Position position);
}
