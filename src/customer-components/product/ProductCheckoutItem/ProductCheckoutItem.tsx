import React from "react";
import { formatCurrency } from "utils/CurrencyFormatterUtil";
import { QuantityStep } from "./QuantityStep";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProductWithQuantity } from "context/CartReducer";

interface ProductCheckoutItemProps {
  product: ProductWithQuantity;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const ProductCheckoutItem: React.FC<ProductCheckoutItemProps> = (
  props
) => {
  return (
    <div>
      <Row>
        <Col xs={9}>{props.product.name}</Col>
        <Col xs={3}>{formatCurrency(props.product.unitPrice)}</Col>
      </Row>
      <Row>
        <Col xs={9}>
          <QuantityStep
            onDecrease={props.onDecrease}
            onIncrease={props.onIncrease}
            value={props.product.quantity}
          />
        </Col>
        <Col xs={3}></Col>
      </Row>
    </div>
  );
};
