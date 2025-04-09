import { List, Empty } from "antd";
import useProducts from "./useProducts";
import { Product } from "./Types";
import OfferItem from "./OfferItem";

type OfferListProps = {
    product: Product;
};

const OfferList: React.FC<OfferListProps> = ({ product }) => {
    const { getOffers } = useProducts();
    const offers = getOffers(product.id).filter((offer) => offer.status === "open");

    return (
        <List
            grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 4, xl: 6 }}
            dataSource={offers}
            renderItem={(offer) => (
                <List.Item>
                    <OfferItem offer={offer} product={product} />
                </List.Item>
            )}
            locale={{
                    emptyText: <Empty description="No offers available for this product." />,
            }}
        />
    );
};

export default OfferList;
