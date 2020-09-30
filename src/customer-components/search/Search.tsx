import { ProductGrid } from "customer-components/productgrid/ProductGrid";
import React from "react";
import { useLocation } from "react-router-dom";
import "./Search.scss";
import QueryString from "query-string";

export const SearchResults: React.FC<{}> = () => {

  const location = useLocation();
  const { category } = QueryString.parse(location.search.substring(1));

  return (
    <div className="category-container p-3">
      <div className="h1">{category}</div>
      <div className="row">
        <div className="col-3 filter">
          <div>Sort by</div>
          <div>Location</div>
          <div>Size</div>
          <div>Price</div>
        </div>
        <div className="col-9">
          <ProductGrid maxWidth={4} maxRows={3}/>
        </div>
      </div>
    </div>
  );
};
