import { List, Empty } from "antd";
import useProducts from "./useProducts";
import { Product } from "./Types";
import OfferItem from "./OfferItem";

type OfferListProps = {
    product: Product;
    onClick: () => void;
    type: "Drawer" | "Modal";
};

const OfferList: React.FC<OfferListProps> = ({ product, type }) => {
    const { getOffers } = useProducts();
    const offers = getOffers(product.id).filter((offer) => offer.status === "open");

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
