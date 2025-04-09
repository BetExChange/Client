import React, { useState } from 'react';
import { Modal, InputNumber, DatePicker, Form, Button } from 'antd';
import { Position } from './Types';

type AddPositionModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (position: Position) => void;
  productId: number;
  sellerId: number;
  minPrice?: number;
  pieces?: number;
};

const AddPositionModal: React.FC<AddPositionModalProps> = ({ visible, onClose, onAdd, productId, sellerId, minPrice: propMinPrice = 0, pieces: propPieces = 1 }) => {
  const [minPrice, setMinPrice] = useState<number>(propMinPrice);
  const [pieces, setPieces] = useState<number>(propPieces);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const handleOk = () => {
    if (!expirationDate) return;

    const newPosition: Position = {
      id: Math.floor(Math.random() * 20),
      productId,
      sellerId,
      minPrice,
      pieces,
      expirationDate,
      status: "open"
    };
    onAdd(newPosition);
    onClose();
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null}>
      <h3>Add position</h3>
      <Form layout="vertical">
        <Form.Item label="Min Price:">
          <InputNumber
            value={minPrice}
            onChange={(val) => setMinPrice(val ?? 0)}
            addonAfter="€"
            min={0}
            controls={false}
          />
        </Form.Item>
        <Form.Item label="Pieces:">
          <InputNumber
            value={pieces}
            onChange={(val) => setPieces(val ?? 1)}
            min={1}
          />
        </Form.Item>
        <Form.Item label="Expiration:">
          <DatePicker
            style={{ width: "100%" }}
            onChange={(date) => setExpirationDate(date?.toDate() ?? null)}
          />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleOk}>Ok</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPositionModal;
