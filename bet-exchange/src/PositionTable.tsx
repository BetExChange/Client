import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Position, Product } from './Types';
import { useAuth } from './AuthProvider';
import { useUserPositionsForProduct } from './useUserPositionsForProduct';
import { useDeletePosition } from './useDeletePosition';

type PositionTableProps = {
  product: Product;
}

const PositionTable: React.FC<PositionTableProps> = ({product}) => {
  const { userId } = useAuth();
  const { data: positions = [] } = useUserPositionsForProduct(userId!, product.id);
  const { mutate: deletePosition } = useDeletePosition();

  const columns: ColumnsType<Position> = [
    {
      title: 'Pieces',
      dataIndex: 'pieces',
      key: 'pieces',
    },
    {
      title: 'Price',
      dataIndex: 'minPrice',
      key: 'price',
      render: (price: number) => `${price}€`,
    },
    {
      title: 'Expiration',
      dataIndex: 'expirationDate',
      key: 'expiration',
      render: (date: Date) => dayjs(date).format('D/M/YY'),
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: Position) => (
        <Popconfirm
          title="Are you sure you want to delete this position?"
          onConfirm={() => deletePosition(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    }
  ];

  return (
    <Table
      dataSource={positions}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

export default PositionTable;
