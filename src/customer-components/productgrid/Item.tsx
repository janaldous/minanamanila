import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "Routes";
import "./Item.scss";
import { ProductPicture } from "./ProductPicture";

export interface ItemProps {
  id: number;
  className: string;
}

export const Item: React.FC<ItemProps> = (props) => {
  return (
    <div className={`product-item ${props.className}`}>
      <Link to={Routes.Detail}>
        <div className="pic-container position-relative">
          <ProductPicture id={props.id} className="pic position-absolute" />
          <div className="pic-overlay position-absolute"></div>
        </div>
      </Link>
      <div className="price font-weight-bold">{`₱${props.id * 100}`}</div>
    </div>
  );
};
