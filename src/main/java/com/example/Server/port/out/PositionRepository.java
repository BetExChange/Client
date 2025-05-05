package com.example.Server.port.out;

import com.example.Server.domain.Position;

import java.util.List;
import java.util.Optional;

public interface PositionRepository {
    Position save(Position position);
    Optional<Position> findById(Long id);
    List<Position> findAll();
    void delete(Position position);
}
