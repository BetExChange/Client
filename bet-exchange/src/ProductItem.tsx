import { Card, Button, Divider, Badge, Drawer } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Product } from "./Types";
import OverviewForm from "./OverviewForm";
import OfferForm from "./OfferForm";
import { useState } from "react";

type ProductItemProps = {
  product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedForm, setSelectedForm] = useState<"overview" | "offer">("overview");

    const openDrawer = (form: "overview" | "offer") => {
        setSelectedForm(form);
        setDrawerVisible(true);
    };
    
    const closeDrawer = () => setDrawerVisible(false);

    return (
        <>
            <Card hoverable style={{ minWidth: 300, textAlign: "center", borderRadius: "10px", padding: "10px" }}>
                <h3 style={{ marginBottom: "10px" }}>{product.title}</h3>
                <Divider style={{ margin: "10px 0" }} />
                <img
                    alt={product.title}
                    src={product.imageUrl}
                    style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "10px" }}
                />
                <Divider style={{ margin: "10px 0" }} />
                
                {product.bestPricePosition || product.bestQuantityPosition ? (
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                        {product.bestPricePosition && (
                            <Badge count={product.bestPricePosition.pieces} offset={[-5, 30]} color="#b8b6b6" style={{ color: "black" }}>
                                <Button 
                                    type="primary" 
                                    style={{ backgroundColor: "teal", borderColor: "teal" }} 
                                    onClick={() => openDrawer("overview")}
                                >
                                    {product.bestPricePosition.minPrice} €
                                </Button>
                            </Badge>
                        )}
    
                        {product.bestQuantityPosition && (
                            <Badge count={product.bestQuantityPosition.pieces} offset={[-5, 30]} color="#b8b6b6" style={{ color: "black" }}>
                                <Button 
                                    type="primary" 
                                    style={{ backgroundColor: "teal", borderColor: "teal" }} 
                                    onClick={() => openDrawer("overview")}
                                >
                                    {product.bestQuantityPosition.minPrice} €
                                </Button>
                            </Badge>
                        )}
    
                        <Button type="text" shape="circle" icon={<MoreOutlined />} onClick={() => openDrawer("overview")} />
                    </div>
                ) : (
                    <Button 
                        type="primary" 
                        style={{ backgroundColor: "orange", borderColor: "orange", width: "100%" }} 
                        onClick={() => openDrawer("offer")}
                    >
                        Create an offer
                    </Button>
                )}
            </Card>

            <Drawer closable={false} placement="right" onClose={closeDrawer} open={drawerVisible}>
                {selectedForm === "overview" ? (
                    <OverviewForm product={product} closeDrawer={closeDrawer} />
                ) : (
                    <OfferForm product={product} closeDrawer={closeDrawer} />
                )}
            </Drawer>
        </>
    );
};

export default ProductItem;
