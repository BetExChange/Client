# Implementation Plan

- Set up Spring Boot project with dependencies: Web, Spring Data JPA, PostgreSQL Driver, Liquibase
- Create `docker-compose.yml` to run PostgreSQL and backend services
- Configure `application.yml` with PostgreSQL and Liquibase settings
- Configure Liquibase:
  - Create `db.changelog-master.xml`
  - Create initial changelog file with table definitions
- Create entities/domain objects
- Create service layer to handle business logic
- Create DTOs to structure API requests/responses
- Create REST controller to expose API endpoints
- Update React frontend to replace `localStorage` with REST API calls
- Test frontend-backend integration (e.g., add/delete/fetch notifications)
- Run everything via Docker Compose

## Use Cases

### 1. Get a User's Notifications

#### Requirements
- Load all notifications for the authenticated user from the database on login
- Support optional filtering by read status
- Support pagination and sorting

#### Entities

##### Notification (table: `notifications`)
| Entity Field | Column Name   | Type                       | Constraints                            |
| ------------ | ------------- | -------------------------- | -------------------------------------- |
| `id`         | `id`          | BIGINT                     | PRIMARY KEY, AUTO_INCREMENT, NOT NULL |
| `userId`     | `user_id`     | BIGINT                     | FOREIGN KEY → `users(id)`, NOT NULL    |
| `message`    | `message`     | VARCHAR(255)               | NOT NULL                               |
| `timestamp`  | `timestamp`   | TIMESTAMP [WITH TIME ZONE] | NOT NULL, DEFAULT CURRENT_TIMESTAMP    |
| `read`       | `read`        | BOOLEAN                    | NOT NULL, DEFAULT FALSE                |

#### DTOs

##### `NotificationDTO`
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

| Method | Endpoint                                 | Request                                               | Response                        | Status Code |
| ------ | ---------------------------------------- | ----------------------------------------------------- | ------------------------------- | ----------- |
| GET    | `/api/users/{userId}/notifications`      | Path: `userId`; Query: `read`, `page`, `size`, `sort` | Paged `NotificationDTO` objects | `200 OK`    |

---

### 2. Create a New Notification

#### Requirements
- Allow the creation of a notification for a user

#### Entities

Reuses the `Notification` entity defined above.

#### DTOs

##### `CreateNotificationDTO`
- Fields:
  - `userId: number`
  - `message: string`

##### `NotificationDTO` (response)
- Fields as defined in Use Case 1

#### Service

```java
NotificationDTO createNotification(CreateNotificationDTO dto);
```

#### Endpoint

| Method | Endpoint                   | Request Body             | Response               | Status Code    |
| ------ | -------------------------- | ------------------------ | ---------------------- | -------------- |
| POST   | `/api/notifications`       | `CreateNotificationDTO`  | `NotificationDTO`      | `201 Created`  |

---

### 3. Mark a Notification as Read

#### Requirements
- Allow a user to mark a specific notification as read

#### Entities

Reuses the `Notification` entity defined above.

#### DTOs

##### `NotificationDTO` (response)
- Fields as defined in Use Case 1

#### Service

```java
NotificationDTO markAsRead(Long id);
```

#### Endpoint

| Method | Endpoint                               | Request                                     | Response               | Status Code         |
| ------ | -------------------------------------- | ------------------------------------------- | ---------------------- | ------------------- |
| PUT    | `/api/notifications/{id}/read`         | Path: `id`                                  | `NotificationDTO`      | `200 OK` or `204 No Content` |

---

### 4. Get All Products

#### Requirements
- Fetch the full list of products available in the database
- Include optional support for pagination and sorting

#### Entities

##### Product (table: `products`)
| Entity Field   | Column Name | Type         | Constraints                 |
|----------------|-------------|--------------|-----------------------------|
| `id`           | `id`        | BIGINT       | PRIMARY KEY, AUTO_INCREMENT |
| `title`        | `title`     | VARCHAR(255) | NOT NULL                    |
| `imageUrl`     | `image_url` | TEXT         | NOT NULL                    |
| `description`  | `description` | TEXT       | NULLABLE                    |
| `barcode`      | `barcode`   | BIGINT       | NULLABLE                    |
| `brand`        | `brand`     | VARCHAR(255) | NULLABLE                    |

#### DTOs

##### `ProductDTO`
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

| Method | Endpoint            | Request Query                  | Response              | Status Code |
|--------|---------------------|--------------------------------|-----------------------|--------------|
| GET    | `/api/products`     | Query: `page`, `size`, `sort`  | Paged `ProductDTO`s   | `200 OK`     |

---
