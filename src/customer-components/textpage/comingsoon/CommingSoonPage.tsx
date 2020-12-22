import React from "react";
import { TextPage, TextPageProps } from "../TextPage";
import {
  Product,
  PublicControllerApiFactory,
} from "../../../api/minanamanila-api-client/api";

export const CommingSoonPage: React.FC<TextPageProps> = (props) => {
  const [products, setProducts] = React.useState<Array<Product>>();

  React.useEffect(() => {
    const getProducts = async () => {
      const config = {
        basePath: "http://localhost:8080",
      };

      const publicApi = PublicControllerApiFactory(config);
      const result = await publicApi.getProductsUsingGET(0, 10);
      console.log(result.data);
      setProducts(result.data);
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
