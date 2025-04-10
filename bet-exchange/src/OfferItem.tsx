import { Badge, Button } from "antd";
import { Offer, Product } from "./Types";
import { useState } from "react";
import AddPositionModal from "./AddPositionModal";
import useProducts from "./useProducts";
import { useAuth } from "./AuthProvider";

type OfferItemProps = {
    offer: Offer;
    product: Product;
    color: string;
}

const OfferItem: React.FC<OfferItemProps> = ({offer, product, color}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { addPosition } = useProducts();
    const { userId } = useAuth();

    return (
        <>
        <Badge count={offer.quantity} offset={[-5, 30]} color="#b8b6b6" style={{ color: "black" }}>
            <Button 
                type="primary" 
                style={{ backgroundColor: color, borderColor: color, width: "100px"}} 
                onClick={() => setModalOpen(true)}
            >
                {offer.price} €
            </Button>
        </Badge>
        {userId && (
            <AddPositionModal
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={(pos, product, offer) => {
                    addPosition(pos, product, offer);
                    window.dispatchEvent(new Event("localPositionsUpdated"));
                }}
                product={product}
                sellerId={userId}
                offer={offer}
            />
      )}
        </>
    );
};

export default OfferItem;