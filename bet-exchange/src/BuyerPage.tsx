import Navbar from "./NavBar";
import Search from "antd/es/input/Search";
import ProductList from "./ProductList";

function BuyerPage (){
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
            <ProductList />
        </div>
    )
}

export default BuyerPage;