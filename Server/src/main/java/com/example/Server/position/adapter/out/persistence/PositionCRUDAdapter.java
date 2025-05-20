package com.example.Server.position.adapter.out.persistence;

import com.example.Server.position.domain.port.out.PositionCRUD;
import com.example.Server.position.domain.model.Position;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PositionCRUDAdapter implements PositionCRUD {

    private final PositionJpaRepository jpa;

    public PositionCRUDAdapter(PositionJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Position save(Position domain) {
        PositionEntity entity = PositionMapper.toEntity(domain);
        PositionEntity saved  = jpa.save(entity);
        return PositionMapper.toDomain(saved);
    }

    @Override
    public Optional<Position> findById(Long id) {
        return jpa.findById(id)
                .map(PositionMapper::toDomain);
    }

    @Override
    public List<Position> findAll() {
        return jpa.findAll().stream()
                .map(PositionMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Position domain) {
        jpa.deleteById(domain.getId());
    }
}
