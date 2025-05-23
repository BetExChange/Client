import { useQuery } from "@tanstack/react-query";
import { Offer } from "./Types";

const API_BASE_URL = process.env.VITE_API_BASE_URL;

export const useProductOffers = (productId: number) => {
  return useQuery<Offer[], Error>({
    queryKey: ["offers", productId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/offers`);

      if (!response.ok) {
        throw new Error("Failed to fetch positions");
      }

      const offers = await response.json();

      try {  
        const highestPrices = [...offers]
          .sort((a, b) => b.price - a.price)
          .slice(0, 3);
    
        return [...highestPrices];
      } catch (error) {
        console.error("Failed to parse offers", error);
        return [];
      }
    },
  });
};
