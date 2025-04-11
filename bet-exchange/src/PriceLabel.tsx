import { Badge, Button } from "antd";

type PriceLabelProps = {
    pieces: number;
    price: number;
    onClick: () => void;
    color: string;
    
}

const PriceLabel: React.FC<PriceLabelProps> = ({pieces, price, onClick, color}) => {
    return (
        <Badge count={pieces} offset={[-5, 30]} color="#b8b6b6" style={{ color: "black" }}>
            <Button 
                type="primary" 
                style={{ backgroundColor: color, borderColor: color, width: "100px"}} 
                onClick={onClick}
            >
                {price} €
            </Button>
        </Badge>
    );
}

export default PriceLabel;