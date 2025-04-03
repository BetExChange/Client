import { useState, useEffect } from "react";
import { Product } from "./Types";

type useProductsAPI = {
  products: Product[];
  getProducts: () => void;
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

  return { products, getProducts};
};

export default useProducts;
