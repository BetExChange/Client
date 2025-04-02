import { useEffect } from "react";

const useInitializeLocalStorage = () => {
  useEffect(() => {
    const initializeLocalStorage = () => {
      const keys = [
        "Users",
        "AuthUser",
        "Products",
        "Offers",
        "Positions",
        "Notifications",
        "ExchangeActivities",
      ];

      const isStorageEmpty = keys.every((key) => !localStorage.getItem(key));

      if (!isStorageEmpty) return;

      const sampleData = {
        Users: [
          { id: 1, username: "buyer123", role: "buyer", balance: 1000 },
          { id: 2, username: "seller456", role: "seller", balance: 5000 },
        ],
        AuthUser: null,
        Products: [
          { id: 1, title: "Product A", imageUrl: "", offers: [], positions: [] },
          { id: 2, title: "Product B", imageUrl: "", offers: [], positions: [] },
        ],
        Offers: [
            {
                id: 1,
                productId: 1,
                creatorId: 1,
                quantity: 10,
                price: 100,
                duration: new Date(),
                paymentMethod: "PayPal",
                address: "123",
                status: "open",
            }
        ],
        Positions: [
            {
                id: 1,
                productId: 1,
                sellerId: 1,
                pieces: 5,
                minPrice: 90,
                expirationDate: new Date(),
                status: "open",
            }
        ],
        Notifications: [
            {
                id: 1,
                userId: 1,
                message: "Your offer has been created!",
                timestamp: new Date(),
                read: false,
            }
        ],
        ExchangeActivities: [
            {
                productId: 1,
                latestPriceMatched: 95,
                minBidPrice: 90,
                marketDepth: 15,
            }
        ],
      };

      Object.entries(sampleData).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });

      console.log("Local storage initialized.");
    };

    initializeLocalStorage();
  }, []);
};

export default useInitializeLocalStorage;
