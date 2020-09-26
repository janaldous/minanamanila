import React from "react";
import { OrderComponentProps } from "./OrderModel";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import "./OrderConfirmation.scss";

const OrderConfirmation: React.FC<OrderComponentProps> = (props) => {
  return (
    <div className="app-container order-confirmation-container">
      <section id="order">
        <div className="row justify-content-center">
          <div className="circle">
            <ThumbUpIcon fontSize="large" htmlColor="white" />
          </div>
        </div>
        <div className="row align-items-center flex-column">
          <div className="bold-title title">Thank You!</div>
          <div className="description">
            {`We have received your order. When your order is delivered we 
            will contact you with your contact number.`}
          </div>
          <div className="description">
            {`Order Number: ${props.data?.orderConfirmation?.orderNumber}.`}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderConfirmation;
