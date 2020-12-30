import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "Routes";
import { formatCurrency } from "utils/CurrencyFormatterUtil";
import "./Item.scss";
import { idConverter, ProductPicture } from "./ProductPicture";

export interface ItemProps {
  id: number;
  price?: number;
  imageURL?: string;
  className: string;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const Item: React.FC<ItemProps> = (props) => {
  const normalizedId = idConverter(props.id);
  const price = props.price || getRandomInt(6) * 50 + 50;

  return (
    <div className={`product-item ${props.className}`}>
      <div className="pic-container position-relative">
        <Link to={`${Routes.Detail}?id=${normalizedId}`}>
          {props.imageURL ? (
            <img src={props.imageURL} className="w-100" />
          ) : (
            <ProductPicture
              id={normalizedId}
              className="pic position-absolute"
            />
          )}
          <div className="pic-overlay position-absolute"></div>
        </Link>
      </div>
      <div className="price font-weight-bold">{`${formatCurrency(price)}`}</div>
    </div>
  );
};
