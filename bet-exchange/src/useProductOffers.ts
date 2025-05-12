import { useQuery } from "@tanstack/react-query";
import { Offer } from "./Types";

export const useProductOffers = (productId: number) => {
  return useQuery<Offer[], Error>({
    queryKey: ["offers", productId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/api/products/${productId}/offers`);

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
