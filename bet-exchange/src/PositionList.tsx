import { List, Empty } from "antd";
import PositionItem from "./PositionItem";
import useProducts from "./useProducts";
import { Product } from "./Types";

type PositionListProps = {
    product: Product;
    closeDrawer: () => void;
    openDrawer: (form: "overview" | "offer") => void;
};

const PositionList: React.FC<PositionListProps> = ({ product, openDrawer, closeDrawer }) => {
    const { getPositions } = useProducts();
    const positions = getPositions(product.id).filter(position => position.status === "open");

    return (
        <List
            dataSource={positions}
            style={{
                padding: "10px",
                maxWidth: "1200px",
                margin: "auto",
            }}
            itemLayout="vertical"
            renderItem={(position, index) => (
                <List.Item style={{ display: "flex", justifyContent: "center" }}>
                    <PositionItem position={position} product={product} openDrawer={openDrawer} closeDrawer={closeDrawer} color={index < 3 ? "teal" : "orange"}/>
                </List.Item>
            )}
            locale={{
                emptyText: <Empty description="No positions available for this product." />,
            }}
        />
    );
};

export default PositionList;
