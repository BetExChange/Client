import { useState } from "react";
import { Product } from "./Types";
import AddPositionModal from "./AddPositionModal";
import { useAuth } from "./AuthProvider";
import PriceLabel from "./PriceLabel";

type OpenModalProps = {
  product: Product;
  color: string;
  price: number;
  quantity: number;
};

const OpenModal: React.FC<OpenModalProps> = ({ product, color, price, quantity}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { userId } = useAuth();

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <PriceLabel
        pieces={quantity}
        price={price}
        onClick={handleClick}
        color={color}
      />
      {userId && (
        <AddPositionModal
          visible={modalOpen}
          onClose={handleClose}
          product={product}
          sellerId={userId}
          defaultPrice={price}
          defaultQuantity={quantity}
        />
      )}
    </>
  );
};

export default OpenModal;
