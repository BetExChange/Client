import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { CreateOfferDTO, Offer } from './Types';

type AddOfferInput =
  | Offer
  | (CreateOfferDTO & { positionId?: number; productTitle?: string });

  const addOfferToApi = async (input: AddOfferInput) => {
    const {
      productId,
      buyerId,
      quantity,
      price,
      duration,
      paymentMethod,
      address
    } = input;
  
    const dto: CreateOfferDTO = {
      productId,
      buyerId,
      quantity,
      price,
      duration,
      paymentMethod,
      address
    };

    if ('positionId' in input && input.positionId !== undefined) {
        dto.positionId = input.positionId;
      }
    if ('productTitle' in input && input.productTitle !== undefined) {
        dto.productTitle = input.productTitle;
    }
  
    const res = await fetch('http://localhost:8080/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
  
    if (!res.ok) throw new Error('Failed to add offer');
    return res.json();
};

export const useAddOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOfferToApi,
    onSuccess: (variables) => {
      const { positionId } = variables as CreateOfferDTO;

      // Refetch positions, offers, or anything else related
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({ queryKey: ['positions'] });
      queryClient.invalidateQueries({ queryKey: ['products-with-best-positions'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });

      if (!positionId) {
        message.success('Offer added successfully!');
      }
    },
    onError: (error) => {
      console.error('Error adding offer:', error);
      message.error('Failed to add offer');
    },
  });
};
