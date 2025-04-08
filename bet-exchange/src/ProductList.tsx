import { List } from "antd";
import ProductItem from "./ProductItem";
import { Product } from "./Types";

type ProductListProps = {
  products: Product[];
}


const ProductList: React.FC<ProductListProps> = ({products}) => {
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
          <ProductItem product={product} />
        </List.Item>
      )}
    />
  );
};

export default ProductList;
