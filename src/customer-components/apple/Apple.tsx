import React from "react";
import { useLocation } from "react-router-dom";
import "./Apple.scss";
import QueryString from "query-string";
import { Product, ProductSimpleDto, PublicControllerApiFactory } from "api/minanamanila-api-client/api";
import { ProductGrid2 } from "customer-components/productgrid/ProductGrid2";
import { config } from "axiosConfig";

export const Apple: React.FC<{}> = () => {

  const location = useLocation();
  const { category } = QueryString.parse(location.search.substring(1));

  const [products, setProducts] = React.useState<Array<ProductSimpleDto>>([]);

  React.useEffect(() => {
    const getProducts = async () => {
      const publicApi = PublicControllerApiFactory(config);
      const result = await publicApi.getProductsUsingGET(2, 24);
      setProducts(result.data);
    };

    getProducts();
  }, []);

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
          <ProductGrid2 products={products}/>
        </div>
      </div>
    </div>
  );
};
