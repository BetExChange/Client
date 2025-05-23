import { useQuery } from '@tanstack/react-query';
import { Position } from './Types';

const API_BASE_URL = process.env.VITE_API_BASE_URL;

const fetchUserPositions = async (userId: number, productId: number): Promise<Position[]> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/products/${productId}/positions`);
    if (!response.ok) {
      throw new Error("Failed to fetch positions");
    }
    return response.json();
};

export const useUserPositionsForProduct = (userId: number, productId: number) => {
  return useQuery<Position[]>({
    queryKey: ['positions', userId, productId],
    queryFn: () => fetchUserPositions(userId, productId),
    staleTime: 5 * 60 * 1000,
    enabled: !!userId && !!productId
  });
};

  