import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Col, DatePicker, Descriptions, DescriptionsProps, Divider, Form, Row, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Navbar from './NavBar';
import { Product } from './Types';
import PositionTable from './PositionTable';
import AddPositionModal from './AddPositionModal';
import useProducts from './useProducts';
import { useAuth } from './AuthProvider';
import OfferList from './OfferList';

const { Title } = Typography;

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const product: Product = location.state?.product;
  const [modalOpen, setModalOpen] = useState(false);
  const { addPosition } = useProducts();
  const { userId } = useAuth();
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const [exchangeData, setExchangeData] = useState<{
    lastPrice: string;
    minBid: string;
    marketDepth: number;
  } | null>(null);

  const productDetails: DescriptionsProps['items'] = [
    { key: '1', label: 'Name', children: product.title },
    { key: '2', label: 'Barcode', children: product.barcode },
    { key: '3', label: 'Brand', children: product.brand },
    { key: '4', label: 'Description', children: product.description },
  ];

  const prices: DescriptionsProps['items'] = [
    { key: '1', label: 'Marketplace Price', children: `${Math.floor(Math.random() * 20)} €` },
    { key: '2', label: 'Total Inventory', children: `${Math.floor(Math.random() * 50)}` },
    { key: '3', label: 'Available', children: `${Math.floor(Math.random() * 50)}` },
  ];
  
  return (
    <div style={{ padding: '0 20px' }}>
      <Navbar />

      {/* Product image and details */}
      <Row gutter={40} style={{ marginTop: '100px' }} align="top">
        <Col xs={24} sm={8} md={6} lg={6} xl={6}>
          <img
            alt={product.title}
            src={product.imageUrl}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </Col>
        <Col xs={24} sm={16} md={18} lg={18} xl={18}>
          <Descriptions
            title="Product Details"
            items={productDetails}
            column={1}
            layout="horizontal"
          />
        </Col>
      </Row>

      <Divider />

      {/* Prices */}
      <Title level={3}>Prices</Title>
      <Row style={{ paddingTop: '40px' }}>
        <Col span={24}>
          <Descriptions items={prices} column={3} layout="horizontal" />
        </Col>
      </Row>

      <Divider />

      {/* Positions header and add button */}
      <Row align="middle" justify="start" style={{ marginBottom: 40 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>Positions</Title>
        </Col>
        <Col>
          <Button type="primary" style={{marginLeft:"20px"}} onClick={() => setModalOpen(true)}>Add Position</Button>
        </Col>
      </Row>

      {/* Position table */}
      <Row>
        <Col span={24}>
          <PositionTable product={product} />
        </Col>
      </Row>

      {/* Add position Modal */}
      {userId && (
        <AddPositionModal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={(pos) => {
            addPosition(pos);
            window.dispatchEvent(new Event("localPositionsUpdated"));
          }}
          productId={product.id}
          sellerId={userId}
        />
      )}

    <Divider />

    {/* Exchange Activity Section */}
    <Row  align="middle" justify="space-between" style={{ marginBottom: 40 }}>
      <Col>
        <Title level={3} style={{ margin: 0 }}>Exchange Activity</Title>
      </Col>

      {/* Date Range + Button */}
      <Col>
        <Form.Item label="From (date):" style={{ marginBottom: 0 }}>
          <DatePicker style={{ width: 300 }} onChange={(date) => setFromDate(date)} />
        </Form.Item>
      </Col>

      <Col>
        <Form.Item label="To (date):" style={{ marginBottom: 0 }}>
          <DatePicker style={{ width: 300 }} onChange={(date) => setToDate(date)} />
        </Form.Item>
      </Col>

      <Col>
        <Button
          icon={<SearchOutlined />}
          type="primary"
          disabled={!fromDate || !toDate}
          onClick={() => {
            setExchangeData({
              lastPrice: (Math.random() * 20).toFixed(2),
              minBid: (Math.random() * 15).toFixed(2),
              marketDepth: Math.floor(Math.random() * 100),
            });
          }}
        >
          Search
        </Button>
      </Col>
    </Row>

    <Row>
      <Col>
        <Descriptions column={1} layout="horizontal" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Last price matched">
            {exchangeData?.lastPrice ?? '0.00'} €
          </Descriptions.Item>
          <Descriptions.Item label="Minimum bid price">
            {exchangeData?.minBid ?? '0.00'} €
          </Descriptions.Item>
          <Descriptions.Item label="Market depth (pieces)">
            {exchangeData?.marketDepth ?? '0'}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>

    <Divider />

    {/* Current Market State Section*/}
    <Row  style={{marginBottom: 40}}>
      <Col>
        <Title level={3} style={{ margin: 0 }}>Current Market State</Title>
      </Col>
    </Row>

    <Row>
      <OfferList product={product}/>
    </Row>
    </div>
  );
};

export default ProductDetails;
