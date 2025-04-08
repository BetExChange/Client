import { useState, useEffect } from "react";
import { Product, Position } from "./Types";

type useProductsAPI = {
  products: Product[];
  getProducts: () => void;
  getPositions: (productId: number) => Position[];
  getBestPositions: (product: Product) => void;
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

  return { products, getProducts, getPositions, getBestPositions };
};

export default useProducts;
