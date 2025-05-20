import { Product, BestPositionsDTO } from "./Types";
import { useQuery} from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type useProductsAPI = {
  products: Product[];
  getBestPositions: (product: Product) => void;
};

const fetchProducts = async () => {
  const res = await fetch(
    `${API_BASE_URL}/products`,
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }
  const { content } = await res.json();
  return content as Product[];
};

const useProducts = (): useProductsAPI => {  
  // 1. QUERY: fetch products
  const { data: rawProducts = [] } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    refetchOnWindowFocus: false,
  });

  const getBestPositions = async (product: Product): Promise<Product> => {
    const fetchBestPositions = async (productId: number): Promise<BestPositionsDTO> => {
      const res = await fetch(`${API_BASE_URL}/products/${productId}/best-positions`);
      if (!res.ok) {
        throw new Error(`Failed to fetch best positions for product ${productId}`);
      }
      return res.json();
    };

    try {
      const bestPositions = await fetchBestPositions(product.id);
      return {
        ...product,
        bestPricePosition: bestPositions.bestPricePosition,
        bestQuantityPosition: bestPositions.bestQuantityPosition,
      };
    } catch (error) {
      console.error("Failed to fetch best positions", error);
      return {
        ...product,
        bestPricePosition: null,
        bestQuantityPosition: null,
      };
    };
  }

  const getAllProductsWithBestPositions = async (products: Product[]): Promise<Product[]> => {
    return await Promise.all(products.map(getBestPositions));
  };

  const { data: products = [] } = useQuery<Product[], Error>({
    queryKey: ["products-with-best-positions", rawProducts.map((p) => p.id)],
    queryFn: () => getAllProductsWithBestPositions(rawProducts),
    enabled: rawProducts.length > 0,
    refetchOnWindowFocus: false,
  });

  return { 
    products: products,
    getBestPositions, 
  };
};

export default useProducts;
