import { Offer, Product } from "./Types";
import OpenModal from "./OpenModal";
import OpenDrawer from "./OpenDrawer";

type OfferItemProps = {
    offer: Offer;
    product: Product;
    color: string;
    type: string;
};

const OfferItem: React.FC<OfferItemProps> = ({ offer, product, color, type }) => {
    return type === "Drawer" ? (
        <OpenDrawer initialPrice={offer.price} initialQuantity={offer.quantity} product={product} color={color} />
    ) : (
        <OpenModal product={product} color={color} quantity={offer.quantity} price={offer.price}/>
    );
};

export default OfferItem;
