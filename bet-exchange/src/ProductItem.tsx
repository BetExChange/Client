import { Card, Button, Divider, Badge, Drawer } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Product } from "./Types";
import OverviewForm from "./OverviewForm";
import { useState } from "react";

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const openDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    return (
        <>
            <Card hoverable style={{ minWidth: 300, textAlign: "center", borderRadius: "10px", padding: "10px" }}>
            {/* Product Name */}
            <h3 style={{ marginBottom: "10px" }}>{product.title}</h3>
    
            <Divider style={{ margin: "10px 0" }} />
    
            {/* Product Image */}
            <img
                alt={product.title}
                src={product.imageUrl}
                style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "10px" }}
            />
    
            <Divider style={{ margin: "10px 0" }} />
    
          
            {product.bestPricePosition || product.bestQuantityPosition ? (
                <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                    {/* Best Price Position */}
                    {product.bestPricePosition && (
                        <Badge
                            count={product.bestPricePosition.pieces}
                            offset={[-5, 30]}
                            color="#b8b6b6"
                            style={{ color: "black" }}
                        >
                            <Button type="primary" style={{ backgroundColor: "teal", borderColor: "green" }} onClick={openDrawer}>
                            {   product.bestPricePosition.minPrice} €
                            </Button>
                        </Badge>
                    )}
  
                    {/* Best Quantity Position */}
                    {product.bestQuantityPosition && (
                    <Badge
                        count={product.bestQuantityPosition.pieces}
                        offset={[-5, 30]}
                        color="#b8b6b6"
                        style={{ color: "black" }}
                    >
                        <Button type="primary" style={{ backgroundColor: "teal", borderColor: "green" }} onClick={openDrawer}>
                            {product.bestQuantityPosition.minPrice} €
                        </Button>
                    </Badge>
                    )}
  
                    {/* More Options Button */}
                    <Button type="text" shape="circle" icon={<MoreOutlined />} onClick={openDrawer}/>
                </div>
            ) : (
                <Button type="primary" style={{ backgroundColor: "blue", borderColor: "blue", width: "100%" }} onClick={openDrawer}>
                    Create an offer
                </Button>
            )}
        </Card>
        <Drawer closable={false} placement="right" onClose={closeDrawer} visible={drawerVisible}>
            <OverviewForm product={product}/>
        </Drawer>
        </>
      );
};

export default ProductItem;
