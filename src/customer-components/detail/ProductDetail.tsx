import React from "react";
import { MyNavbar } from "customer-components/navbar/Navbar";
import "./ProductDetail.scss";
import Button from "react-bootstrap/Button";
import { formatCurrency } from "utils/CurrencyFormatterUtil";

export interface ProductDetailProps {
  username: string;
  location: string;
  productDescription: string;
  price: number;
  size: string;
  title: string;
}

export const ProductDetailWithApi: React.FC<{}> = () => {
  return (
    <ProductDetail
      username="@janaldous"
      location="Manila, Philippines"
      title="Vintage Ed Hardy camo cargo shorts"
      productDescription="Size 30” waist. Inside leg 15”.
      Full length 28”. Rise 14”.
      
      Free standard UK shipping.
      
      90s 00s Y2K Vintage Ed Hardy Vintage Camo Cargo Shorts Ed Hardy Shorts Ed Hardy Camouflage"
      price={200}
      size={"30in"}
    />
  );
};

export const ProductDetail: React.FC<ProductDetailProps> = (props) => {
  const handleContactSeller = () => {
    alert("will contact seller");
  };

  return (
    <div className="product-detail">
      <MyNavbar />
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div className="product-pic"></div>
        </div>
        <div className="col product-info">
          <div className="seller-container">
            <div className="profile-pic"></div>
            <div className="seller-info">
              <div className="username">{props.username}</div>
              <div className="location">{props.location}</div>
            </div>
          </div>
          <div className="product-description-container mt-3">
            <div className="font-weight-bold description-title">{props.title}</div>
            <div className="description-price">{formatCurrency(props.price)}</div>
            <div className="mt-3">{props.productDescription}</div>
            <div className="mt-3">{props.size}</div>
          </div>
          <div className="contact-seller-container">
            <Button variant="primary" onClick={handleContactSeller}>
              Contact Seller
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
