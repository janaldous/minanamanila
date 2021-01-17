import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import {
  OrderConfirmation,
  OrderConfirmationOrderStatusEnum,
  OrderDto,
  OrderDtoDeliveryTypeEnum,
} from "api/minanamanila-api-client/api";
import { AxiosPromise, AxiosResponse } from "axios";
import { CartState } from "context/CartReducer";
import "date-fns";
import React from "react";
import PublicApi from "../../api/PublicApi";
import { getInitialCartState } from "./cartTestUtil";
import DeliveryInfo from "./DeliveryInfo";

describe("Delivery info - Order", () => {
  let orderResponsePromise: AxiosPromise<OrderConfirmation> = Promise.resolve({
    data: {
      orderNumber: 1234,
      orderStatus: OrderConfirmationOrderStatusEnum.REGISTERED,
      user: {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "0123456789",
      },
      deliveryDate: new Date(),
    },
  } as AxiosResponse);

  const cart: CartState = getInitialCartState();
  const onChangeMock = jest.fn();
  const onNextMock = jest.fn();

  beforeEach(() => {
    PublicApi.postOrder = jest.fn((orderDto: OrderDto) => orderResponsePromise);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const renderComponent = (component) => {
    const Wrapper: React.FC = ({ children }): React.ReactElement => (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    );
    return render(component, { wrapper: Wrapper });
  };

  it("smoke test", () => {
    renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );
  });

  it("shows no address fields when no delivery type is selected", () => {
    const { queryByLabelText } = renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );

    expect(queryByLabelText("Address Line 1")).not.toBeInTheDocument();
    expect(queryByLabelText("Address Line 2")).not.toBeInTheDocument();
    expect(queryByLabelText("City")).not.toBeInTheDocument();
    expect(queryByLabelText("Special Instructions")).not.toBeInTheDocument();
  });

  it("shows address fields when no delivery type Deliver is selected", () => {
    cart.deliveryForm.formValues = {
      ...cart.deliveryForm.formValues,
      deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
    };
    const { queryByLabelText } = renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );

    expect(queryByLabelText("Address Line 1")).toBeInTheDocument();
    expect(queryByLabelText("Address Line 2")).toBeInTheDocument();
    expect(queryByLabelText("City")).toBeInTheDocument();
    expect(queryByLabelText("Special Instructions")).toBeInTheDocument();
  });

  it("shows special instructions only when delivery type Meet up is selected", () => {
    cart.deliveryForm.formValues = {
      ...cart.deliveryForm.formValues,
      deliveryType: OrderDtoDeliveryTypeEnum.MEETUP,
    };

    const { queryByLabelText } = renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );
    expect(queryByLabelText("Address Line 1")).not.toBeInTheDocument();
    expect(queryByLabelText("Address Line 2")).not.toBeInTheDocument();
    expect(queryByLabelText("City")).not.toBeInTheDocument();
    expect(queryByLabelText("Special Instructions")).toBeInTheDocument();
  });

  it("shows validation error when given invalid contact number", async () => {
    cart.deliveryForm.formValues = {
      ...cart.deliveryForm.formValues,
      contactNumber: "01123456789",
    };
    cart.deliveryForm.formErrors = {
      ...cart.deliveryForm.formErrors,
      contactNumber: "Invalid contact number",
    };

    const { getAllByText } = renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );
    expect(getAllByText(/Invalid/i).length).toBe(1);
  });

  it("removes address info when changing between delivery types", async () => {
    cart.deliveryForm.formValues = {
      ...cart.deliveryForm.formValues,
      deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
    };
    renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );

    cart.deliveryForm.formValues = {
      ...cart.deliveryForm.formValues,
      deliveryType: OrderDtoDeliveryTypeEnum.MEETUP,
    };

    const { getByLabelText: getByLabelTextAfter } = renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );

    expect(
      (getByLabelTextAfter("Special Instructions") as HTMLInputElement).value
    ).toBe("");
  });

  it("does not let you continue when delivery form is not completed", async () => {
    cart.deliveryForm.formValues = {
      ...cart.deliveryForm.formValues,
      firstName: "John",
      lastName: "",
      contactNumber: "",
      addressLine1: "",
      addressLine2: "",
      deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
      paymentType: undefined,
    };
    cart.deliveryForm.formErrors = {
      ...cart.deliveryForm.formErrors,
      firstName: undefined,
      lastName: "Required",
      contactNumber: "Required",
      addressLine1: "Required",
      addressLine2: "Required",
      deliveryType: undefined,
      paymentType: undefined,
    };
    const { getByText, getAllByText } = renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );

    fireEvent.click(getByText("One more step"));

    expect(getAllByText("Required").length).toBe(4);
  });

  it("does not let you continue when delivery form city is not in Sta Rosa", async () => {
    cart.deliveryForm.formValues.city = "Other";
    cart.deliveryForm.formErrors.city = "Sorry";
    const { getAllByText } = renderComponent(
      <DeliveryInfo data={cart} onChange={onChangeMock} onNext={onNextMock} />
    );

    expect(getAllByText(/Sorry/).length).toBe(1);
  });
});
