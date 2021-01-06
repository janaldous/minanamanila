import { Item } from "./Item";
import React from "react";
import { Product } from "api/minanamanila-api-client/api";
import { config } from "axiosConfig";

export interface ProductGridProps2 {
  products: Array<Product>;
}

export const ProductGrid2: React.FC<ProductGridProps2> = (props) => {
  const noOfCols = 6;
  var arrayOfArrays: Array<Array<Product>> = [];
  for (var i = 0; i < props.products.length; i += noOfCols) {
    arrayOfArrays.push(props.products.slice(i, i + noOfCols));
  }

  return (
    <div className="product-grid">
      {arrayOfArrays.map((row) => (
        <div className="row mt-3" key={row[0].id}>
          {row.map((column) => (
            <Item
              key={column.id}
              className="col"
              id={Number(column.id)}
              price={column.unitPrice}
              imageURL={column.pictureUrl ? `${config.basePath}/static/` + column.pictureUrl : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
