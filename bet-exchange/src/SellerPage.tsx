import { Typography } from "antd";
import Navbar from "./NavBar";
import SellerTable from "./SellerTable";


const { Title } = Typography;

const SellerPage: React.FC = () => {
    return (
        <div className="sellerPage">
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "100px" }}>
                <Title level={1}>Product Management</Title>
            </div>
            <SellerTable userId={2} />
        </div>
    )
}

export default SellerPage;