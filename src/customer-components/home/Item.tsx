import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "Routes";
import "./Item.scss";

export interface ItemProps {
  price: number;
  className: string;
}

export const Item: React.FC<ItemProps> = (props) => {
  return (
    <div className={`product-item ${props.className}`}>
      <Link to={Routes.Detail}>
        <div className="pic"></div>
      </Link>
      <div className="price font-weight-bold">{`₱${props.price}`}</div>
    </div>
  );
};
