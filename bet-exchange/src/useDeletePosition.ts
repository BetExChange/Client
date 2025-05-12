import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const deletePositionFromApi = async (positionId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/positions/${positionId}`, {
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
