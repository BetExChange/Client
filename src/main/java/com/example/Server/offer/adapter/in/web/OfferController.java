package com.example.Server.offer.adapter.in.web;

import com.example.Server.offer.domain.dto.CreateOfferDTO;
import com.example.Server.offer.domain.dto.OfferDTO;
import com.example.Server.offer.domain.model.Offer;
import com.example.Server.offer.domain.port.in.OfferService;
import com.example.Server.offer.domain.validation.OfferValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Server.offer.adapter.out.persistence.OfferMapper;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.Server.offer.adapter.out.persistence.OfferMapper.toDto;

@RestController
@RequestMapping("/api")
public class OfferController {
    private final OfferService offerService;
    private final OfferValidator offerValidator;

    @Autowired
    public OfferController(OfferService offerService, OfferValidator offerValidator){
        this.offerService = offerService;
        this.offerValidator = offerValidator;
    }

    // Create a new Offer
    @PostMapping("/offers")
    public ResponseEntity<OfferDTO> createOffer(@RequestBody CreateOfferDTO req) {
        offerValidator.validateCreateRequest(req);

        Offer created = offerService.createOffer(
                req.getProductId(), req.getBuyerId(), req.getPrice(),
                req.getQuantity(), req.getDuration(), req.getPaymentMethod(),
                req.getAddress()
        );

        OfferDTO dto = toDto(created);
        URI location = URI.create("/api/offers/" + dto.getId());
        return ResponseEntity.created(location).body(dto);
    }

    // Get open Offers for a Product (optional status filter)
    @GetMapping("/products/{productId}/offers")
    public List<OfferDTO> getOffersByProduct(@PathVariable Long productId, @RequestParam(value="status", required=false) String status) {
        return offerService.getOffersByProductAndStatus(productId, status).stream()
                .map(OfferMapper::toDto)
                .collect(Collectors.toList());
    }
}
