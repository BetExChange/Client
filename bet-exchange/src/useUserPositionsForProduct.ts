const fetchUserPositions = async (userId: number, productId: number): Promise<Position[]> => {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/products/${productId}/positions`);
    if (!response.ok) {
      throw new Error("Failed to fetch positions");
    }
    return response.json();
  };

import { useQuery } from '@tanstack/react-query';
import { Position } from './Types';

export const useUserPositionsForProduct = (userId: number, productId: number) => {
  return useQuery<Position[]>({
    queryKey: ['positions', userId, productId],
    queryFn: () => fetchUserPositions(userId, productId),
    staleTime: 5 * 60 * 1000,
    enabled: !!userId && !!productId
  });
};

  