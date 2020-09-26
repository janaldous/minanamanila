import React from "react";
import "./Order.scss";

const OrderError: React.FC<{}> = (props) => {

  return (
    <section id="order">
      <div className="row align-items-center flex-column">
          <div className="bold-title">An error occured</div>
          <div>Please try ordering again.</div>
      </div>
    </section>
  );
};

export default OrderError;
