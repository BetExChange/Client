# Implementation Plan

- Set up Spring Boot project with dependencies: Web, Spring Data JPA, PostgreSQL Driver, Liquibase
- Create docker-compose.yml to run PostgreSQL and backend services
- Configure application.yml with PostgreSQL and Liquibase settings
- Configure Liquibase:
    - Create db.changelog-master.xml
    - Create initial changelog file with table definitions
- Create entities/domain objects
- Create repositories
- Create service layer to handle business logic
- Create DTOs to structure API requests/responses
- Create REST controller to expose API endpoints
- Update React frontend to replace localStorage with REST API calls
- Test frontend-backend integration (e.g., add/delete/fetch items)
- Run everything via Docker Compose

## Use Cases

### Get a user's notifications
#### Entities

##### Notification
```
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String message;

    private LocalDateTime timestamp;

    private boolean read;

    // Constructors
    public Notification() {}

    public Notification(Long userId, String message, LocalDateTime timestamp, boolean read) {
        this.userId = userId;
        this.message = message;
        this.timestamp = timestamp;
        this.read = read;
    }

    // Getters and setters
    // ...
}
```
#### DTOs
##### Notification DTO
```
public class NotificationDTO {
    private Long id;
    private Long userId;
    private String message;
    private LocalDateTime timestamp;
    private boolean read;

    public NotificationDTO() {}

    public NotificationDTO(Long id, Long userId, String message, LocalDateTime timestamp, boolean read) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.timestamp = timestamp;
        this.read = read;
    }

    // Getters and setters
    // ...
}
```

#### Repositories

##### Notification Repository
```
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(Long userId);
}
```

#### Services

##### Notification Services
```
@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

}
```

#### Rest Controller

##### Notification REST Controller
```
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/user/{userId}")
    

    @PostMapping
    

    @PutMapping("/{id}/read")
    
}
```

### Create a new notification

### Mark a notification as read
