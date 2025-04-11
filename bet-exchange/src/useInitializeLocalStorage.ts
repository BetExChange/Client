import { useEffect } from "react";
import { Notification, ExchangeActivity, Offer, Position, Product, User } from "./Types";

const useInitializeLocalStorage = () => {
  useEffect(() => {
    const keysWithSampleData = {
      Users: [
        { id: 1, username: "buyer123", role: "buyer", balance: 10000 },
        { id: 2, username: "seller456", role: "seller", balance: 5000 },
      ] as User[],
      AuthUser: null,
      Products: [
        { id: 1, title: "Product A", imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996", barcode: 534662326, brand: "Brand 1", description: "Description of the product." },
        { id: 2, title: "Product B", imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996", barcode: 123454545, brand: "Brand 2", description: "Description of the product." },
        { id: 3, title: "Product C", imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996", barcode: 563458985, brand: "Brand 3", description: "Description of the product." },
        { id: 4, title: "Product D", imageUrl: "https://img.freepik.com/premium-psd/premium-quality-mockup-ready-use_53876-57715.jpg?w=996", barcode: 325994746, brand: "Brand 4", description: "Description of the product." },
      ] as Product[],
      Offers: [] as Offer[],
      Positions: [] as Position[],
      Notifications: [] as Notification[],
      ExchangeActivities: [
        {
          productId: 1,
          latestPriceMatched: 95,
          minBidPrice: 90,
          marketDepth: 15,
        }
      ] as ExchangeActivity[],
    };

    const positions: Position[] = [];
    keysWithSampleData.Products.forEach((product) => {
      for (let i = 1; i <= 6; i++) {
        positions.push({
          id: positions.length + 1,
          productId: product.id + 1,
          sellerId: 2,
          pieces: Math.floor(Math.random() * 100) + 1,
          minPrice: Math.floor(Math.random() * 50) + 1,
          expirationDate: new Date(new Date().getTime() + (i + product.id) * 86400000),
          status: "open",
        });
      }
    
      const productPositions = positions.filter((position) => position.productId === product.id);
    
      const bestPricePosition = productPositions.reduce((prev, curr) => {
        return prev.minPrice < curr.minPrice ? prev : curr;
      }, productPositions[0]);
    
      const bestQuantityPosition = productPositions.reduce((prev, curr) => {
        return prev.pieces > curr.pieces ? prev : curr;
      }, productPositions[0]);
    
      product.bestPricePosition = bestPricePosition;
      product.bestQuantityPosition = bestQuantityPosition;
    });
    
    keysWithSampleData.Positions = positions;

    const offers: Offer[] = [];
    keysWithSampleData.Products.forEach((product) => {
      for (let i = 1; i <= 6; i++) {
        offers.push({
          id: offers.length,
          productId: product.id,
          buyerId: 1,
          quantity: Math.floor(Math.random() * 50) + 1,
          price: Math.floor(Math.random() * 30) + 1,
          duration: new Date(new Date().getTime() + (i + product.id) * 86400000),
          paymentMethod: "Card A",
          address: "Store",
          status: "open",
        });
      }
    });
    
    keysWithSampleData.Offers = offers;

    Object.entries(keysWithSampleData).forEach(([key, value]) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });

    console.log("Local storage initialized.");
  }, []);
};

export default useInitializeLocalStorage;
