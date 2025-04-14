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
  getUserPositionsForProduct: (userId: number, productId: number) => Position[];
  deletePosition: (positionId: number) => void;
  addPosition: (position: Position, offer?: Offer, product?: Product)  => void;
  addOffer: (offer: Offer, total: number, position?:Position, product?: Product) => void;
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
      const filtered = allPositions.filter((pos) => pos.productId === productId && pos.status === "open");
  
      const lowestPrices = [...filtered]
        .sort((a, b) => a.minPrice - b.minPrice)
        .slice(0, 3)
        .reverse();
  
      return [...lowestPrices];
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
      const filtered = allOffers.filter((offer) => offer.productId === productId && offer.status === "open");

      const highestPrices = [...filtered]
        .sort((a, b) => b.price - a.price)
        .slice(0, 3)

  
      return [...highestPrices];
    } catch (error) {
      console.error("Failed to parse offers from localStorage", error);
      return [];
    }
  };

  const getBestPositions = (product: Product): Product => {
    const storedPositions = localStorage.getItem("Positions");
    if (!storedPositions) {
      const updatedProduct: Product = {
        ...product,
        bestPricePosition: null,
        bestQuantityPosition: null,
      };
  
      const storedProducts = localStorage.getItem("Products");
      if (storedProducts) {
        try {
          const productsArray: Product[] = JSON.parse(storedProducts);
          const newProductsArray = productsArray.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
          localStorage.setItem("Products", JSON.stringify(newProductsArray));
        } catch (error) {
          console.error("Failed to update product in localStorage", error);
        }
      }
  
      return updatedProduct;
    }
  
    try {
      const positions: Position[] = JSON.parse(storedPositions);
      const openPositions = positions.filter(
        (pos) => pos.productId === product.id && pos.status === "open"
      );
  
      const updatedProduct: Product = {
        ...product,
        bestPricePosition: null,
        bestQuantityPosition: null,
      };
  
      if (openPositions.length > 0) {
        updatedProduct.bestPricePosition = openPositions.reduce((prev, curr) =>
          prev.minPrice < curr.minPrice ? prev : curr
        );
  
        updatedProduct.bestQuantityPosition = openPositions.reduce((prev, curr) =>
          prev.pieces > curr.pieces ? prev : curr
        );
      }
  
      const storedProducts = localStorage.getItem("Products");
      if (storedProducts) {
        try {
          const productsArray: Product[] = JSON.parse(storedProducts);
          const newProductsArray = productsArray.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
          localStorage.setItem("Products", JSON.stringify(newProductsArray));
        } catch (error) {
          console.error("Failed to update product in localStorage", error);
        }
      }
  
      return updatedProduct;
    } catch (error) {
      console.error("Failed to compute or update best positions", error);
      return product;
    }
  };
  

  useEffect(() => {
    getProducts();
    const storedProducts = localStorage.getItem("Products");
    if (storedProducts) {
      try {
        const products: Product[] = JSON.parse(storedProducts);
        products.forEach((product) => {
          getBestPositions(product);
        });
      } catch (error) {
        console.error("Failed to parse localProducts from localStorage", error);
      }
    }

    const handleUpdate = () => {
      getProducts();
    };

    window.addEventListener("localPositionsUpdated", handleUpdate);
  
    return () => {
      window.removeEventListener("localPositionsUpdated", handleUpdate);
    };
  }, []);


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
      const storedOffers = localStorage.getItem("Offers");
      const offers: Offer[] = storedOffers ? JSON.parse(storedOffers) : [];
  
      const storedPositions = localStorage.getItem("Positions");
      const positions: Position[] = storedPositions ? JSON.parse(storedPositions) : [];
  
      if (offer != null) {
        // Case 1: Offer was passed in — mark it as accepted
        const updatedOffers = offers.map(off =>
          off.id === offer.id ? { ...off, status: "accepted" } : off
        );
        localStorage.setItem("Offers", JSON.stringify(updatedOffers));
  
        const updatedPositions = [...positions, { ...position, status: "accepted" }];
        localStorage.setItem("Positions", JSON.stringify(updatedPositions));
  
        window.dispatchEvent(new Event("localPositionsUpdated"));
        message.success("Position added successfully!");
        createNotification(1, `Your offer for Product: ${product?.title} has been matched!`);
        createNotification(2, `Your position for your Product: ${product?.title} has been matched!`);
        updateBalance(position.minPrice * position.pieces, true);
      } else {
        // Case 2: No offer — check if any offer matches this new position
        const matchingOfferIndex = offers.findIndex(off =>
          off.productId === position.productId &&
          off.price === position.minPrice &&
          off.quantity === position.pieces &&
          off.status !== "accepted"
        );
  
        if (matchingOfferIndex !== -1) {
          // Match found — mark both as accepted
          const matchingOffer = offers[matchingOfferIndex];
          offers[matchingOfferIndex] = { ...matchingOffer, status: "accepted" };
          localStorage.setItem("Offers", JSON.stringify(offers));
  
          const updatedPositions = [...positions, { ...position, status: "accepted" }];
          localStorage.setItem("Positions", JSON.stringify(updatedPositions));
  
          window.dispatchEvent(new Event("localPositionsUpdated"));
          message.success("Position matched and added successfully!");
          createNotification(1, `Your offer for Product: ${product?.title} has been matched!`);
          createNotification(2, `Your position for your Product: ${product?.title} has been matched!`);
          updateBalance(position.minPrice * position.pieces, true);
        } else {
          // No matching offer — simple add
          const updatedPositions = [...positions, position];
          localStorage.setItem("Positions", JSON.stringify(updatedPositions));
  
          window.dispatchEvent(new Event("localPositionsUpdated"));
          message.success("Position added successfully!");
          updateBalance(position.minPrice * position.pieces, false);
        }
      }
    } catch (error) {
      console.error("Error adding position:", error);
    }
  };

  const addOffer = (offer: Offer, total: number, position?: Position, product?: Product) => {
    try {
      const storedPositions = localStorage.getItem("Positions");
      const positions: Position[] = storedPositions ? JSON.parse(storedPositions) : [];
  
      const storedOffers = localStorage.getItem("Offers");
      const offers: Offer[] = storedOffers ? JSON.parse(storedOffers) : [];
  
      if (position != null) {
        // Case 1: A position is passed — match it with the offer
        const updatedPositions = positions.map(pos =>
          pos.id === position.id ? { ...pos, status: "accepted" } : pos
        );
        localStorage.setItem("Positions", JSON.stringify(updatedPositions));
  
        const acceptedOffer: Offer = { ...offer, status: "accepted" };
        const updatedOffers = [...offers, acceptedOffer];
        localStorage.setItem("Offers", JSON.stringify(updatedOffers));
  
        window.dispatchEvent(new Event("localPositionsUpdated"));
        message.success("Offer placed and matched successfully!");
        createNotification(1, `Your offer for Product: ${product?.title} has been matched!`);
        createNotification(2, `A position for your Product: ${product?.title} has been matched!`);
        updateBalance(total, true);
      } else {
        // Case 2: No position passed — see if there's a matching position
        const matchingPositionIndex = positions.findIndex(pos =>
          pos.productId === offer.productId &&
          pos.minPrice === offer.price &&
          pos.pieces === offer.quantity &&
          pos.status !== "accepted"
        );
  
        if (matchingPositionIndex !== -1) {
          // Match found — update position and mark offer as accepted
          const matchingPosition = positions[matchingPositionIndex];
          positions[matchingPositionIndex] = { ...matchingPosition, status: "accepted" };
          localStorage.setItem("Positions", JSON.stringify(positions));
  
          const acceptedOffer: Offer = { ...offer, status: "accepted" };
          const updatedOffers = [...offers, acceptedOffer];
          localStorage.setItem("Offers", JSON.stringify(updatedOffers));
  
          window.dispatchEvent(new Event("localPositionsUpdated"));
          message.success("Offer matched and placed successfully!");
          createNotification(1, `Your offer for Product: ${product?.title} has been matched!`);
          createNotification(2, `A position for your Product: ${product?.title} has been matched!`);
          updateBalance(total, true);
        } else {
          // No match — simple add
          const updatedOffers = [...offers, offer];
          localStorage.setItem("Offers", JSON.stringify(updatedOffers));
  
          message.success("Offer placed successfully!");
          createNotification(2, `An offer for your Product: ${product?.title} has been created!`);
          updateBalance(total, false);
        }
      }
    } catch (error) {
      console.error("Error placing offer:", error);
      message.error("Something went wrong while placing the offer.");
    }
  };

  return { 
    products,
    getProducts,
    getPositions, 
    getOffers, 
    getBestPositions, 
    getUserPositionsForProduct, 
    deletePosition, 
    addPosition, 
    addOffer,
  };
};

export default useProducts;
