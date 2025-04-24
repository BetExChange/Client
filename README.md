# Implementation Plan

## Use Cases

---

### 1. Get a User's Notifications

#### Requirements
- Load all notifications for the authenticated user on login
- Support optional filtering by read status
- Support pagination and sorting

#### Entities

| Entity Field | Column Name | Type                        | Constraints                                   |
| ------------ | ----------- | --------------------------- | --------------------------------------------- |
| `id`         | `id`        | BIGINT                      | PRIMARY KEY, AUTO_INCREMENT, NOT NULL         |
| `userId`     | `user_id`   | BIGINT                      | FOREIGN KEY → `users(id)`, NOT NULL           |
| `message`    | `message`   | VARCHAR(255)                | NOT NULL                                      |
| `timestamp`  | `timestamp` | TIMESTAMP [WITH TIME ZONE]  | NOT NULL, DEFAULT CURRENT_TIMESTAMP           |
| `read`       | `read`      | BOOLEAN                     | NOT NULL, DEFAULT FALSE                       |

#### DTO: `NotificationDTO`
- Fields:
  - `id: number`
  - `userId: number`
  - `message: string`
  - `timestamp: string`
  - `read: boolean`

#### Service
```java
Page<NotificationDTO> getNotifications(Long userId, Optional<Boolean> readFilter, Pageable pageable);
```

#### Endpoint
| Method | Endpoint                                 | Request Params                         | Response                        | Status    |
| ------ | ---------------------------------------- | -------------------------------------- | ------------------------------- | --------- |
| GET    | `/api/users/{userId}/notifications`      | `read`, `page`, `size`, `sort`         | `Page<NotificationDTO>`         | 200 OK    |

---

### 2. Create a New Notification

#### Requirements
- Allow the creation of a notification for a user

#### DTO: `CreateNotificationDTO`
- Fields:
  - `userId: number`
  - `message: string`

#### Service
```java
NotificationDTO createNotification(CreateNotificationDTO dto);
```

#### Endpoint
| Method | Endpoint                   | Request Body            | Response               | Status     |
| ------ | -------------------------- | ----------------------- | ---------------------- | ---------- |
| POST   | `/api/notifications`       | `CreateNotificationDTO` | `NotificationDTO`      | 201 Created|

---

### 3. Mark a Notification as Read

#### Requirements
- Allow a user to mark a specific notification as read

#### Service
```java
NotificationDTO markAsRead(Long id);
```

#### Endpoint
| Method | Endpoint                          | Request Params      | Response           | Status                |
| ------ | --------------------------------- | ------------------- | ------------------ | --------------------- |
| PUT    | `/api/notifications/{id}/read`    | Path: `id`          | `NotificationDTO`  | 200 OK / 204 No Content|

---

### 4. Get All Products

#### Requirements
- Fetch the full list of products
- Support pagination and sorting

#### Entities

| Entity Field  | Column Name  | Type         | Constraints                           |
| ------------- | ------------ | ------------ | ------------------------------------- |
| `id`          | `id`         | BIGINT       | PRIMARY KEY, AUTO_INCREMENT, NOT NULL |
| `title`       | `title`      | VARCHAR(255) | NOT NULL                              |
| `imageUrl`    | `image_url`  | TEXT         | NOT NULL                              |
| `description` | `description`| TEXT         | NULLABLE                              |
| `barcode`     | `barcode`    | BIGINT       | NULLABLE                              |
| `brand`       | `brand`      | VARCHAR(255) | NULLABLE                              |

#### DTO: `ProductDTO`
- Fields:
  - `id: number`
  - `title: string`
  - `imageUrl: string`
  - `description?: string`
  - `barcode?: number | null`
  - `brand?: string | null`

#### Service
```java
Page<ProductDTO> getAllProducts(Pageable pageable);
```

#### Endpoint
| Method | Endpoint            | Request Params           | Response               | Status  |
| ------ | ------------------- | ------------------------ | ---------------------- | ------- |
| GET    | `/api/products`     | `page`, `size`, `sort`   | `Page<ProductDTO>`     | 200 OK  |

---

### 5. Get Positions for a Product

#### Requirements
- Return all “open” positions for a given product
- Support pagination and sorting

#### Entities

| Entity Field     | Column Name       | Type           | Constraints                                          |
| ---------------- | ----------------- | -------------- | ---------------------------------------------------- |
| `id`             | `id`              | BIGINT         | PRIMARY KEY, AUTO_INCREMENT, NOT NULL                |
| `productId`      | `product_id`      | BIGINT         | FOREIGN KEY → `products(id)`, NOT NULL               |
| `sellerId`       | `seller_id`       | BIGINT         | FOREIGN KEY → `users(id)`, NULLABLE                  |
| `pieces`         | `pieces`          | INT            | NOT NULL                                             |
| `minPrice`       | `min_price`       | DECIMAL(12,2)  | NOT NULL                                             |
| `expirationDate` | `expiration_date` | TIMESTAMP      | NOT NULL                                             |
| `status`         | `status`          | VARCHAR(20)    | NOT NULL (`open`, `accepted`, `expired`)             |

#### DTO: `PositionDTO`
- Fields:
  - `id: number`
  - `productId: number`
  - `sellerId: number`
  - `pieces: number`
  - `minPrice: number`
  - `expirationDate: string`
  - `status: string`

