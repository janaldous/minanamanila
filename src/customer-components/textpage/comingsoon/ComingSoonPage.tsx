import React from "react";
import { TextPage, TextPageProps } from "../TextPage";
import {
  Product,
  PublicControllerApiFactory,
} from "../../../api/minanamanila-api-client/api";
import { config } from "axiosConfig";

export const ComingSoonPage: React.FC<TextPageProps> = (props) => {
  const [products, setProducts] = React.useState<Array<Product>>();

  React.useEffect(() => {
    const getProducts = async () => {
      const publicApi = PublicControllerApiFactory(config);
      const result = await publicApi.getProductsUsingGET(0, 10);
      setProducts(result.data.content);
    };

    getProducts();
  }, []);

  return (
    <TextPage {...props}>
      <div>
        {products?.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </TextPage>
  );
};
