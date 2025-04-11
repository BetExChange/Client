import { Button, DatePicker, Divider, Form, InputNumber, Select, Typography } from "antd";
import { Product, Offer, Position } from "./Types";
import { useState, useEffect } from "react";
import useProducts from "./useProducts";

const { Text } = Typography;

type OfferFormProps = {
  product: Product;
  position?: Position;
  closeDrawer: () => void;
};

const OfferForm: React.FC<OfferFormProps> = ({ product, closeDrawer, position }) => {
  const { addOffer } = useProducts();
  const [form] = Form.useForm();
  const [unitPrice, setUnitPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);

  useEffect(() => {
    if (position) {
      setUnitPrice(position.minPrice);
      setQuantity(position.pieces);
      form.setFieldsValue({ unitPrice: position.minPrice, quantity: position.pieces });
    }
  }, [position, form]);

  const feePercentage = 0.05;
  const totalAmount = (unitPrice || 0) * (quantity || 0);
  const fee = totalAmount * feePercentage;
  const grandTotal = totalAmount + fee;

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const newOffer: Offer = {
        id: Date.now(),
        productId: product.id,
        buyerId: 1,
        quantity: values.quantity,
        price: values.unitPrice,
        duration: values.duration.toDate(),
        paymentMethod: values.paymentMethod,
        address: values.location,
        status: 'open'
      };
      addOffer(newOffer, grandTotal, position, product);
      closeDrawer();
    })
  }

  return (
    <Form form={form} layout="vertical" style={{ display: "flex", flexDirection: "column", height: "95vh" }}>
      <h2 style={{ textAlign: "center" }}>Place Your Offer</h2>
      <Divider />
      <img
        src={product.imageUrl}
        alt={product.title}
        style={{ width: "100%", maxWidth: "300px", height: "auto", borderRadius: "10px", marginBottom: "10px" }}
      /> 
      <h3 style={{ textAlign: "center" }}>{product.title}</h3>

      <Form.Item label="Unit Price (€):" name="unitPrice" rules={[{ required: true, message: "Please enter a valid price!" }]}>            
        <InputNumber
          value={unitPrice || undefined}
          min={0}
          style={{ width: "100%" }}
          onChange={(value) => setUnitPrice(value || 0)}
          controls={false}
        />
      </Form.Item>

      <Form.Item label="Quantity:" name="quantity" rules={[{ required: true, message: "Please enter a valid quantity!" }]}>            
        <InputNumber
          value={quantity || undefined}
          min={1}
          style={{ width: "100%" }}
          onChange={(value) => setQuantity(value || 1)}
        />
      </Form.Item>

      <Form.Item label="Duration Until:" name="duration" rules={[{ required: true, message: "Please select a duration!" }]}>            
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <div style={{ padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "8px", marginBottom: "10px" }}>
        <Text strong>Subtotal: {totalAmount.toFixed(2)}€</Text>
        <br />
        <Text>Fee (5%): {fee.toFixed(2)}€</Text>
        <br />
        <Text>Shipping: Free</Text>
        <br />
        <Text strong style={{ fontSize: "16px" }}>Total: {grandTotal.toFixed(2)}€</Text>
      </div>

      <Form.Item label="Payment Method:" name="paymentMethod" rules={[{ required: true, message: "Please select a payment method!" }]}>            
        <Select
          showSearch
          placeholder="Select a payment method"
          optionFilterProp="label"
          options={[
            { value: 'Card A', label: 'Card A' },
            { value: 'Card B', label: 'Card B' },
          ]}
        />
      </Form.Item>

      <Form.Item label="Location:" name="location" rules={[{ required: true, message: "Please select a location!" }]}>
        <Select
          showSearch
          placeholder="Select a location"
          optionFilterProp="label"
          options={[
            { value: 'Store', label: 'Store' },
            { value: 'House', label: 'House' },
          ]}
        />
      </Form.Item>

      <Button type="primary" style={{ backgroundColor: "teal", borderColor: "teal", marginBottom: "10px", padding: '10px'}} onClick={handleSubmit}>
        Place Offer
      </Button>

      <Button danger onClick={closeDrawer} style={{ marginBottom: "10px", padding: '10px' }}>
        Cancel
      </Button>
    </Form>
  );
};

export default OfferForm;
