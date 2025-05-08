package com.example.Server.position.adapter.in.web;

import com.example.Server.position.domain.model.Position;
import com.example.Server.position.domain.model.BestPositions;
import com.example.Server.position.domain.dto.BestPositionsDTO;
import com.example.Server.position.domain.dto.CreatePositionDTO;
import com.example.Server.position.domain.dto.PositionDTO;
import com.example.Server.position.domain.port.in.PositionService;
import com.example.Server.position.domain.validation.PositionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Server.position.adapter.out.persistence.PositionMapper;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.Server.position.adapter.out.persistence.PositionMapper.toDto;

@RestController
@RequestMapping("/api")
public class PositionController {

    private final PositionService positionService;
    private final PositionValidator positionValidator;

    @Autowired
    public PositionController(PositionService positionService, PositionValidator positionValidator) {
        this.positionService = positionService;
        this.positionValidator = positionValidator;
    }

    // Create a new Position
    @PostMapping("/positions")
    public ResponseEntity<PositionDTO> createPosition(@RequestBody CreatePositionDTO req) {
        positionValidator.validateCreateRequest(req);

        Position created = positionService.createPosition(
                req.getProductId(), req.getSellerId(), req.getPieces(),
                req.getMinPrice(), req.getExpirationDate(), req.getOfferId(),
                req.getProductTitle()
        );

        PositionDTO dto = toDto(created);
        URI location = URI.create("/api/positions/" + dto.getId());
        return ResponseEntity.created(location).body(dto);
    }

    // Get open Positions for a Product (optional status filter)
    @GetMapping("/products/{productId}/positions")
    public List<PositionDTO> getPositionsByProduct(@PathVariable Long productId, @RequestParam(value="status", required=false) String status) {
        return positionService.getPositionsByProductAndStatus(productId, status).stream()
                .map(PositionMapper::toDto)
                .collect(Collectors.toList());
    }

    // Get Best open Positions
    @GetMapping("/products/{productId}/best-positions")
    public ResponseEntity<BestPositionsDTO> getBestPositions(@PathVariable Long productId) {
        BestPositions best = positionService.getBestOpenPositions(productId);
        return ResponseEntity.ok(toDto(best));
    }

    // Get a User’s Positions for a Product
    @GetMapping("/users/{userId}/products/{productId}/positions")
    public ResponseEntity<List<PositionDTO>> getUserPositions(@PathVariable Long userId, @PathVariable Long productId) {
        List<Position> positions = positionService
                .getPositionsByUserAndProduct(userId, productId);
        List<PositionDTO> dtos = positions.stream()
                .map(PositionMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Delete a Position
    @DeleteMapping("/positions/{id}")
    public ResponseEntity<Void> deletePosition(@PathVariable Long id) {
        positionService.deletePosition(id);
        return ResponseEntity.noContent().build();
    }
}