#### Service
```java
Page<PositionDTO> getPositionsByProduct(Long productId, Optional<String> status, Pageable pageable);
```

#### Endpoint
| Method | Endpoint                           | Request Params                          | Response               | Status   |
| ------ | ---------------------------------- | --------------------------------------- | ---------------------- | -------- |
| GET    | `/api/products/{productId}/positions` | `status=open`, `page`, `size`, `sort` | `Page<PositionDTO>`    | 200 OK   |

---

### 6. Get Offers for a Product

#### Requirements
- Return all “open” offers for a given product
- Support pagination and sorting

#### Entities

| Entity Field    | Column Name      | Type           | Constraints                                          |
| --------------- | ---------------- | -------------- | ---------------------------------------------------- |
| `id`            | `id`             | BIGINT         | PRIMARY KEY, AUTO_INCREMENT, NOT NULL                |
| `productId`     | `product_id`     | BIGINT         | FOREIGN KEY → `products(id)`, NOT NULL               |
| `buyerId`       | `buyer_id`       | BIGINT         | FOREIGN KEY → `users(id)`, NULLABLE                  |
| `quantity`      | `quantity`       | INT            | NOT NULL                                             |
| `price`         | `price`          | DECIMAL(12,2)  | NOT NULL                                             |
| `duration`      | `duration`       | TIMESTAMP      | NOT NULL                                             |
| `paymentMethod` | `payment_method` | VARCHAR(100)   | NOT NULL                                             |
| `address`       | `address`        | VARCHAR(255)   | NOT NULL                                             |
| `status`        | `status`         | VARCHAR(20)    | NOT NULL (`open`, `accepted`, `expired`)             |

#### DTO: `OfferDTO`
- Fields:
  - `id: number`
  - `productId: number`
  - `buyerId: number`
  - `quantity: number`
  - `price: number`
  - `duration: string`
  - `paymentMethod: string`
  - `address: string`
  - `status: string`

#### Service
```java
Page<OfferDTO> getOffersByProduct(Long productId, Optional<String> status, Pageable pageable);
```

#### Endpoint
| Method | Endpoint                            | Request Params                         | Response            | Status   |
| ------ | ----------------------------------- | -------------------------------------- | ------------------- | -------- |
| GET    | `/api/products/{productId}/offers`  | `status=open`, `page`, `size`, `sort` | `Page<OfferDTO>`    | 200 OK   |

---

### 7. Get Best Positions for a Product

#### Requirements
- Compute the single “open” position with the lowest price
- Compute the single “open” position with the highest quantity

#### DTO: `BestPositionsDTO`
```ts
bestPricePosition?: PositionDTO
bestQuantityPosition?: PositionDTO
```

#### Service
```java
BestPositionsDTO getBestPositions(Long productId);
```

#### Endpoint
| Method | Endpoint                                   | Request Params | Response             | Status  |
| ------ | ------------------------------------------ | -------------- | -------------------- | ------- |
| GET    | `/api/products/{productId}/best-positions` | —              | `BestPositionsDTO`   | 200 OK  |

---

### 8. Get a User’s Positions for a Product

#### Requirements
- Return all “open” positions created by a specific user for a given product

#### Service
```java
List<PositionDTO> getUserPositionsForProduct(Long userId, Long productId);
```

#### Endpoint
| Method | Endpoint                                                   | Request Params | Response                | Status  |
| ------ | ---------------------------------------------------------- | -------------- | ----------------------- | ------- |
| GET    | `/api/users/{userId}/products/{productId}/positions`       | —              | `List<PositionDTO>`     | 200 OK  |

---

### 9. Create a New Position

#### Requirements
- User posts a new position
- If a matching offer exists (same product, price, quantity, status≠accepted), mark both accepted and notify

#### DTO: `CreatePositionDTO`
- Fields:
  - `productId: number`
  - `sellerId: number`
  - `pieces: number`
  - `minPrice: number`
  - `expirationDate: string`

#### Service
```java
PositionDTO createPosition(CreatePositionDTO dto);
```

#### Endpoint
| Method | Endpoint            | Request Body           | Response        | Status      |
| ------ | ------------------- | ---------------------- | --------------- | ----------- |
| POST   | `/api/positions`    | `CreatePositionDTO`    | `PositionDTO`   | 201 Created |

---

### 10. Delete a Position

#### Requirements
- Allow deletion only if status ≠ accepted

#### Service
```java
void deletePosition(Long positionId);
```

#### Endpoint
| Method | Endpoint                 | Request Params | Response | Status         |
| ------ | ------------------------ | -------------- | -------- | -------------- |
| DELETE | `/api/positions/{id}`    | Path: `id`     | —        | 204 No Content |

---

### 11. Create a New Offer

#### Requirements
- User posts a new offer
- If a matching position exists (same product, price, quantity, status≠accepted), mark both accepted and notify

#### DTO: `CreateOfferDTO`
- Fields:
  - `productId: number`
  - `buyerId: number`
  - `quantity: number`
  - `price: number`
  - `duration: string`
  - `paymentMethod: string`
  - `address: string`

#### Service
```java
OfferDTO createOffer(CreateOfferDTO dto);
```

#### Endpoint
| Method | Endpoint           | Request Body         | Response     | Status      |
| ------ | ------------------ | -------------------- | ------------ | ----------- |
| POST   | `/api/offers`      | `CreateOfferDTO`     | `OfferDTO`   | 201 Created |

