import React, { useEffect, useState } from "react";
import {
  ProductSimpleDto,
  PublicControllerApiFactory,
} from "api/minanamanila-api-client/api";
import { config } from "axiosConfig";
import { ProductGrid2 } from "./ProductGrid2";

export interface ProductGridWithApiProps {
  id: number;
}

export const ProductGridWithApi: React.FC<ProductGridWithApiProps> = (
  props
) => {
  const [products, setProducts] = useState<Array<ProductSimpleDto>>([]);

  useEffect(() => {
    const getSuggestedProducts = async () => {
      const publicApi = PublicControllerApiFactory(config);
      const result = await publicApi.getProductSuggestionsUsingGET(props.id);
      setProducts(result.data);
    };

    getSuggestedProducts();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  } else {
    return <ProductGrid2 products={products} />;
  }
};
