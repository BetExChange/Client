import { useState, useEffect } from "react";
import { Product, Position } from "./Types";
import { message } from "antd";

type useProductsAPI = {
  products: Product[];
  getProducts: () => void;
  getPositions: (productId: number) => Position[];
  getBestPositions: (product: Product) => void;
  getUserPositionedProducts: (userId: number) => Product[];
  getUserPositionsForProduct: (userId: number, productId: number) => Position[];
  deletePosition: (positionId: number) => void;
  addPosition: (position: Position)  => void;
};

const useProducts = (): useProductsAPI => {
  const [products, setProducts] = useState<Product[]>([]);

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
      return allPositions.filter((pos) => pos.productId === productId);
    } catch (error) {
      console.error("Failed to parse positions from localStorage", error);
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
        positions
          .filter((pos) => pos.sellerId === userId)
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
        (pos) => pos.productId === productId && pos.sellerId === userId
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
  
  const addPosition = (position: Position) => {
    const storedPositions = localStorage.getItem("Positions");
    try {
      const positions: Position[] = storedPositions ? JSON.parse(storedPositions) : [];
  
      const updatedPositions = [...positions, position];
      localStorage.setItem("Positions", JSON.stringify(updatedPositions));
  
      window.dispatchEvent(new Event("localPositionsUpdated"));
      message.success("Position added successfully!")
    } catch (error) {
      console.error("Error adding position:", error);
    }
  };
  

  return { products, getProducts, getPositions, getBestPositions, getUserPositionedProducts, getUserPositionsForProduct, deletePosition, addPosition };
};

export default useProducts;
