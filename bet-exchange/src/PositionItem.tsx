import { Position, Product } from "./Types";
import OpenDrawer from "./OpenDrawer";
import OpenModal from "./OpenModal";

type PositionItemProps = {
    position: Position;
    product: Product;
    color: string;
    type: "Drawer" | "Modal";
};

const PositionItem: React.FC<PositionItemProps> = ({ position, product, color, type }) => {
    return type === "Drawer" ? (
        <OpenDrawer initialPrice={position.minPrice} initialQuantity={position.pieces} product={product} color={color} />
    ) : (
        <OpenModal product={product} color={color} quantity={position.pieces} price={position.minPrice}/>
    );
};

export default PositionItem;
