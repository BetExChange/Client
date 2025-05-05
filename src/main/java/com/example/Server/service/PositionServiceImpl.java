package com.example.Server.service;

import com.example.Server.model.Status;
import com.example.Server.port.in.PositionService;
import com.example.Server.port.out.PositionRepository;
import com.example.Server.model.BestPositions;
import com.example.Server.domain.Position;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PositionServiceImpl implements PositionService {

    private final PositionRepository repository;

    public PositionServiceImpl(PositionRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
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
    public List<Position> getPositionsByProductAndStatus(Long productId, Optional<String> statusFilter) {
        List<Position> all = repository.findAll();
        return all.stream()
                .filter(p -> p.getProductId().equals(productId))
                .filter(p -> statusFilter
                        .map(s -> p.getStatus().name().equalsIgnoreCase(s))
                        .orElse(true))
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
                productId, Optional.of("OPEN")
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
    @Transactional
    public void deletePosition(Long positionId) {
        Position position = repository.findById(positionId)
                .orElseThrow(() -> new IllegalArgumentException("Position not found: " + positionId));
        position.ensureDeletable();
        repository.delete(position);
    }
}
