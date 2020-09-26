import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";
import { ProductRequired } from "./ProductPage";
import { formatCurrency } from "utils/CurrencyFormatterUtil";

interface ProductCardProps {
  product: ProductRequired;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  return (
    <Card style={{ width: "15rem" }} className="product-card" key={props.product.id}>
      <Card.Img variant="top" src="https://via.placeholder.com/100px100" />
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>{props.product.unitPrice && formatCurrency(props.product.unitPrice)}</Card.Text>
        <div className="d-flex">
          <Button
            variant="primary"
            onClick={props.onAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
