import { Button, Divider, Form } from "antd";
import useProducts from "./useProducts";

const OverviewForm: React.FC = () => {
    const {products} = useProducts();

    return (
        <Form layout="vertical" style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center",height: "95vh"}}>
          <h2>Availability and Offers</h2>
    
          <Divider style={{ margin: "10px 0" }} />
          
          {/* image */}
          
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
          <Button block style={{ backgroundColor: "orange", color: "white" }}>Place your offer</Button>
    
          {/* Cancel Button */}
          <Button block style={{ backgroundColor: "blue", color: "white" }}>Cancel</Button>
        </Form>
    );
};

export default OverviewForm;
