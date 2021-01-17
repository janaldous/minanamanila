import { Item } from "./Item";
import React from "react";

export interface ProductGridProps {
  maxWidth?: number;
  maxRows?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = (props) => {
  const noOfRows = props.maxRows || 4;
  const noOfCols = props.maxWidth || 6;
  const rowArray = Array.from(Array(noOfRows).keys());
  const colArray = Array.from({ length: noOfCols }, (_, i) => i + 1);
  // console.log(rowArray, colArray);

  return (
    <div className="product-grid w-100">
      {rowArray.map((y) => (
        <div className="row mt-3" key={y}>
          {colArray.map((x) => (
            <Item key={x} className="col" id={y * 6 + x} />
          ))}
        </div>
      ))}
    </div>
  );
};
