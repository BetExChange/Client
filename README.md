# Bet Exchange

## Features
### For the buyer:
- Login
- Logout
- Notifications
- View products
- Create a new offer
- Purchase an existing offer
- Search for products
- View balance

---

### For the seller:
- Login
- Logout
- Notifications
- View listed products
- View product details
- Add new positions
- Remove existing positions
- Check exchange activity
- View market state
- Accept an offer
---

## Requirements for the Buyer

### Logging In
#### Requirements:
- When the user opens the app, then they should be prompted to log in with a valid username and password.
- When the user enters valid credentials and clicks the login button, then they should be logged into the app and granted access.
- When the user leaves any field empty or enters invalid credentials, then they should receive an error or prompt to fill out the fields correctly.

#### Edge Cases:
- If the user enters invalid credentials, a message should be displayed.
---

### Logging Out
#### Prerequisites:
- User must be logged in.

#### Requirements:
- When the user clicks the Logout button, then they should be logged out and redirected to the login screen.
---

### Notifications
#### Prerequisites:
- User must be logged in.

#### Requirements:
- A navigation bar with the following elements should exist: title of the page, notifications icon, username and a user icon.
- When the user makes a purchase, a relevant notification should be sent.
- When the user creates an offer, a relevant notification should be sent.
- When an offer the user has created gets accepted, a relevant notification should be sent.
---

### Viewing Products
#### Prerequisites:
- User must be logged in.
- At least one product should exist.

#### Requirements:
- When the user visits the main page, all available products should be displayed.
- Every product should have a title, image and two offers visible or a button to create one.
- Every product should showcase the two best offers, one based on price and one based on quantity.
- Every product should have a button that opens a modal with all the offers and a "Create your offer" button.

#### Edge Cases:
- If no products are available, an appropriate message should be displayed.

---

### Creating a New Offer
#### Prerequisites:
- User must be logged in.
- At least one product should exist.
- Sufficient balance to place an offer.

#### Requirements:
- When the user clicks on "Create Offer" and enters a valid quantity, price, duration, payment method, address and has enough balance then the offer should be created.
- When the user places a new offer, their balance should update, subtracting the amount from their funds.
- When the user places a new offer, they should receive the appropriate notification.
- When the user enters an invalid value, an error should be displayed.

#### Edge Cases:
- If the user attempts to place an offer without enough balance, an error should be displayed.
- If the user attempts to place an offer with a negative value,  an error should be displayed.

---

### Purchasing an Existing Offer
#### Prerequisites:
- User must be logged in.
- Sufficient balance to place an offer.
- At least one product should exist.
- The offer must still be available at the time of purchase.

#### Requirements:
- When the user clicks on an existing offer, then the "new offer" form should appear with its fields pre-completed (based on the existing offer).
- Upon submission the purchase should be completed.

#### Edge Cases:
- If the user attempts to place an offer without enough balance, an error should be displayed.
- if the user attempts to place an offer with a negative value,  an error should be displayed.

---

### Searching for Products
#### Prerequisites:
- User must be logged in.
- There must be products available in the marketplace.

#### Requirements:
- When the user enters a valid search term in the search bar, relevant products should be displayed.

#### Edge Cases:
- If no products match the search term, a message should be displayed.
- If the search input is empty, all products should be shown.

---

### Viewing Balance
#### Prerequisites:
- User must be logged in.

#### Requirements:
- When the user clicks on the user profile icon, their balance should be displayed.

---


## Requirements for the Seller

### Logging In
#### Requirements:
- Same as "For the Buyer".

---

### Logging Out
#### Requirements:
- Same as "For the Buyer".
---

### Notifications
#### Prerequisites:
- User must be logged in.

#### Requirements:
- A navigation bar with the following elements should exist: title of the page, notifications icon, username, and a user icon.
- When a user’s listing receives an offer, a relevant notification should be sent.
- When a user's listing gets sold, a relevant notification should be sent.
- When a user adds a new listing, a relevant notification should be sent.

---

### Viewing Listed Products
#### Prerequisites:
- User must be logged in.
- At least one product should exist.

#### Requirements:
- When the user navigates to the main page, all their listed products should be displayed.
- Each listed product should show its title, barcode, brand and image.
- Each listed product should have a button to view product details.

#### Edge Cases:
- If the seller has no listed products, an appropriate message should be displayed.

---

### Viewing Product Details
#### Prerequisites:
- User must be logged in.
- At least one product should exist.

#### Requirements:
- When the user selects a listed product, a detailed page should display  its title, barcode, brand and image.
- A "prices" section should exist and display marketplace price, total inventory and the number of items available in the market.
- A "positions" section should exist and display a table with Pieces, Price and Expiration for each product.
- A "Add position" button should also exist in the "positions" section.
- A "exchange activity" section should exist, displaying information for the products based on a specified time period.
- A "current market state" section should exist, displaying listings and offers for the product from the market.

---

### Adding New Positions
#### Prerequisites:
- User must be logged in.
- At least one product should exist.
- User must be on the product details page of a listing.

#### Requirements:
- When the user clicks "Add position" and enters a valid minimum price, number of pieces and expiration date, a new position is added.
- The seller should receive a notification confirming the listing.
- The seller’s dashboard should update with the new listing.

#### Edge Cases:
- If required fields are left empty or are invalid, an error should be displayed.

---

### Removing Existing Positions
#### Prerequisites:
- User must be logged in.
- At least one product should exist.
- User must be on the product details page of a listing.

#### Requirements:
- When the user selects a listing and clicks "Remove Position," the product should be removed from the marketplace.
- A confirmation message should appear before removal.
- The seller should receive a notification confirming the removal.
- The seller’s dashboard should update and no longer display the removed position.

#### Edge Cases:
- If the listing has active offers, a warning should be displayed before allowing removal.

---

### Checking Exchange Activity
#### Prerequisites:
- User must be logged in.
- At least one product should exist.
- User must be on the product details page of a listing.

#### Requirements:
- When the seller navigates to the exchange activity section, they can specify a time period and receive the following information about a product: "Latest price matched", "Minimum bid price" and "Market depth (pieces)".


#### Edge Cases:
- If no recent transactions are available, a message should indicate that no activity has occurred.

---

### Viewing Market State
#### Prerequisites:
- User must be logged in.
- At least one product should exist.
- User must be on the product details page of a listing.

#### Requirements:
- When the seller navigates to the market state section, they should see a summary of active offers and listings for the specified product.

#### Edge Cases:
- If no market data is available, a message should indicate that there is currently no market activity.

---

### Accepting an offer
#### Prerequisites:
- User must be logged in.
- At least one product should exist.
- User must be on the product details page of a listing.
- At least one offer for the product should exist.

#### Requirements:
- When the seller clicks on an offer at the market state section, a new "Add position" form should be displayed with the fields pre-completed (based on the selected offer).
- Upon submission the sale should be completed.

### Edge Cases:
- If the offer is no longer available by the time the seller attempts to accept it, display an error message.
