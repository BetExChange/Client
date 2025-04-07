import { Button, Drawer } from "antd";
import { Position, Product } from "./Types";
import { useState } from "react";
import OfferForm from "./OfferForm";

type PositionItemProps = {
    position: Position;
    product: Product;
    closeDrawer: () => void;
    openDrawer: (form: "overview" | "offer") => void;
}

const PositionItem: React.FC<PositionItemProps> = ({position, product,}) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    
    const openDrawer = () => {
        setDrawerVisible(true);
    };
        
    const closeDrawer = () => setDrawerVisible(false);

    return (
        <>
        <Button onClick={openDrawer}>
            {position.minPrice}€ x {position.pieces}
        </Button>
        <Drawer closable={false} placement="right" onClose={closeDrawer} open={drawerVisible}>
            <OfferForm product={product} position={position} closeDrawer={closeDrawer} />
        </Drawer>
        </>
    );
};

export default PositionItem;