import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { OrderDto } from "api/minanamanila-api-client/api";
import { CartContext } from "context/CartContext";
import { CartState } from "context/CartReducer";
import { format } from "date-fns";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import { isBrowser } from "react-device-detect";
import { Link } from "react-router-dom";
import PublicApi from "../../api/PublicApi";
import DeliveryInfo from "./DeliveryInfo";
import OrderConfirmation from "./OrderConfirmation";
import OrderError from "./OrderError";
import OrderInfo from "./OrderInfo";
import OrderSummary from "./OrderSummary";

const inputNameMapper = {
  "given-name": "firstName",
  "family-name": "lastName",
  phone: "contactNumber",
  "address-line1": "addressLine1",
  "address-line2": "addressLine2",
  deliveryOption: "deliveryType",
  paymentOption: "paymentType",
  city: "city",
  "special-instructions": "specialInstructions",
  "delivery-date": "deliveryDateId",
};

export default function Order() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    handleChange,
    confirmOrder,
    clearCart,
  } = React.useContext(CartContext);

  const [step, setStep] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleNext = () => {
    setStep((oldStep) => oldStep + 1);
  };

  const handlePrev = () => {
    setStep((oldStep) => oldStep - 1);
  };

  /**
   * Map between UI input name tag to context object name
   * @param name
   */
  const handleMappedChange = (name: string, value: any) => {
    name = inputNameMapper[name] || name;

    handleChange(name, value);
  };

  const handleSubmitOrder = async () => {
    const orderDto = getOrderDto(cart);
    setLoading(true);
    const result = await PublicApi.postOrder(orderDto)
      .then((res) => {
        const { data } = res;
        confirmOrder(data.orderNumber);
        setLoading(false);
        clearCart();
        return Promise.resolve(true);
      })
      .catch((err) => {
        setStep(400);
        setLoading(false);
        return Promise.reject(false);
      });

    return result;
  };

  const getBackButton = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="btn-back">
            <Link to={"/products"}>
              {isBrowser ? "< Back to Products" : <ArrowBackIosIcon />}
            </Link>
          </div>
        );
      case 1:
      case 2:
        return (
          <div className="btn-back" onClick={handlePrev}>
            {isBrowser ? "< Back" : <ArrowBackIosIcon />}
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const getContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <OrderInfo
            onNext={handleNext}
            data={cart}
            items={cart.items}
            total={cart.totalPrice}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
          />
        );
      case 1:
        return (
          <DeliveryInfo
            onNext={handleNext}
            data={cart}
            onChange={handleMappedChange}
          />
        );
      case 2:
        return (
          <OrderSummary
            onNext={handleNext}
            items={cart.items}
            total={cart.totalPrice}
            data={cart}
            onSubmit={handleSubmitOrder}
          />
        );
      case 3:
        return <OrderConfirmation data={cart} />;
      case 400:
        return <OrderError />;
      default:
        throw new Error("invalid step: " + step);
    }
  };

  const getSpinner = () => {
    return (
      <section id="order">
        <div className="order-spinner">
          <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only">Processing order...</span>
          </Spinner>
        </div>
      </section>
    );
  };

  return (
    <div className="order-container">
      <Navbar className="custom-navbar">
        <div className="flex-1-only">{getBackButton(step)}</div>
        <Navbar.Brand className="nav-brand" href="/"></Navbar.Brand>
        <div className="flex-1-only"></div>
      </Navbar>
      <div className="content">{loading ? getSpinner() : getContent(step)}</div>
    </div>
  );
}

const getOrderDto = (cart: CartState) => {
  const deliveryInfo = cart.deliveryForm.formValues;

  if (
    !deliveryInfo.deliveryType ||
    !deliveryInfo.paymentType ||
    !deliveryInfo.deliveryDate
  ) {
    throw new Error("required deliveryType, paymentType and deliveryDateId");
  }

  const orderDto: OrderDto = {
    address: {
      line1: deliveryInfo.addressLine1,
      village: deliveryInfo.addressLine2,
      city: deliveryInfo.city,
      province: "Laguna",
      postcode: "4026",
      specialInstructions: deliveryInfo.specialInstructions,
    },
    deliveryType: deliveryInfo.deliveryType,
    paymentType: deliveryInfo.paymentType,
    products: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
    deliveryDate: format(
      deliveryInfo.deliveryDate,
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    ),
    user: {
      firstName: deliveryInfo.firstName,
      lastName: deliveryInfo.lastName,
      contactNumber: deliveryInfo.contactNumber,
    },
  };

  return orderDto;
};
