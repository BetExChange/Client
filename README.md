# Implementation Plan

- create entities/domain objects
- create repositories
- load database / create product entries
- create NotFoundException
- create service layer
- create DTO
- create modelAssembler
- create rest controller

## Entities

### Product
```
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String imageUrl;
    private String description;
    private String brand;
    private Long barcode;
    private Position bestPricePosition;
    private Position bestQuantityPosition;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Long getBarcode() {
        return barcode;
    }

    public void setBarcode(Long barcode) {
        this.barcode = barcode;
    }

    public Position getBestPricePosition() {
        return bestPricePosition;
    }

    public void setBestPricePosition(Position bestPricePosition) {
        this.bestPricePosition = bestPricePosition;
    }

    public Position getBestQuantityPosition() {
        return bestQuantityPosition;
    }

    public void setBestQuantityPosition(Position bestQuantityPosition) {
        this.bestQuantityPosition = bestQuantityPosition;
    }
}
```

## Repositories

### Product Repository
```
public interface ProductRepository extends JpaRepository<Product, Long> {}
```

## Services

### Product Services
```
@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAll() { return productRepository.findAll(); }

    public Product getById(Long id) { return productRepository.findById(id).orElseThrow(); }

    public Product create(Product product) { return productRepository.save(product); }

    public Product update(Long id, Product updated) {
        Product existing = getById(id);
        // set updated fields
        return productRepository.save(existing);
    }

    public void delete(Long id) { productRepository.deleteById(id); }
}
```

## Rest Controller

### Product Rest Controller
```

```
