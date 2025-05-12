import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { CreatePositionDTO, Position } from './Types';

type AddPositionInput =
  | Position
  | (CreatePositionDTO & { offerId?: number; productTitle?: string });

  const addPositionToApi = async (input: AddPositionInput) => {
    const {
      productId,
      sellerId,
      pieces,
      minPrice,
      expirationDate,
    } = input;
  
    const dto: CreatePositionDTO = {
      productId,
      sellerId,
      pieces,
      minPrice,
      expirationDate,
    };

    if ('offerId' in input && input.offerId !== undefined) {
        dto.offerId = input.offerId;
      }
    if ('productTitle' in input && input.productTitle !== undefined) {
        dto.productTitle = input.productTitle;
    }
  
    const res = await fetch('http://localhost:8080/api/positions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
  
    if (!res.ok) throw new Error('Failed to add position');
    return res.json();
};

export const useAddPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPositionToApi,
    onSuccess: (variables) => {
      const { offerId } = variables as CreatePositionDTO;

      // Refetch positions, offers, or anything else related
      queryClient.invalidateQueries({ queryKey: ['positions'] });
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({ queryKey: ['products-with-best-positions'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });

      if (!offerId) {
        message.success('Position added successfully!');
      }
    },
    onError: (error) => {
      console.error('Error adding position:', error);
      message.error('Failed to add position');
    },
  });
};
