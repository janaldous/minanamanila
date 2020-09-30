import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "Routes";
import "./Item.scss";
import { idConverter, ProductPicture } from "./ProductPicture";

export interface ItemProps {
  id: number;
  className: string;
}

export const Item: React.FC<ItemProps> = (props) => {
  const normalizedId = idConverter(props.id);
  return (
    <div className={`product-item ${props.className}`}>
      <div className="pic-container position-relative">
        <Link to={`${Routes.Detail}?id=${normalizedId}`}>
          <ProductPicture id={normalizedId} className="pic position-absolute" />
          <div className="pic-overlay position-absolute"></div>
        </Link>
      </div>
      <div className="price font-weight-bold">{`₱${normalizedId * 100}`}</div>
    </div>
  );
};
