import { useEffect, useState } from "react";
import { Product } from "./Types";
import useProducts from "./useProducts";

const useSearch = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const searchProducts = (query: string) => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(trimmed) ||
        product.description?.toLowerCase().includes(trimmed)
    );

    setFilteredProducts(filtered);
  };

  return {
    filteredProducts,
    searchProducts,
  };
};

export default useSearch;
