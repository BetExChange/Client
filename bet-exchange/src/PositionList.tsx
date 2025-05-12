import { List } from "antd";
import PositionItem from "./PositionItem";
import { useProductPositions } from "./useProductPositions";
import { Product } from "./Types";

type PositionListProps = {
  product: Product;
  type: "Drawer" | "Modal";
};

const PositionList: React.FC<PositionListProps> = ({ product, type }) => {
  const { data: positions = [] } = useProductPositions(product.id);

  const isModal = type === "Modal";
  const reversedPositions = isModal ? [...positions].reverse() : positions;

  return (
    <List
      dataSource={reversedPositions}
      split={false}
      renderItem={(position) => (
        <List.Item
          style={{
            display: isModal ? "inline-block" : "block",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          <PositionItem
            type={type}
            position={position}
            product={product}
            color={isModal ? "orange" : "teal"}
          />
        </List.Item>
      )}
      locale={{
        emptyText: <div />,
      }}
    />
  );
};

export default PositionList;
