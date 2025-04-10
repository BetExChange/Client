import { Badge, Button, Drawer } from "antd";
import { Position, Product } from "./Types";
import { useState } from "react";
import OfferForm from "./OfferForm";

type PositionItemProps = {
    position: Position;
    product: Product;
    closeDrawer: () => void;
    openDrawer: (form: "overview" | "offer") => void;
    color: string;
}

const PositionItem: React.FC<PositionItemProps> = ({position, product, color}) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    
    const openDrawer = () => {
        setDrawerVisible(true);
    };
        
    const closeDrawer = () => setDrawerVisible(false);

    return (
        <>
        <Badge count={position.pieces} offset={[-5, 30]} color="#b8b6b6" style={{ color: "black" }}>
            <Button 
                type="primary" 
                style={{ backgroundColor: color, borderColor: color, width: "100px"}} 
                    onClick={openDrawer}
            >
                {position.minPrice} €
            </Button>
        </Badge>
        <Drawer closable={false} placement="right" onClose={closeDrawer} open={drawerVisible}>
            <OfferForm product={product} position={position} closeDrawer={closeDrawer} />
        </Drawer>
        </>
    );
};

export default PositionItem;