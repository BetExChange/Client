import { Button, DatePicker, Divider, Form, InputNumber, Select, Typography } from "antd";
import { Product, Offer } from "./Types";
import { useState, useEffect } from "react";
import useProducts from "./useProducts";

const { Text, Title } = Typography;

type OfferFormProps = {
  product: Product;
  initialPrice?: number;
  initialQuantity?: number;
  closeDrawer: () => void;
};

const OfferForm: React.FC<OfferFormProps> = ({
  product,
  initialPrice,
  initialQuantity,
  closeDrawer,
}) => {
  const { addOffer } = useProducts();
  const [form] = Form.useForm();
  const [unitPrice, setUnitPrice] = useState<number | null>(initialPrice || null);
  const [quantity, setQuantity] = useState<number | null>(initialQuantity || null);

  useEffect(() => {
    if (initialPrice !== undefined && initialQuantity !== undefined) {
      setUnitPrice(initialPrice);
      setQuantity(initialQuantity);
      form.setFieldsValue({ unitPrice: initialPrice, quantity: initialQuantity });
    }
  }, [initialPrice, initialQuantity, form]);

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
      addOffer(newOffer, grandTotal, undefined, product);
      closeDrawer();
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Title level={4} style={{ textAlign: "center" }}>
        Place Your Offer
      </Title>

      <Divider />

      <div style={{ textAlign: "center" }}>
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        />
      </div>

      <Title level={5} style={{ textAlign: "center" }}>
        {product.title}
      </Title>

      <Form.Item
        label="Unit Price (€)"
        name="unitPrice"
        rules={[{ required: true, message: "Please enter a valid price!" }]}
      >
        <InputNumber
          value={unitPrice || undefined}
          min={0}
          style={{ width: "100%" }}
          onChange={(value) => setUnitPrice(value || 0)}
          controls={false}
        />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please enter a valid quantity!" }]}
      >
        <InputNumber
          value={quantity || undefined}
          min={1}
          style={{ width: "100%" }}
          onChange={(value) => setQuantity(value || 1)}
        />
      </Form.Item>

      <Form.Item
        label="Duration Until"
        name="duration"
        rules={[{ required: true, message: "Please select a duration!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <div
        style={{
          padding: "15px",
          backgroundColor: "#fafafa",
          borderRadius: "8px",
        }}
      >
        <Text strong>Subtotal: {totalAmount.toFixed(2)}€</Text>
        <br />
        <Text>Fee (5%): {fee.toFixed(2)}€</Text>
        <br />
        <Text>Shipping: Free</Text>
        <br />
        <Text strong style={{ fontSize: "16px" }}>
          Total: {grandTotal.toFixed(2)}€
        </Text>
      </div>

      <Form.Item
        label="Payment Method"
        name="paymentMethod"
        rules={[{ required: true, message: "Please select a payment method!" }]}
      >
        <Select
          showSearch
          placeholder="Select a payment method"
          optionFilterProp="label"
          options={[
            { value: "Card A", label: "Card A" },
            { value: "Card B", label: "Card B" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Please select a location!" }]}
      >
        <Select
          showSearch
          placeholder="Select a location"
          optionFilterProp="label"
          options={[
            { value: "Store", label: "Store" },
            { value: "House", label: "House" },
          ]}
        />
      </Form.Item>

      <Button
        type="primary"
        block
        style={{ backgroundColor: "teal", borderColor: "teal" }}
        onClick={handleSubmit}
      >
        Place Offer
      </Button>

      <Button block danger onClick={closeDrawer}>
        Cancel
      </Button>
    </Form>
  );
};

export default OfferForm;
