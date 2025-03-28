# Bet Exchange

## Features
### For the buyer:
- Login
- Logout
- Notifications
- View products
- View existing listings (prices/quantities)
- Create a new offer
- Search for products
- View balance

---

### For the seller:
- Login
- Logout
- Notifications
- View listed products
- View product details
- Add new listings
- Remove existing listings
- Check exchange activity
- View market state

---

## Requirements

### For the buyer

#### Logging In
##### Steps:
1. Open the Bet Exchange app.
2. Navigate to the login page.
3. Enter valid credentials.
4. Click the login button.

#### Results:
- The user is logged in and redirected to the dashboard.

#### Requirements:
- When the user opens the app, then they should be prompted to log in with a valid username and password.
- When the user enters valid credentials and clicks the login button, then they should be logged into the app and granted access.
- When the user leaves any field empty or enters invalid credentials, then they should receive an error or prompt to fill out the fields correctly.

#### Edge Cases:
- If the user enters invalid credentials, a message should be displayed.
---

### Viewing Products
#### Prerequisites:
- User must be logged in.

#### Steps:
1. Navigate to the main page.

#### Results:
- The user sees a list of available products.

#### Requirements:
- When the user visits the product listing page, all available products should be displayed.

#### Edge Cases:
- If no products are available, an appropriate message should be displayed.

---

### Creating a New Offer
#### Prerequisites:
- User must be logged in.
- Sufficient balance to place an offer.

#### Steps:
2. Click on "Create Offer."
3. Enter the desired quantity, price and duration of the offer.
4. Confirm the offer.

#### Results:
- The offer is successfully created and added to the listing.
- A relevant notification is sent to the user.

#### Requirements:
- When the user enters a valid quantity, price, duration and has enough balance then the offer should be created.
- When the user places a new offer, their balance should update, subtracting the amount from their funds.
- When the user places a new offer, they should receive the appropriate notification.
- When the user enters an invalid value, an error should be displayed.
- The system should prevent offers with negative values or exceeding available balance.

#### Edge Cases:
- If the user attempts to place an offer without enough balance, an error should be displayed.

---

### Searching for Products
#### Prerequisites:
- User must be logged in.

#### Steps:
1. Enter the search term in the search bar.
2. Click the search button or press Enter.

#### Results:
- The user sees a filtered list of products matching the search term.

#### Requirements:
- When the user enters a valid search term, relevant products should be displayed.

#### Edge Cases:
- If no products match the search term, a message should be displayed.
- If the search input is empty, all products should be shown.

---

### Viewing Balance
#### Prerequisites:
- User must be logged in.

#### Steps:
1. Click on the user profile icon.

#### Results:
- The user's current balance is displayed.

#### Requirements:
- When the user click on the user profile icon, their balance should be displayed.

#### Edge Cases:
- 
