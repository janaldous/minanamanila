import { useAuth0 } from "@auth0/auth0-react";
import Pagination from "@material-ui/lab/Pagination";
import { PageProduct } from "api/minanamanila-api-client/api";
import PublicApi from "api/PublicApi";
import { ProductGrid2 } from "customer-components/productgrid/ProductGrid2";
import QueryString from "query-string";
import React from "react";
import { useLocation } from "react-router-dom";
import "./Apple.scss";
export const Apple: React.FC<{}> = () => {
  const location = useLocation();

  const { getAccessTokenSilently } = useAuth0();
  const { category } = QueryString.parse(location.search.substring(1));

  const [currentPage, setCurrentPage] = React.useState<number>();
  const [productPage, setProductPage] = React.useState<PageProduct>();

  const getProducts = async (page = 0) => {
    // const accessToken = await getAccessTokenSilently();
    const result = await PublicApi.getProducts(page, 24);
    setProductPage(result.data);
    setCurrentPage(result.data.pageable?.pageNumber);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

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
