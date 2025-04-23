--liquibase formatted sql

-- changeset author:create-products-table
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    barcode BIGINT,
    brand VARCHAR(255)
);
