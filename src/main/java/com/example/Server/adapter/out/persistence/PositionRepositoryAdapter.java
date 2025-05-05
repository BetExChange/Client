package com.example.Server.adapter.out.persistence;

import com.example.Server.model.PositionEntity;
import com.example.Server.port.out.PositionRepository;
import com.example.Server.domain.Position;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PositionRepositoryAdapter implements PositionRepository {

    private final PositionJpaRepository jpa;

    public PositionRepositoryAdapter(PositionJpaRepository jpa) {
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
