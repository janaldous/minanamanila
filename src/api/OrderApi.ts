import axios, { AxiosPromise } from "axios";
import {
  OrderControllerApiFactory,
  OrderDetail,
  OrderUpdateDtoStatusEnum,
} from "./minanamanila-api-client/api";
import { GetOrdersUsingGETStatusEnum } from "./models";
import { BASE_PATH } from "./runtime";

export default class OrderApi {
  static getOrders(
    accessToken: string,
    status?: GetOrdersUsingGETStatusEnum
  ): AxiosPromise<Array<OrderDetail>> {
    const publicApi = OrderControllerApiFactory();
    return publicApi.getOrdersUsingGET(status, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  static getOrder(id: string): AxiosPromise<OrderDetail> {
    return axios.get(`${BASE_PATH}/admin/order/${id}`, {
      withCredentials: true,
    });
  }

  static updateStatus(
    id: string,
    status: OrderUpdateDtoStatusEnum
  ): AxiosPromise<OrderDetail> {
    return axios.put(
      `${BASE_PATH}/admin/order/${id}`,
      { status },
      { withCredentials: true }
    );
  }
}
