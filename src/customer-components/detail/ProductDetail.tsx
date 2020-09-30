import React from "react";
import "./ProductDetail.scss";
import Button from "react-bootstrap/Button";
import { formatCurrency } from "utils/CurrencyFormatterUtil";
import ReactMarkdown from "react-markdown";
import { ProductGrid } from "customer-components/productgrid/ProductGrid";
import { ProductPicture } from "customer-components/productgrid/ProductPicture";
import QueryString from "query-string";
import { useLocation } from "react-router-dom";

export interface ProductDetailProps {
  username: string;
  location: string;
  productDescription: string;
  price: number;
  size: string;
  title: string;
  condition: string;
  itemsSold: number;
  dateListed: string;
}

export const ProductDetailWithApi: React.FC<{}> = () => {
  return (
    <ProductDetail
      username="@janaldous"
      location="Manila, Philippines"
      title="Vintage Ed Hardy camo cargo shorts"
      productDescription="Size 30” waist. Inside leg 15”.<br>
      Full length 28”. Rise 14”.<br>
      <br>
      Free shipping for minimum spend of ₱1000.<br>
      <br>
      90s 00s Y2K Vintage Ed Hardy Vintage Camo Cargo Shorts Ed Hardy Shorts Ed Hardy Camouflage"
      price={200}
      size={"30in"}
      condition={"Used - Like New"}
      itemsSold={807}
      dateListed={"8h ago"}
    />
  );
};

export const ProductDetail: React.FC<ProductDetailProps> = (props) => {
  const handleContactSeller = () => {
    alert("will contact seller");
  };

  const location = useLocation();

  const { id } = QueryString.parse(location.search.substring(1));

  return (
    <div className="product-detail">
      <div className="row">
        <div className="col-6 d-flex justify-content-center">
          <ProductPicture id={Number(id)} className="w-100" />
        </div>
        <div className="col-6 product-info">
          <div className="seller-container">
            <div className="seller-profile">
              <div className="profile-pic"></div>
              <div className="seller-info">
                <div className="username">{props.username}</div>
                <div className="location">{props.location}</div>
              </div>
            </div>
            <div className="seller-actions mt-1 d-flex">
              <div className="items-sold">{props.itemsSold} Sold</div>
              <div className="items-sold">{props.dateListed}</div>
              <Button variant="secondary" onClick={handleContactSeller}>
                Contact Seller
              </Button>
            </div>
          </div>
          <div className="product-description-container mt-3">
            <div className="font-weight-bold description-title">
              {props.title}
            </div>
            <div className="description-price">
              {formatCurrency(props.price)}
            </div>
            <div className="mt-3">
              <ReactMarkdown
                source={props.productDescription}
                escapeHtml={false}
              />
            </div>
            <div className="mt-3">{props.size}</div>
            <div className="mt-3">{props.condition}</div>
          </div>
          <div className="options-container mt-3 d-flex">
            <Button
              variant="primary"
              onClick={handleContactSeller}
              className="contact-seller-btn"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column mt-3 mb-3 similar-items">
        <div className="h1">Similar items</div>
        <ProductGrid maxRows={2} />
      </div>
    </div>
  );
};
