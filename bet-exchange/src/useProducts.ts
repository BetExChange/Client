import { useState, useEffect } from "react";
import { Product, Position } from "./Types";

type useProductsAPI = {
  products: Product[];
  getProducts: () => void;
  getPositions: (productId: number) => Position[];
};

const useProducts = (): useProductsAPI => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = () => {
    const storedProducts = localStorage.getItem("Products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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

  return { products, getProducts, getPositions };
};

export default useProducts;
