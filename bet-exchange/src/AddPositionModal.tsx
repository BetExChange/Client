import React, { useEffect } from 'react';
import { Modal, InputNumber, DatePicker, Form, Button, Divider } from 'antd';
import { Offer, Position, Product } from './Types';

type AddPositionModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (position: Position, offer?: Offer, product?: Product) => void;
  product: Product;
  sellerId: number;
  offer?: Offer;
};

const AddPositionModal: React.FC<AddPositionModalProps> = ({ visible, onClose, onAdd, product, sellerId, offer }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        minPrice: offer?.price ?? 0,
        pieces: offer?.quantity ?? 1,
        expirationDate: null,
      });
    }
  }, [visible, offer, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newPosition: Position = {
        id: Math.floor(Math.random() * 20) + 1,
        productId: product.id,
        sellerId,
        minPrice: values.minPrice,
        pieces: values.pieces,
        expirationDate: values.expirationDate.toDate(),
        status: "open",
      };
      onAdd(newPosition, offer, product);
      onClose();
      form.resetFields();
    } catch (err) {
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null}>
      <h3>Add position</h3>
      <Divider />
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
      >
        <Form.Item
          label="Min Price:"
          name="minPrice"
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <InputNumber
            addonAfter="€"
            min={0}
            controls={false}
            style={{ width: "50%" }}
          />
        </Form.Item>

        <Form.Item
          label="Pieces:"
          name="pieces"
          rules={[{ required: true, message: "Please enter quantity" }]}
        >
          <InputNumber
            min={1}
            style={{ width: "50%" }}
          />
        </Form.Item>

        <Form.Item
          label="Expiration:"
          name="expirationDate"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "50%" }} />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button onClick={() => { form.resetFields(); onClose(); }}>Cancel</Button>
          <Button type="primary" onClick={handleOk}>OK</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddPositionModal;
