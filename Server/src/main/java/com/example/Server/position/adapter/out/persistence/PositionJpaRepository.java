package com.example.Server.position.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionJpaRepository
        extends JpaRepository<PositionEntity, Long> {
}
