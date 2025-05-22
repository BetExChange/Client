# End-to-End Testing

Time Estimation: 4 hours

## Critical Buyer Flows

### 1. **Search for a product**
Preconditions:
- User is logged in as "Buyer"
- Products exist in the marketplace

Testing Steps:
1. Navigate to the products page
2. All products should be displayed
3. Enter a valid search term (e.g., "Product A") in the search bar
4. Only products relevant to the search term "Product A" should be displayed
5. Clear the search input
6. All available products should be shown again
7. Enter a search term that does not match any product (e.g., "asdlkfjasd")
8. A message “No data” should be displayed

### 2. **Create an offer for a product**
Preconditions:
- User is logged in as "Buyer"
- Products exist in the marketplace
- A product with no available positions exists
- User has a balance of 10000

Testing Steps:
1. Navigate to the products page
2. Click on the "Create an offer" button of Product C
3. A pop-up form with the following input fields should appear:
- Unit Price
- Quantity
- Duration Until
- Payment Method
- Location
4. Enter valid values in all input fields (e.g., Unit Price: 10, Quantity: 5, Duration Until: 30th of August, Payment Method: Card A, Location: Store)
5. Click the "Place Offer" button
6. A message "Offer added successfully” should appear
7. Hover over the user icon on the top right corner
8. User’s balance should update accordingly (9950)
9. Change the Duration Until value to a past date
10. Click the "Place Offer" button
11. An error message "Failed to add offer" should be displayed
12. Enter invalid values (e.g., Unit Price: -5, Quantity: 0) and attempt to submit
13. The input fields should default to 0 and 1 respectively
14. Click the "Place Offer" button
15. An error message "Failed to add offer" should be displayed
16. Set values correctly again, but modify the price to 10000, so the total exceeds available balance
17. Click the "Place Offer" button
18. An error message "Failed to add offer" should be displayed

### 3. **Match an existing position for a product**
Preconditions:
- User is logged in as "Buyer"
- Products exist in the marketplace
- A product with available positions exists
- User has a balance of 9950

Testing Steps:
1. Navigate to the products page
2. Click on the left green button of Product A, indiicating the position with the lowest price "1.25€"
3. A pop-up form with the 6 (3 green and 3 orange) buttons should appear
4. Click the green one with the value "1.25€" again
5. A pop-up form with the following input fields should appear:
- Unit Price (pre-populated)
- Quantity (pre-populated)
- Duration Until
- Payment Method
- Location
6. Enter valid values in all input fields (e.g., Duration Until: 30th of August, Payment Method: Card A, Location: Store)
7. Click the "Place Offer" button
8. A message "Offer added successfully” should appear
9. Press the Escape button
10. Click on the bell icon on the top right of the page
11. A notification "Your offer for product: Product A has been matched!” should appear
12. Hover over the user icon on the top right corner
13. User’s balance should update accordingly (9907.5)
14. Change the Duration Until value to a past date
15. Click the "Place Offer" button
16. An error message "Failed to add offer" should be displayed


## Critical Seller Flows

### 1. **View product details**
Preconditions:
- User is logged in as "Seller"
- Products exist in the marketplace

Testing Steps:
1. Navigate to the products page
2. Select a listed product by clicking on the "View Details" button
3. There should be a "Product Details" section, showing the following information:
- Title
- Barcode
- Brand
- Product Image
4. There should be a "Prices" section that contains the following:
- Marketplace price
- Total inventory
- Number of items available in the market
5. There should be a "Positions" section that contains the following:
- A table with the columns "Pieces", "Price", "Expiration"
- An "Add Position" button
6. There should be an "Exchange Activity" section that contains the following:
- 2 date pickers "From(date):" and "To(date):"
- A "Search" button
- Last price matched
- Minimum bid price
- Market depth (pieces)
7. There should be a "Current Market State" section that contains the following:
- 3 green buttons, each representing an open offer
- 3 orange buttons, each representing an open position


### 2. **Create a position for a product**
Preconditions:
- User is logged in as "Seller"
- Products exist in the marketplace

Testing Steps:
1. Navigate to the products page
2. Select "Product D" by clicking on the "View Details" button
3. Press the "Add Position" button
4. A pop-up form with the following input fields should appear:
- Min Price
- Pieces
- Expiration
5. Enter valid values in all input fields (e.g., Min Price: 20, Pieces 38, Expiration: 30th of August)
6. Click the "OK" button
7. A message "Position added successfully” should appear
8. Change the Duration Until value to a past date
9. Click the "OK" button
10. An error message "Failed to add position" should be displayed
11. Enter invalid values (e.g., Min Price: -5, Pieces: 0) and attempt to submit
12. The input fields should default to 0 and 1 respectively
13. Click the "OK" button
14. An error message "Failed to add offer" should be displayed

### 3. **Match an existing offer for a product**
Preconditions:
- User is logged in as "Seller"
- Products exist in the marketplace
- A product with available offers exists

Testing Steps:
1. Navigate to the products page
2. Select "Product D" by clicking on the "View Details" button
3. Scroll to the "Current Market State" section
4. Click the green button with the value of "12€"
4. A pop-up form with the following input fields should appear:
- Min Price (pre-populated)
- Pieces (pre-populated)
- Expiration
5. Enter valid values in all input fields (e.g., Expiration: 30th of August)
6. Click the "OK" button
7. A message "Position added successfully” should appear
8. Click on the bell icon on the top right of the page
9. A notification "Your position for product Product D has been matched!” should appear
10. Change the Duration Until value to a past date
11. Click the "OK" button
12. An error message "Failed to add position" should be displayed

### 4. **Delete a position for a product**
Preconditions:
- User is logged in as "Seller"
- Products exist in the marketplace
- A product with available positions exists

Testing Steps:
1. Navigate to the products page
2. Select "Product D" by clicking on the "View Details" button
3. Scroll to the "Positions" section
4. Find the first row in the table that has the following values "52", "6.75€" and "3/12/25"
5. Press the "Delete" button next to it
6. Press the "Yes" button on the confirmation dialog
7. A message "Position deleted successfully!" should be displayed
8. The table row should no longer be visible
