import Navbar from "./NavBar";
import Search from "antd/es/input/Search";
import ProductList from "./ProductList";
import { useState } from "react";
import { Drawer } from "antd";
import OverviewForm from "./OverviewForm";

function BuyerPage (){
    const [drawerVisible, setDrawerVisible] = useState(false);

    const openDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    const handleSearch = (value: string) => {
        
      };

    return (
        <div className="buyerPage">
            <Navbar />
            <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
                <Search
                    placeholder="Search for products..."
                    enterButton="Search"
                    size="large"
                    onSearch={handleSearch}
                    style={{ width: 900}}
                />
            </div>
            <ProductList openDrawer={openDrawer} />
            <Drawer closable={false} placement="right" onClose={closeDrawer} visible={drawerVisible}>
                <OverviewForm/>
            </Drawer>
        </div>
    )
}

export default BuyerPage;