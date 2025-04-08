import { Button, Divider, Form } from "antd";
import { Product } from "./Types";
import PositionList from "./PositionList";

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
      
      {/* Existing Positions */}
      <PositionList product={product} openDrawer={openDrawer} closeDrawer={closeDrawer}/>

      {/* Custom Offer Button */}
      <Button block style={{ backgroundColor: "orange", color: "white", marginBottom:'10px'}} onClick={() => openDrawer("offer")}>Place your offer</Button>

      {/* Cancel Button */}
      <Button block danger onClick={closeDrawer}>Cancel</Button>
    </Form>
  );
};

export default OverviewForm;
