import React from "react";
import "./Item.scss";

export interface ItemProps {
  price: number;
  className: string;
}

export const Item: React.FC<ItemProps> = (props) => {
  return (
    <div className={`product-item ${props.className}`}>
      <div className="pic"></div>
      <div className="price font-weight-bold">{`₱${props.price}`}</div>
    </div>
  );
};
