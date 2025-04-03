import { useEffect } from "react";

const useInitializeLocalStorage = () => {
  useEffect(() => {
    const keysWithSampleData = {
      Users: [
        { id: 1, username: "buyer123", role: "buyer", balance: 1000 },
        { id: 2, username: "seller456", role: "seller", balance: 5000 },
      ],
      AuthUser: null,
      Products: [
        { id: 1, title: "Product A", imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996",
        bestPricePosition: {
            id: 1,
            productId: 1,
            sellerId: 1,
            pieces: 5,
            minPrice: 90,
            expirationDate: new Date().toISOString(),
            status: "open",
        },
        bestQuantityPosition: {
            id: 2,
            productId: 1,
            sellerId: 3,
            pieces: 10,
            minPrice: 95,
            expirationDate: new Date().toISOString(),
            status: "open",
        }
      },
        { id: 2, title: "Product B", imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996", 
          bestPricePosition: {
            id: 4,
            productId: 2,
            sellerId: 1,
            pieces: 6,
            minPrice: 96,
            expirationDate: new Date().toISOString(),
            status: "open",
        },
        bestQuantityPosition: {
            id: 2,
            productId: 2,
            sellerId: 3,
            pieces: 50,
            minPrice: 100,
            expirationDate: new Date().toISOString(),
            status: "open",
        }
        },
        { id: 3, title: "Product C", imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996" },
        { id: 4, title: "Product D", imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996",
          bestPricePosition: {
            id: 5,
            productId: 4,
            sellerId: 1,
            pieces: 6,
            minPrice: 96,
            expirationDate: new Date().toISOString(),
            status: "open",
        },
        bestQuantityPosition: {
            id: 6,
            productId: 4,
            sellerId: 3,
            pieces: 50,
            minPrice: 100,
            expirationDate: new Date().toISOString(),
            status: "open",
        }
        },
      ],
      Offers: [
        {
          id: 1,
          productId: 1,
          creatorId: 1,
          quantity: 10,
          price: 100,
          duration: new Date().toISOString(),
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
          expirationDate: new Date().toISOString(),
          status: "open",
        }
      ],
      Notifications: [
        {
          id: 1,
          userId: 1,
          message: "Your offer has been created!",
          timestamp: new Date().toISOString(),
          read: false,
        },
        {
          id: 2,
          userId: 1,
          message: "Your offer has been created! 2",
          timestamp: new Date().toISOString(),
          read: false,
        },
        {
          id: 3,
          userId: 1,
          message: "Your offer has been created! 3",
          timestamp: new Date().toISOString(),
          read: false,
        },
        {
          id: 4,
          userId: 1,
          message: "Your offer has been created! 4",
          timestamp: new Date().toISOString(),
          read: false,
        },
        {
          id: 5,
          userId: 1,
          message: "Your offer has been created! 5",
          timestamp: new Date().toISOString(),
          read: false,
        },
        {
          id: 6,
          userId: 1,
          message: "Your offer has been created! 6",
          timestamp: new Date().toISOString(),
          read: true,
        },
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

    Object.entries(keysWithSampleData).forEach(([key, value]) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });

    console.log("Local storage initialized.");
  }, []);
};

export default useInitializeLocalStorage;
