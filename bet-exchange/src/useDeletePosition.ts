import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const deletePositionFromApi = async (positionId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/positions/${positionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete position');
  }
};

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePositionFromApi,
    onSuccess: (_,) => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });

      window.dispatchEvent(new Event("localPositionsUpdated"));

      message.success("Position deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting position:", error);
      message.error("Failed to delete position");
    },
  });
};
