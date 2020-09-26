import axios, { AxiosPromise } from "axios";
import {
  GetOrdersUsingGETStatusEnum,
  OrderUpdateDtoStatusEnum,
  OrderDetail,
} from "./models";
import { BASE_PATH } from "./runtime";

export default class OrderApi {
  static getOrders(
    token: string,
    status?: GetOrdersUsingGETStatusEnum
  ): AxiosPromise<Array<OrderDetail>> {
    return axios.get(`${BASE_PATH}/admin/order/`, {
      params: { status },
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
