import { Button, Col, Divider, Form, Row } from "antd";
import { Product } from "./Types";
import PositionList from "./PositionList";
import OfferList from "./OfferList";

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
      
      <Row>
        <Col>
          {/* Existing Positions */}
          <PositionList product={product} type="Drawer"/>

          {/* Existing Offers */}
          <OfferList product={product} onClick={() => openDrawer("offer")} type="Drawer"/>
        </Col>
      </Row>

      <Row style={{width: "100%"}}>
        {/* Custom Offer Button */}
        <Button block style={{ backgroundColor: "orange", color: "white", marginBottom:'10px', borderColor: "orange"}} onClick={() => openDrawer("offer")}>Place your offer</Button>

        {/* Cancel Button */}
        <Button block danger onClick={closeDrawer}>Cancel</Button>
      </Row>
    </Form>
  );
};

export default OverviewForm;
