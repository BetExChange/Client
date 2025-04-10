import { useState, useEffect } from "react";
import { Product, Position, Offer } from "./Types";
import { message } from "antd";
import { useNotificationContext } from "./NotificationContext";
import { useAuth } from "./AuthProvider";


type useProductsAPI = {
  products: Product[];
  getProducts: () => void;
  getPositions: (productId: number) => Position[];
  getOffers: (productId: number) => Offer[];
  getBestPositions: (product: Product) => void;
  getUserPositionedProducts: (userId: number) => Product[];
  getUserPositionsForProduct: (userId: number, productId: number) => Position[];
  deletePosition: (positionId: number) => void;
  addPosition: (position: Position, offer?: Offer, product?: Product)  => void;
};

const useProducts = (): useProductsAPI => {
  const [products, setProducts] = useState<Product[]>([]);
  const { createNotification } = useNotificationContext();
  const { updateBalance } = useAuth();

  const getProducts = () => {
    const storedProducts = localStorage.getItem("Products");
    if (storedProducts) {
      try {
        const parsedProducts: Product[] = JSON.parse(storedProducts);
        const updatedProducts = parsedProducts.map((product) => getBestPositions(product));
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Failed to parse products from localStorage", error);
      }
    }
  };

  const getPositions = (productId: number): Position[] => {
    const storedPositions = localStorage.getItem("Positions");
    if (!storedPositions) return [];
  
    try {
      const allPositions: Position[] = JSON.parse(storedPositions);
      const filtered = allPositions.filter((pos) => pos.productId === productId);
  
      const lowestPrices = [...filtered]
        .sort((a, b) => a.minPrice - b.minPrice)
        .slice(0, 3)
        .reverse();
  
      const highestPrices = [...filtered]
        .sort((a, b) => b.minPrice - a.minPrice)
        .slice(0, 3);
  
      return [...lowestPrices, ...highestPrices];
    } catch (error) {
      console.error("Failed to parse positions from localStorage", error);
      return [];
    }
  };

  const getOffers = (productId: number): Offer[] => {
    const storedOffers = localStorage.getItem("Offers");
    if (!storedOffers) return [];

    try {
      const allOffers: Offer[] = JSON.parse(storedOffers);
      const filtered = allOffers.filter((offer) => offer.productId === productId);

      const highestPrices = [...filtered]
        .sort((a, b) => b.price - a.price)
        .slice(0, 3)
        .reverse();
  
        const lowestPrices = [...filtered]
        .sort((a, b) => a.price - b.price)
        .slice(0, 3)
  
      return [...highestPrices, ...lowestPrices];
    } catch (error) {
      console.error("Failed to parse offers from localStorage", error);
      return [];
    }
  };

  const getBestPositions = (product: Product): Product => {
    const storedPositions = localStorage.getItem("Positions");
    if (!storedPositions) return product;

    try {
      const positions: Position[] = JSON.parse(storedPositions);
      
      const openPositions = positions.filter((pos) => pos.productId === product.id && pos.status === "open");
      
      if (openPositions.length === 0) return product;

      const bestPricePosition = openPositions.reduce((prev, curr) =>
        prev.minPrice < curr.minPrice ? prev : curr,
        openPositions[0]
      );

      const bestQuantityPosition = openPositions.reduce((prev, curr) =>
        prev.pieces > curr.pieces ? prev : curr,
        openPositions[0]
      );

      const updatedProduct = {
        ...product,
        bestPricePosition,
        bestQuantityPosition,
      };

      const storedProducts = localStorage.getItem("Products");
      if (storedProducts) {
        const productsArray: Product[] = JSON.parse(storedProducts);
        const newProductsArray = productsArray.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
        localStorage.setItem("Products", JSON.stringify(newProductsArray));
      }

      return updatedProduct;
    } catch (error) {
      console.error("Failed to compute or update best positions", error);
      return product;
    }
  };

  useEffect(() => {
    getProducts();

    const handleUpdate = () => {
      getProducts();
    };

    window.addEventListener("localPositionsUpdated", handleUpdate);
  
    return () => {
      window.removeEventListener("localPositionsUpdated", handleUpdate);
    };
  }, []);

  const getUserPositionedProducts = (userId: number): Product[] => {
    const storedPositions = localStorage.getItem("Positions");
    const storedProducts = localStorage.getItem("Products");
  
    if (!storedPositions || !storedProducts) return [];
  
    try {
      const positions: Position[] = JSON.parse(storedPositions);
      const products: Product[] = JSON.parse(storedProducts);
  
      const userPositionedProductIds = new Set(
        positions.filter(
          (pos) => 
            pos.sellerId === userId &&
            pos.status === "open")
          .map((pos) => pos.productId)
      );
  
      const userProducts = products.filter((product) =>
        userPositionedProductIds.has(product.id)
      );
  
      return userProducts;
    } catch (error) {
      console.error("Error getting user's positioned products:", error);
      return [];
    }
  };

  const getUserPositionsForProduct = (userId: number, productId: number): Position[] => {
    const storedPositions = localStorage.getItem("Positions");
    if (!storedPositions) return [];
  
    try {
      const allPositions: Position[] = JSON.parse(storedPositions);
      return allPositions.filter(
        (pos) =>
          pos.productId === productId &&
          pos.sellerId === userId &&
          pos.status === "open"
      );
    } catch (error) {
      console.error("Failed to parse positions from localStorage", error);
      return [];
    }
  };

  const deletePosition = (positionId: number) => {
    const storedPositions = localStorage.getItem("Positions");
    if (!storedPositions) return;
  
    try {
      const positions: Position[] = JSON.parse(storedPositions);
      const updatedPositions = positions.filter((pos) => pos.id !== positionId);
  
      localStorage.setItem("Positions", JSON.stringify(updatedPositions));
  
      window.dispatchEvent(new Event("localPositionsUpdated"));
      message.success("Position deleted successfully!");
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };
  
  const addPosition = (position: Position, offer?: Offer, product?: Product) => {
    try {
      if (offer != null) {
        // Step 1: Validate and update offer
        const offers: Offer[] = JSON.parse(localStorage.getItem("Offers") || "[]");
        const updatedOffers = offers.map(off =>
          off.id === offer.id ? { ...off, status: "accepted" } : off
        );
        localStorage.setItem("Offers", JSON.stringify(updatedOffers));
  
        // Step 2: Retrieve existing positions
        const storedPositions = localStorage.getItem("Positions");
        const positions: Position[] = storedPositions ? JSON.parse(storedPositions) : [];
  
        // Step 3: Add the new position and mark it as accepted
        const updatedPositions = [...positions, { ...position, status: "accepted" }];
        localStorage.setItem("Positions", JSON.stringify(updatedPositions));
  
        // Step 4: Notifications and balance
        window.dispatchEvent(new Event("localPositionsUpdated"));
        message.success("Position added successfully!");
        createNotification(1, `Your offer for Product: ${product?.title} has been matched!`);
        createNotification(2, `Your position for your Product: ${product?.title} has been matched!`);
        updateBalance(position.minPrice*position.pieces, true);
  
      } else {
        // No offer - simple add
        const storedPositions = localStorage.getItem("Positions");
        const positions: Position[] = storedPositions ? JSON.parse(storedPositions) : [];
        const updatedPositions = [...positions, position];
        localStorage.setItem("Positions", JSON.stringify(updatedPositions));
  
        window.dispatchEvent(new Event("localPositionsUpdated"));
        message.success("Position added successfully!");
        updateBalance(position.minPrice*position.pieces, false);
      }
    } catch (error) {
      console.error("Error adding position:", error);
    }
  };  

  return { products, getProducts, getPositions, getOffers, getBestPositions, getUserPositionedProducts, getUserPositionsForProduct, deletePosition, addPosition };
};

export default useProducts;
