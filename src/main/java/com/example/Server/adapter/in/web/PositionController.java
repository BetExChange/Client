package com.example.Server.adapter.in.web;

import com.example.Server.dto.*;
import com.example.Server.domain.Position;
import com.example.Server.model.BestPositions;
import com.example.Server.port.in.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PositionController {

    private final PositionService positionService;

    @Autowired
    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    // Create a new Position
    @PostMapping("/positions")
    public ResponseEntity<PositionDTO> createPosition(
            @RequestBody CreatePositionDTO req) {

        Position created = positionService.createPosition(
                req.getProductId(), req.getSellerId(), req.getPieces(),
                req.getMinPrice(), req.getExpirationDate()
        );

        PositionDTO dto = toDto(created);
        URI location = URI.create("/api/positions/" + dto.getId());
        return ResponseEntity.created(location).body(dto);
    }

    // Get open Positions for a Product (optional status filter)
    @GetMapping("/products/{productId}/positions")
    public ResponseEntity<List<PositionDTO>> getPositionsByProduct( @PathVariable Long productId, @RequestParam(value="status", required=false) Optional<String> status) {
        List<Position> positions = positionService.getPositionsByProductAndStatus(productId, status);
        List<PositionDTO> dtos = positions.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Get Best open Positions
    @GetMapping("/products/{productId}/best-positions")
    public ResponseEntity<BestPositionsDTO> getBestPositions(
            @PathVariable Long productId) {

        BestPositions best = positionService.getBestOpenPositions(productId);
        return ResponseEntity.ok(toDto(best));
    }

    // Get a User’s Positions for a Product
    @GetMapping("/users/{userId}/products/{productId}/positions")
    public ResponseEntity<List<PositionDTO>> getUserPositions(
            @PathVariable Long userId,
            @PathVariable Long productId) {

        List<Position> positions = positionService
                .getPositionsByUserAndProduct(userId, productId);
        List<PositionDTO> dtos = positions.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Delete a Position
    @DeleteMapping("/positions/{id}")
    public ResponseEntity<Void> deletePosition(@PathVariable Long id) {
        positionService.deletePosition(id);
        return ResponseEntity.noContent().build();
    }

    // --- Mapping Helpers ---

    private PositionDTO toDto(Position p) {
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

    private BestPositionsDTO toDto(BestPositions b) {
        BestPositionsDTO d = new BestPositionsDTO();
        if (b.getBestPricePosition() != null)
            d.setBestPricePosition(toDto(b.getBestPricePosition()));
        if (b.getBestQuantityPosition() != null)
            d.setBestQuantityPosition(toDto(b.getBestQuantityPosition()));
        return d;
    }
}
