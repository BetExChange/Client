import { Button } from "antd";
import { Offer, Product } from "./Types";
import { useState } from "react";
import AddPositionModal from "./AddPositionModal";
import useProducts from "./useProducts";
import { useAuth } from "./AuthProvider";

type OfferItemProps = {
    offer: Offer;
    product: Product;
}

const OfferItem: React.FC<OfferItemProps> = ({offer, product,}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { addPosition } = useProducts();
    const { userId } = useAuth();

    return (
        <>
        <Button onClick={() => setModalOpen(true)}>
            {offer.price}€ x {offer.quantity}
        </Button>
        {userId && (
            <AddPositionModal
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={(pos) => {
                    addPosition(pos);
                    window.dispatchEvent(new Event("localPositionsUpdated"));
                }}
                productId={product.id}
                sellerId={userId}
                minPrice={offer.price}
                pieces={offer.quantity}
            />
      )}
        </>
    );
};

export default OfferItem;