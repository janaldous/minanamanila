import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, RenderResult, wait } from "@testing-library/react";
import {
  OrderConfirmationOrderStatusEnum,
  OrderDto,
  OrderDtoDeliveryTypeEnum,
  OrderDtoPaymentTypeEnum,
} from "api/minanamanila-api-client/api";
import { CartContext, CartContextType } from "context/CartContext";
import {
  CustomerContext,
  CustomerContextStuff,
} from "customer-components/CustomerContext";
import "date-fns";
import { format } from "date-fns";
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { mocked } from "ts-jest/utils";
import PublicApi from "../../api/PublicApi";
import { getInitialCartContext } from "./cartTestUtil";
import Order from "./Order";
import { DeliveryData } from "./OrderModel";

const defaultValues: Required<DeliveryData> = {
  firstName: "John",
  lastName: "Doe",
  contactNumber: "09123456789",
  addressLine1: "street name",
  addressLine2: "village name",
  city: "Sta. Rosa",
  deliveryType: OrderDtoDeliveryTypeEnum.MEETUP,
  paymentType: OrderDtoPaymentTypeEnum.CASH,
  deliveryDate: new Date("2020-07-01T12:00:00Z"),
  specialInstructions: "Please leave the parcel at the guardhouse",
};

const fillInDeliveryFormDefault = (result: RenderResult) => {
  fillInDeliveryForm(defaultValues, result);
};

const changeRadioButton = (
  radioButtons: Array<HTMLInputElement>,
  value: string
) => {
  const rbSelect = radioButtons.filter(
    (x: HTMLInputElement) => x.value === value
  )[0];
  ReactTestUtils.Simulate.change(rbSelect);
};

const renderWithRouter = (
  component,
  initialCartContext: CartContextType = getInitialCartContext(),
  initialContext: CustomerContextStuff = {
    sideBarOpen: false,
    toggleSidebar: () => console.log,
  }
) => {
  const Wrapper = ({ children }): React.ReactElement => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MemoryRouter>
        <CartContext.Provider value={initialCartContext}>
          <CustomerContext.Provider value={initialContext}>
            {children}
          </CustomerContext.Provider>
        </CartContext.Provider>
      </MemoryRouter>
    </MuiPickersUtilsProvider>
  );
  return render(component, { wrapper: Wrapper as React.FunctionComponent });
};

const fillInDeliveryForm = (
  values: Partial<DeliveryData>,
  result: RenderResult
) => {
  const { container, getByPlaceholderText, getByLabelText } = result;
  fireEvent.change(getByPlaceholderText("First name"), {
    target: { value: values.firstName },
  });
  fireEvent.change(getByPlaceholderText("Last name"), {
    target: { value: values.lastName },
  });
  fireEvent.change(getByLabelText("contactNumber"), {
    target: { value: values.contactNumber },
  });

  if (values.deliveryType) {
    const rbDeliveries = Array.from(
      container.querySelectorAll("input[name=deliveryOption]")
    );
    changeRadioButton(
      rbDeliveries as Array<HTMLInputElement>,
      values.deliveryType
    );
  }

  const addressLine1Elem = container.querySelector(
    "input[name=address-line1]"
  ) as HTMLInputElement;
  if (addressLine1Elem) {
    addressLine1Elem.value = values.addressLine1 || "";
    ReactTestUtils.Simulate.change(addressLine1Elem);
  }

  const addressLine2Elem = container.querySelector(
    "input[name=address-line2]"
  ) as HTMLInputElement;
  if (addressLine2Elem) {
    addressLine2Elem.value = values.addressLine2 || "";
    ReactTestUtils.Simulate.change(addressLine2Elem);
  }

  if (values.paymentType) {
    const rbPayment = Array.from(
      container.querySelectorAll("input[name=paymentOption]")
    );
    changeRadioButton(rbPayment, values.paymentType);
  }

  if (values.deliveryDate) {
    fireEvent.change(getByLabelText("Delivery date"), {
      target: { value: values.deliveryDate },
    });
  }

  fireEvent.change(getByLabelText("Special Instructions"), {
    target: { value: values.specialInstructions },
  });
};

