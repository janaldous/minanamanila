import { AxiosPromise } from "axios";
import {
  OrderConfirmation,
  OrderDto,
  PageProduct,
  Product,
  PublicControllerApiFactory,
} from "./minanamanila-api-client/api";

export default class OrderApi {
  static postOrder(orderDto: OrderDto): AxiosPromise<OrderConfirmation> {
    const publicApi = PublicControllerApiFactory();
    return publicApi.orderUsingPOST(orderDto);
  }

  static getProducts(page: number, size: number): AxiosPromise<PageProduct> {
    const publicApi = PublicControllerApiFactory();
    return publicApi.getProductsUsingGET(page, size);
  }

  static getProductSuggestions(id: number): AxiosPromise<PageProduct> {
    const publicApi = PublicControllerApiFactory();
    return publicApi.getProductSuggestionsUsingGET(id);
  }

  static getProductDetail(id: number): AxiosPromise<Product> {
    const publicApi = PublicControllerApiFactory();
    return publicApi.getProductUsingGET(id);
  }
}
