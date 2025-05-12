import { List, Empty } from "antd";
import { Product } from "./Types";
import OfferItem from "./OfferItem";
import { useProductOffers } from "./useProductOffers";

type OfferListProps = {
    product: Product;
    onClick: () => void;
    type: "Drawer" | "Modal";
};

const OfferList: React.FC<OfferListProps> = ({ product, type }) => {
   const { data: offers = [] } = useProductOffers(product.id);

    const isModal = type === "Modal";
    const reversedOffers = isModal ? [...offers].reverse() : offers;

    return (
        <List
            dataSource={reversedOffers}
            itemLayout="horizontal"
            split={false}
            renderItem={(offer) => (
                <List.Item
                    style={{
                        display: isModal ? "inline-block" : "block",
                        justifyContent: "center",
                        marginRight: "20px",
                    }}
                >
                    <OfferItem
                        type={type}
                        offer={offer}
                        product={product}
                        color={isModal ? "teal" : "orange"}
                    />
                </List.Item>
            )}
            locale={{
                emptyText: <Empty description="No offers available for this product." />,
            }}
        />
    );
};

export default OfferList;
