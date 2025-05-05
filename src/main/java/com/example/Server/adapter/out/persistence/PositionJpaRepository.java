package com.example.Server.adapter.out.persistence;

import com.example.Server.model.PositionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionJpaRepository
        extends JpaRepository<PositionEntity, Long> {
}
