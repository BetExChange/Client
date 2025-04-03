import { List } from "antd";
import ProductItem from "./ProductItem";
import useProducts from "./useProducts";

type ProductListProps = {
    openDrawer: () => void;
};

const ProductList: React.FC<ProductListProps> = ({ openDrawer }) => {
    const { products } = useProducts();

  return (
    <List
      grid={{
        gutter: 254,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={products}
      style={{ padding: "10px", paddingTop: '100px', maxWidth: "1200px", margin: "auto"}}
      itemLayout="horizontal"
      renderItem={(product) => (
        <List.Item style={{ display: "flex", justifyContent: "center" }}>
          <ProductItem product={product} openDrawer={openDrawer} />
        </List.Item>
      )}
    />
  );
};

export default ProductList;
