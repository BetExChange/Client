import React, { useEffect, useState } from 'react';
import { Table, Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Product } from './Types';
import useProducts from './useProducts';

const SellerTable: React.FC<{ userId: number }> = ({ userId }) => {
    const { getUserPositionedProducts } = useProducts();
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      const fetchedProducts = getUserPositionedProducts(userId);
      setProducts(fetchedProducts);
    }, [userId, getUserPositionedProducts]);
  
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
          url ? <Image width={50} src={url} alt="product" /> : 'No image',
      },
      {
        title: 'Edit',
        key: 'edit',
        render: (_, record) => (
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        ),
      },
    ];
  
    const handleEdit = (product: Product) => {
      
      console.log('Edit clicked for', product);
    };
  
    return (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={products}
          pagination={false}
          style={{marginTop:'25px'}}
        />
    );
  };
  
  export default SellerTable;
  