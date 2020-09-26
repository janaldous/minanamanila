import React from "react";
import { render } from "@testing-library/react";
import OrderDetail from "./OrderDetail";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import OrderApi from "../api/OrderApi";
import {
  OrderDetail as OrderDetailModel,
  OrderTrackingStatusEnum,
  OrderDetailPaymentTypeEnum,
  OrderDetailDeliveryTypeEnum,
} from "../api/models";
import { act } from "react-dom/test-utils";

const mockResponse: OrderDetailModel = {
  id: 89,
  user: {
    id: 86,
    firstName: "jane",
    lastName: "doe",
    email: undefined,
    contactNumber: "01234567",
    role: undefined,
  },
  total: 165.0,
  shipping: {
    id: 87,
    addressLineOne: "Main Street",
    addressLineTwo: "SRV1",
    city: "Sta Rosa",
    province: "Laguna",
    country: "Philippines",
    postalCode: "4026",
    shipping: false,
    billing: false,
  },
  billing: undefined,
  deliveryType: OrderDetailDeliveryTypeEnum.DELIVER,
  paymentType: OrderDetailPaymentTypeEnum.CASH,
  orderItems: [
    {
      id: 90,
      product: {
        id: 1,
        code: "OBB",
        name: "Original Banana Bread",
        description: "only product for now",
        unitPrice: 165.0,
      },
      buyingPrice: 165.0,
      productCount: 1,
      total: 165.0,
    },
  ],
  orderDate: new Date(),
  tracking: {
    id: 88,
    status: OrderTrackingStatusEnum.OTW,
    dateLastUpdated: new Date(),
  },
};

describe("OrderDetail", () => {
  it("smoke test", async () => {
    const history = createMemoryHistory();
    history.push("/admin/order/123");

    const mockPromise = Promise.resolve({data: mockResponse});
    OrderApi.getOrder = jest.fn().mockReturnValue(mockPromise);

    render(
      <Router history={history}>
        <OrderDetail />
      </Router>
    );

    await act(async () => {
      await mockPromise;
    });
  });
});
