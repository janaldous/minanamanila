import React from "react";
import "./Order.scss";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OrderComponentProps } from "./OrderModel";
import {
  OrderDtoDeliveryTypeEnum,
  OrderDtoPaymentTypeEnum,
} from "../../api/models";
import dateformat from "dateformat";
import { ProductRequiredDto } from "customer-components/product/ProductPage";

const deliveryTypeMapper = (input: any) => {
  switch (input) {
    case OrderDtoDeliveryTypeEnum.MEETUP:
      return "We will meet up at:";
    case OrderDtoDeliveryTypeEnum.DELIVER:
      return "We will deliver to:";
    default:
      throw new Error();
  }
};

const paymentTypeMapper = (input: any) => {
  switch (input) {
    case OrderDtoPaymentTypeEnum.CASH:
      return "Cash on Delivery";
    case OrderDtoPaymentTypeEnum.GCASH:
      return "Paying with GCash";
    default:
      throw new Error();
  }
};

const OrderSummary: React.FC<
  OrderComponentProps & { items: Array<ProductRequiredDto>; total: number }
> = (props) => {
  const { availableDeliveryDates, deliveryForm } = props.data;
  const { formValues } = deliveryForm;

  const selectedDeliveryDate = availableDeliveryDates.filter(
    (x) => x.id === formValues.deliveryDateId
  )[0]?.date;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (props.onNext && props.onSubmit) {
      props
        .onSubmit()
        .then(() => {
          props.onNext && props.onNext();
        })
        .catch((err) => {
          /*do nothing*/
        });
    }
  };

  return (
    <section id="order">
      <div className="row justify-content-center">
        <div className="description payment-information">
          <div className="bold-title">Delivery information</div>
          <div
            className="customer-name"
            data-testid="customer-name"
          >{`${formValues.firstName} ${formValues.lastName}`}</div>
          <div data-testid="contact-number">{formValues.contactNumber}</div>
          <div data-testid="delivery-type">
            {deliveryTypeMapper(formValues.deliveryType)}
          </div>
          <div data-testid="addressLine1">{formValues.addressLine1}</div>
          <div data-testid="addressLine2">{formValues.addressLine2}</div>
          <div data-testid="specialInstructions">
            {formValues.specialInstructions}
          </div>
          <div data-testid="deliveryDate">
            {dateformat(selectedDeliveryDate, "ddd, mmmm d, yyyy")}
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="description payment-information">
          <div className="bold-title">Payment</div>
          <div data-testid="payment-type">
            {paymentTypeMapper(formValues.paymentType)}
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="description">
          <div className="bold-title">Order</div>
          <div className="products">
            {props.items.map((item) => (
              <Row key={item.id}>
                <Col xs={9}>
                  {item.quantity} {item.name}
                </Col>
                <Col xs={3}>
                  ₱<span data-testid="price">{item.unitPrice}</span>
                </Col>
              </Row>
            ))}
          </div>
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
                <span data-testid="delivery-fee">{props.data.deliveryFee}</span>
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
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="description">
          <Button
            variant="primary"
            className="btn-next w-100"
            onClick={handleSubmit}
          >
            Place order
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
