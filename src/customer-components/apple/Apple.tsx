import React from "react";
import { useLocation } from "react-router-dom";
import "./Apple.scss";
import QueryString from "query-string";
import { PageProduct } from "api/minanamanila-api-client/api";
import { ProductGrid2 } from "customer-components/productgrid/ProductGrid2";
import Pagination from "@material-ui/lab/Pagination";
import PublicApi from "api/PublicApi";

export const Apple: React.FC<{}> = () => {
  const location = useLocation();
  const { category } = QueryString.parse(location.search.substring(1));

  const [currentPage, setCurrentPage] = React.useState<number>();
  const [productPage, setProductPage] = React.useState<PageProduct>();

  React.useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async (page = 0) => {
    const result = await PublicApi.getProducts(page, 24);
    setProductPage(result.data);
    setCurrentPage(result.data.pageable?.pageNumber);
  };

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    getProducts(value - 1);
  };

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
        <div className="col-9 d-flex align-items-center flex-column">
          <ProductGrid2 products={productPage?.content || []} />
          <Pagination
            count={productPage?.totalPages}
            page={currentPage}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
