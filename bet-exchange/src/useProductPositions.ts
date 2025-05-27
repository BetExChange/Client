import { useQuery } from "@tanstack/react-query";
import { Position } from "./Types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useProductPositions = (productId: number) => {
  return useQuery<Position[], Error>({
    queryKey: ["positions", productId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/positions`);

      if (!response.ok) {
        throw new Error("Failed to fetch positions");
      }

      const positions = await response.json();

      try {  
        const lowestPrices = [...positions]
          .sort((a, b) => a.minPrice - b.minPrice)
          .slice(0, 3)
          .reverse();
    
        return [...lowestPrices];
      } catch (error) {
        console.error("Failed to parse positions", error);
        return [];
      }
    },
  });
};
