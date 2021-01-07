import React, { useEffect, useState } from "react";
import {
  Product,
  PublicControllerApiFactory,
} from "api/minanamanila-api-client/api";
import { ProductGrid2 } from "./ProductGrid2";

export interface ProductGridWithApiProps {
  id: number;
}

export const ProductGridWithApi: React.FC<ProductGridWithApiProps> = (
  props
) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    const getSuggestedProducts = async () => {
      const publicApi = PublicControllerApiFactory();
      const result = await publicApi.getProductSuggestionsUsingGET(props.id);
      setProducts(result.data.content || []);
    };

    getSuggestedProducts();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  } else {
    return <ProductGrid2 products={products} />;
  }
};
