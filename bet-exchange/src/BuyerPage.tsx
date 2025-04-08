import Navbar from "./NavBar";
import Search from "antd/es/input/Search";
import ProductList from "./ProductList";
import useSearch from "./useSearch";

function BuyerPage (){
    const { filteredProducts, searchProducts } = useSearch();

    return (
        <div className="buyerPage">
            <Navbar />
            <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
                <Search
                    placeholder="Search for products..."
                    enterButton="Search"
                    size="large"
                    onSearch={searchProducts}
                    style={{ width: 900}}
                />
            </div>
            <ProductList products={filteredProducts}/>
        </div>
    )
}

export default BuyerPage;