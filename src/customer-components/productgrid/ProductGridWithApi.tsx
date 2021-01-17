import React, { useEffect, useState } from "react";
import { Product } from "api/minanamanila-api-client/api";
import { ProductGrid2 } from "./ProductGrid2";
import PublicApi from "api/PublicApi";

export interface ProductGridWithApiProps {
  id: number;
}

export const ProductGridWithApi: React.FC<ProductGridWithApiProps> = (
  props
) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    const getSuggestedProducts = async () => {
      const result = await PublicApi.getProductSuggestions(props.id);
      setProducts(result.data.content || []);
    };

    getSuggestedProducts();
  }, [props.id]);

  if (!products) {
    return <div>Loading...</div>;
  } else {
    return <ProductGrid2 products={products} />;
  }
};
