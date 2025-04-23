package com.example.Server.service;

import com.example.Server.dto.ProductDTO;
import com.example.Server.model.Product;
import com.example.Server.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(this::toDto);
    }

    private ProductDTO toDto(Product p) {
        return new ProductDTO(
                p.getId(),
                p.getTitle(),
                p.getImageUrl(),
                p.getDescription(),
                p.getBarcode(),
                p.getBrand()
        );
    }
}
