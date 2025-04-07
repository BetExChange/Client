import { Button, Divider, Form } from "antd";
import { Product } from "./Types";

type OverwiewFormProps = {
  product: Product;
  closeDrawer: () => void;
  openDrawer: (form: "overview" | "offer") => void;
};

const OverviewForm: React.FC<OverwiewFormProps> = ({product, closeDrawer, openDrawer}) => {

    return (
        <Form layout="vertical" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center",height: "95vh"}}>
          <h2>Availability and Offers</h2>
    
          <Divider style={{ margin: "10px 0" }} />
          
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{ width: "100%", maxWidth: "300px", height: "auto", borderRadius: "10px", marginBottom: "10px" }}
          /> 
          <h3>{product.title}</h3>
          
          <p>Choose an existing offer or create your own.</p>
          
          {/* Price Buttons */}
          <Button block style={{ backgroundColor: "teal", color: "white", width: 150}}>18€ x6</Button>
          <Button block style={{ backgroundColor: "teal", color: "white", width: 150}}>16€ x5</Button>
          <Button block style={{ backgroundColor: "teal", color: "white", width: 150}}>15€ x2</Button>
          
          <Divider style={{ margin: "10px 0" }} />
          
          <Button block style={{ backgroundColor: "orange", color: "white", width: 150 }}>12€ x11</Button>
          <Button block style={{ backgroundColor: "orange", color: "white", width: 150 }}>12€ x6</Button>
          <Button block style={{ backgroundColor: "orange", color: "white", width: 150 }}>9€ x24</Button>
    
          {/* Custom Offer Button */}
          <Button block style={{ backgroundColor: "orange", color: "white" }} onClick={() => openDrawer("offer")}>Place your offer</Button>
    
          {/* Cancel Button */}
          <Button block danger onClick={closeDrawer}>Cancel</Button>
        </Form>
    );
};

export default OverviewForm;
