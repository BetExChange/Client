import React, { useEffect, useState } from 'react';
import { Table, Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { Product } from './Types';
import useProducts from './useProducts';

const SellerTable: React.FC<{ userId: number }> = ({ userId }) => {
  const { getUserPositionedProducts } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchedProducts = getUserPositionedProducts(userId);
    setProducts(fetchedProducts);
  }, [userId]);
  
  const columns: ColumnsType<Product> = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      render: (barcode) => barcode || '—',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand) => brand || '—',
    },
    {
      title: 'Photo',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (url: string) =>
        url ? <Image width={100} src={url} alt="product" /> : 'No image',
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const handleDetails = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={products}
      pagination={false}
      style={{ marginTop: '25px' }}
    />
  );
};

export default SellerTable;
