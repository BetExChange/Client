import { Drawer } from "antd";
import PriceLabel from "./PriceLabel";
import OfferForm from "./OfferForm";
import { Product } from "./Types";
import { useState } from "react";

type OpenDrawerProps = {
  product: Product;
  initialPrice: number;
  initialQuantity: number;
  color: string;
};

const OpenDrawer: React.FC<OpenDrawerProps> = ({
  product,
  initialPrice,
  initialQuantity,
  color,
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <>
      <PriceLabel
        pieces={initialQuantity}
        price={initialPrice}
        onClick={openDrawer}
        color={color}
      />
      <Drawer closable={false} placement="right" onClose={closeDrawer} open={drawerVisible}>
        <OfferForm
          product={product}
          initialPrice={initialPrice}
          initialQuantity={initialQuantity}
          closeDrawer={closeDrawer}
        />
      </Drawer>
    </>
  );
};

export default OpenDrawer;
