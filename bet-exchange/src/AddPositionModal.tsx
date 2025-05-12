import React, { useEffect } from "react";
import { Modal, InputNumber, DatePicker, Form, Button, Divider } from "antd";
import { CreatePositionDTO, Product } from "./Types";
import { useAddPosition } from "./useAddPosition";

type AddPositionModalProps = {
  visible: boolean;
  onClose: () => void;
  product: Product;
  sellerId: number;
  defaultPrice?: number;
  defaultQuantity?: number;
};

const AddPositionModal: React.FC<AddPositionModalProps> = ({ visible, onClose, product, sellerId, defaultPrice = 0, defaultQuantity = 1,}) => {
  const [form] = Form.useForm();
  const { mutate: addPosition } = useAddPosition();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        minPrice: defaultPrice,
        pieces: defaultQuantity,
        expirationDate: null,
      });
    }
  }, [visible, defaultPrice, defaultQuantity, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newPosition: CreatePositionDTO = {
        productId: product.id,
        sellerId,
        minPrice: values.minPrice,
        pieces: values.pieces,
        expirationDate: values.expirationDate.endOf("day").toDate(),
        productTitle: product.title
      };
      addPosition(newPosition);
      onClose();
      form.resetFields();
    } catch (err) {
      // Handle validation errors
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
          <InputNumber min={1} style={{ width: "50%" }} />
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