describe("Order component", () => {
  let orderResponsePromise = Promise.resolve({
    data: {
      orderNumber: 1234,
      orderStatus: OrderConfirmationOrderStatusEnum.REGISTERED,
      user: {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "0123456789",
      },
    },
  });

  beforeEach(() => {
    PublicApi.postOrder = jest.fn().mockResolvedValue(orderResponsePromise);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows order page on load", async () => {
    const { getByText } = renderWithRouter(<Order />);
    expect(getByText("Your order")).toBeInTheDocument();
  });

  it("shows delivery info page as 2nd page and goes back to 1st page", async () => {
    const { getByText } = renderWithRouter(<Order />);

    fireEvent.click(getByText("Two more steps"));

    expect(getByText("Delivery information")).toBeInTheDocument();

    fireEvent.click(getByText("< Back"));

    expect(getByText("Your order")).toBeInTheDocument();
  });

  it("shows order confirmation as 4th page", async () => {
    const initialCartContext: CartContextType = {
      ...getInitialCartContext(),
    };
    initialCartContext.cart.orderConfirmation = {
      orderNumber: 1234,
    };
    initialCartContext.cart.deliveryForm = {
      ...initialCartContext.cart.deliveryForm,
      formValues: {
        ...defaultValues,
        specialInstructions: "My special instructions",
        deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
      },
      isSubmitting: true,
    };

    const renderResult = renderWithRouter(<Order />, initialCartContext);
    const { getByText, container } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    const values = {
      ...defaultValues,
      specialInstructions: "My special instructions",
    };
    fillInDeliveryForm(values, renderResult);
    fireEvent.click(getByText("One more step"));

    expect(PublicApi.postOrder).toBeCalledTimes(0);

    fireEvent.click(getByText("Place order"));
    expect(container.querySelector(".order-spinner")).toBeInTheDocument();

    const expectedOrder: OrderDto = {
      address: {
        line1: defaultValues.addressLine1,
        village: defaultValues.addressLine2,
        city: defaultValues.city,
        province: "Laguna",
        postcode: "4026",
        specialInstructions: values.specialInstructions,
      },
      deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
      paymentType: OrderDtoPaymentTypeEnum.CASH,
      deliveryDate: format(
        defaultValues.deliveryDate,
        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
      ),
      products: [],
      user: {
        firstName: defaultValues.firstName,
        lastName: defaultValues.lastName,
        contactNumber: defaultValues.contactNumber,
        auth0Id: undefined,
      },
    };
    const mockedApiOrder = mocked(PublicApi.postOrder, true);
    await wait(() => {
      expect(mockedApiOrder.mock.calls.length).toBe(1);
    });
    expect(mockedApiOrder.mock.calls[0][0]).toStrictEqual(expectedOrder);

    expect(getByText("Thank You!")).toBeInTheDocument();
    expect(getByText(/Order Number: 1234/)).toBeInTheDocument();
  });

  it("shows total and subtotal in order info and order summary", async () => {
    const initialCartContext: CartContextType = {
      ...getInitialCartContext(),
    };
    initialCartContext.cart.subtotalPrice = 495;
    initialCartContext.cart.totalPrice = 495;
    initialCartContext.cart.deliveryForm = {
      ...initialCartContext.cart.deliveryForm,
      formValues: {
        ...initialCartContext.cart.deliveryForm.formValues,
        ...defaultValues,
        specialInstructions: "Please leave the parcel at the guardhouse",
      },
      isSubmitting: true,
    };
    const renderResult = renderWithRouter(<Order />, initialCartContext);
    const { getByTestId, getByText } = renderResult;

    expect(getByTestId("subtotal").textContent).toBe("495");
    expect(getByTestId("total").textContent).toBe("495");
    expect(getByTestId("delivery-fee").textContent).toBe("0");

    fireEvent.click(getByText("Two more steps"));
    fillInDeliveryFormDefault(renderResult);
    fireEvent.click(getByText("One more step"));

    expect(getByTestId("subtotal").textContent).toBe("495");
    expect(getByTestId("delivery-fee").textContent).toBe("0");
    expect(getByTestId("total").textContent).toBe("495");
  });

  it("changes name and address when they are filled in", async () => {
    const initialCartContext: CartContextType = {
      ...getInitialCartContext(),
    };
    initialCartContext.cart.deliveryForm = {
      ...initialCartContext.cart.deliveryForm,
      formValues: {
        ...initialCartContext.cart.deliveryForm.formValues,
        ...defaultValues,
        specialInstructions: "Please leave the parcel at the guardhouse",
      },
      isSubmitting: true,
    };
    const renderResult = renderWithRouter(<Order />, initialCartContext);
    const { getByTestId, getByText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    fireEvent.click(getByText("One more step"));

    expect(getByTestId("customer-name").textContent).toBe("John Doe");
    expect(getByTestId("contact-number").textContent).toBe("09123456789");
    expect(getByTestId("addressLine1").textContent).toBe("street name");
    expect(getByTestId("addressLine2").textContent).toBe("village name");
    expect(getByTestId("deliveryDate").textContent).toBe("Wed, July 1, 2020");
    expect(getByTestId("delivery-type").textContent).toBe(
      "We will meet up at:"
    );
    expect(getByTestId("payment-type").textContent).toContain(
      "Cash on Delivery"
    );
    expect(getByTestId("specialInstructions").textContent).toContain(
      "Please leave the parcel at the guardhouse"
    );
  });

  it("still keeps values in delivery form even when going back to delivery form", async () => {
    const initialCartContext: CartContextType = {
      ...getInitialCartContext(),
    };
    initialCartContext.cart.deliveryForm = {
      ...initialCartContext.cart.deliveryForm,
      formValues: {
        ...initialCartContext.cart.deliveryForm.formValues,
        ...defaultValues,
      },
    };
    const renderResult = renderWithRouter(<Order />, initialCartContext);
    const { getByText, getByLabelText, getByPlaceholderText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    fillInDeliveryFormDefault(renderResult);
    fireEvent.change(getByLabelText("Special Instructions"), {
      target: { value: "Please leave the parcel at the guardhouse" },
    });

    expect((getByPlaceholderText("First name") as HTMLInputElement).value).toBe(
      "John"
    );
    expect((getByPlaceholderText("Last name") as HTMLInputElement).value).toBe(
      "Doe"
    );
    expect((getByLabelText("contactNumber") as HTMLInputElement).value).toBe(
      "09123456789"
    );
    expect(
      (getByLabelText("Special Instructions") as HTMLInputElement).value
    ).toBe("Please leave the parcel at the guardhouse");
  });

  it("lets you continue when delivery form is completed - meet up", async () => {
    const initialCartContext: CartContextType = {
      ...getInitialCartContext(),
    };
    initialCartContext.cart.deliveryForm = {
      ...initialCartContext.cart.deliveryForm,
      formValues: {
        ...initialCartContext.cart.deliveryForm.formValues,
        ...defaultValues,
      },
      isSubmitting: true,
    };
    const renderResult = renderWithRouter(<Order />, initialCartContext);
    const { getByText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    expect(getByText("Delivery information")).toBeInTheDocument();

    fireEvent.click(getByText("One more step"));

    expect(getByText("Order")).toBeInTheDocument();
  });

  it("shows error page when has error in post order api call", async () => {
    const initialCartContext: CartContextType = {
      ...getInitialCartContext(),
    };
    initialCartContext.cart.deliveryForm = {
      ...initialCartContext.cart.deliveryForm,
      formValues: {
        ...initialCartContext.cart.deliveryForm.formValues,
        ...defaultValues,
      },
      isSubmitting: true,
    };
    PublicApi.postOrder = jest.fn().mockRejectedValue({});

    const renderResult = renderWithRouter(<Order />, initialCartContext);
    const { getByText, container } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    const values = {
      ...defaultValues,
      specialInstructions: "My special instructions",
    };
    fillInDeliveryForm(values, renderResult);
    fireEvent.click(getByText("One more step"));

    fireEvent.click(getByText("Place order"));
    const mockedApiOrder = mocked(PublicApi.postOrder, true);
    await wait(() => {
      expect(mockedApiOrder.mock.calls.length).toBe(1);
    });

    expect(getByText(/error/i)).toBeInTheDocument();
  });
});
