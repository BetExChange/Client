package com.example.Server.position.domain.service;

import com.example.Server.offer.domain.model.Status;
import com.example.Server.position.domain.port.in.PositionService;
import com.example.Server.position.domain.port.out.PositionCRUD;
import com.example.Server.position.domain.model.BestPositions;
import com.example.Server.position.domain.model.Position;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PositionServiceImpl implements PositionService {

    private final PositionCRUD repository;

    public PositionServiceImpl(PositionCRUD repository) {
        this.repository = repository;
    }

    @Override
    public Position createPosition(Long productId, Long sellerId, int pieces, BigDecimal minPrice, ZonedDateTime expirationDate) {
        Position position = new Position();
        position.setProductId(productId);
        position.setSellerId(sellerId);
        position.setPieces(pieces);
        position.setMinPrice(minPrice);
        position.setExpirationDate(expirationDate);
        position.setStatus(Status.valueOf("OPEN"));
        return repository.save(position);
    }

    @Override
    public List<Position> getPositionsByProductAndStatus(Long productId, String statusFilter) {
        return repository.findAll().stream()
                .filter(p -> p.getProductId().equals(productId))
                .filter(p -> statusFilter == null ||
                        p.getStatus().name().equalsIgnoreCase(statusFilter.trim()))
                .filter(Position::isOpen)
                .collect(Collectors.toList());
    }

    @Override
    public List<Position> getPositionsByUserAndProduct(Long userId, Long productId) {
        List<Position> all = repository.findAll();
        return all.stream()
                .filter(p -> p.getSellerId().equals(userId)
                        && p.getProductId().equals(productId))
                .filter(Position::isOpen)
                .collect(Collectors.toList());
    }

    @Override
    public BestPositions getBestOpenPositions(Long productId) {
        List<Position> open = getPositionsByProductAndStatus(
                productId, "OPEN"
        );
        Optional<Position> bestPrice = open.stream()
                .filter(Position::isOpen)
                .min(Comparator.comparing(Position::getMinPrice));
        Optional<Position> bestQuantity = open.stream()
                .filter(Position::isOpen)
                .max(Comparator.comparing(Position::getPieces));
        return new BestPositions(bestPrice.orElse(null),
                bestQuantity.orElse(null));
    }

    @Override
    public void deletePosition(Long positionId) {
        Position position = repository.findById(positionId)
                .orElseThrow(() -> new IllegalArgumentException("Position not found: " + positionId));
        position.ensureDeletable();
        repository.delete(position);
    }
}
