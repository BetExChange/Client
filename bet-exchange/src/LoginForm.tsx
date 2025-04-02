import React from 'react';
import { Button, Typography, Space, Card, Row, Col } from 'antd';
import { useAuth } from './AuthProvider';

const { Title } = Typography;

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col>
        <Card
          style={{
            width: 600,
            padding: 24,
            textAlign: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: 12,
          }}
        >
          <Title level={3}>Login as:</Title>
          <Space direction="vertical" size="large" style={{ width: '80%' }}>
            <Button
              block
              type="primary"
              size="large"
              style={{ borderRadius: 8, fontWeight: 'bold' }}
              onClick={() => login("buyer")}
            >
              Buyer
            </Button>
            <Button
              block
              type="default"
              size="large"
              style={{ borderRadius: 8, fontWeight: 'bold' }}
              onClick={() => login("seller")}
            >
              Seller
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
