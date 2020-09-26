import React from "react";
import "./Order.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OrderComponentProps } from "./OrderModel";
import { ProductRequiredDto } from "customer-components/product/ProductPage";
import { QuantityOperation } from "../CustomerContext";

const OrderInfo: React.FC<
  OrderComponentProps & {
    items: Array<ProductRequiredDto>;
    total: number;
    onQuantityChange: (
      productId: ProductRequiredDto,
      operation: QuantityOperation,
      quantity: number
    ) => void;
  }
> = (props) => {
  const MAX_ORDERS = 6;

  const handleQuantityChange = (e, item) => {
    const { target } = e;
    props.onQuantityChange(item, "set", Number(target.value));
  };

  return (
    <section id="order">
      <div className="row justify-content-center">
        <div className="description">
          <div className="bold-title">Your order</div>
          <Form className="order-form">
            {props.items.map((item) => (
              <Form.Group as={Row} controlId="formOrders" key={item.id}>
                <Col xs={3}>
                  <Form.Control
                    as="select"
                    data-testid={"quantity"}
                    onChange={(e) => handleQuantityChange(e, item)}
                    name="quantity"
                    value={item.quantity}
                  >
                    {Array.from({ length: MAX_ORDERS }, (v, k) => k + 1).map(
                      (x) => (
                        <option key={`quantity-${x}`}>{x}</option>
                      )
                    )}
                  </Form.Control>
                </Col>
                <Form.Label column xs={6}>
                  {item.name}
                </Form.Label>
                <Col xs={3}>
                  ₱<span data-testid="price">{item.unitPrice}</span>
                </Col>
              </Form.Group>
            ))}
            <div className="line-separator"></div>
            <div className="subtotal">
              <Row>
                <Col xs={9}>Subtotal</Col>
                <Col xs={3}>
                  ₱<span data-testid="subtotal">{props.total}</span>
                </Col>
              </Row>
              <Row>
                <Col xs={9}>Delivery fee</Col>
                <Col xs={3}>
                  ₱
                  <span data-testid="delivery-fee">
                    {props.data.deliveryFee}
                  </span>
                </Col>
              </Row>
            </div>
            <div className="line-separator"></div>
            <div className="total">
              <Row>
                <Col xs={9}>
                  <b>Total</b>
                </Col>
                <Col xs={3}>
                  <b>
                    ₱<span data-testid="total">{props.total}</span>
                  </b>
                </Col>
              </Row>
            </div>
            <Button
              variant="primary"
              className="btn-next w-100"
              onClick={props.onNext}
            >
              Two more steps
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default OrderInfo;
