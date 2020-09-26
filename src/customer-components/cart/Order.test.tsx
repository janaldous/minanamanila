import React from "react";
import { render, fireEvent, RenderResult, wait } from "@testing-library/react";
import Order from "./Order";
import "@testing-library/jest-dom/extend-expect";
import ReactTestUtils from "react-dom/test-utils";
import { DeliveryData } from "./OrderModel";
import {
  OrderDtoDeliveryTypeEnum,
  OrderDtoPaymentTypeEnum,
  OrderConfirmationOrderStatusEnum,
  OrderDto,
} from "../../api/models";
import PublicApi from "../../api/PublicApi";
import { mocked } from "ts-jest/utils";
import { MemoryRouter } from "react-router-dom";
import {
  CustomerContext,
  CustomerContextStuff,
} from "customer-components/CustomerContext";

const defaultValues: DeliveryData = {
  firstName: "John",
  lastName: "Doe",
  contactNumber: "09123456789",
  addressLine1: "street name",
  addressLine2: "village name",
  city: "Sta. Rosa",
  deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
  paymentType: OrderDtoPaymentTypeEnum.CASH,
  deliveryDateId: 1,
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
  intialContext: CustomerContextStuff = {
    cart: { items: [], numberOfItems: 0, total: 0 },
    onAddToCart: () => console.log,
    onCartChange: () => console.log,
  }
) => {
  const Wrapper = ({ children }): React.ReactElement => (
    <MemoryRouter>
      <CustomerContext.Provider value={intialContext}>
        {children}
      </CustomerContext.Provider>
    </MemoryRouter>
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

  if (values.deliveryDateId) {
    fireEvent.change(getByLabelText("Preferred delivery date"), {
      target: { value: values.deliveryDateId },
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

  const deliveryDatesPromise = Promise.resolve({
    data: [
      { id: 1, date: new Date("2020-07-01"), orderLimit: 6 },
      { id: 2, date: new Date("2020-07-02"), orderLimit: 6 },
      { id: 3, date: new Date("2020-07-03"), orderLimit: 6 },
      { id: 4, date: new Date("2020-07-04"), orderLimit: 6 },
      { id: 5, date: new Date("2020-07-05"), orderLimit: 6 },
    ],
  });

  const onAddToCartMock = jest.fn();
  const onCartChangeMock = jest.fn();

  beforeEach(() => {
    PublicApi.postOrder = jest
      .fn()
      .mockImplementation(() => orderResponsePromise);
    PublicApi.getDeliveryDates = jest
      .fn()
      .mockImplementation(() => deliveryDatesPromise);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows order page on load", async () => {
    const { getByText } = renderWithRouter(<Order />);
    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    expect(getByText("Your order")).toBeInTheDocument();
  });

  it("shows delivery info page as 2nd page and goes back to 1st page", async () => {
    const { getByText } = renderWithRouter(<Order />);

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    fireEvent.click(getByText("Two more steps"));

    expect(getByText("Delivery information")).toBeInTheDocument();

    fireEvent.click(getByText("< Back"));

    expect(getByText("Your order")).toBeInTheDocument();
  });

  it("shows place order page as 3rd page", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText } = renderResult;

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    fireEvent.click(getByText("Two more steps"));

    fillInDeliveryFormDefault(renderResult);

    fireEvent.click(getByText("One more step"));

    expect(getByText("Order")).toBeInTheDocument();

    fireEvent.click(getByText("< Back"));

    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    expect(getByText("Delivery information")).toBeInTheDocument();
  });

  it("shows order confirmation as 4th page", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText, container } = renderResult;

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

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
      deliveryDateId: 1,
      products: [],
      user: {
        firstName: defaultValues.firstName,
        lastName: defaultValues.lastName,
        contactNumber: defaultValues.contactNumber,
      },
    };
    const mockedApiOrder = mocked(PublicApi.postOrder, true);
    await wait(() => {
      expect(mockedApiOrder.mock.calls.length).toBe(1);
    });
    expect(mockedApiOrder.mock.calls[0][0]).toStrictEqual(expectedOrder);

    expect(getByText("Thank You!")).toBeInTheDocument();
    expect(getByText(/Order Number: 1234/)).toBeInTheDocument();
    // TODO expect < Back not found
  });

  it("changes total and subtotal when quantity is changed to 2", async () => {
    const product = {
      id: 1,
      name: "Original Banana Bread",
      unitPrice: 165,
      description: "",
      quantity: 1,
      code: "",
    };
    const intitialContext: CustomerContextStuff = {
      cart: {
        items: [product],
        total: 0,
        numberOfItems: 1,
      },
      onAddToCart: onAddToCartMock,
      onCartChange: onCartChangeMock,
    };
    const { getByTestId } = renderWithRouter(<Order />, intitialContext);
    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    fireEvent.change(getByTestId("quantity"), { target: { value: "2" } });
    expect(onCartChangeMock).toBeCalledWith(product, "set", 2);
  });

  it("shows total and subtotal in order info and order summary", async () => {
    const product = {
      id: 1,
      name: "Original Banana Bread",
      unitPrice: 165,
      description: "",
      quantity: 3,
      code: "",
    };
    const intitialContext: CustomerContextStuff = {
      cart: {
        items: [product],
        total: 495,
        numberOfItems: 1,
      },
      onAddToCart: onAddToCartMock,
      onCartChange: onCartChangeMock,
    };
    const renderResult = renderWithRouter(<Order />, intitialContext);
    const { getByTestId, getByText } = renderResult;
    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

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
    const renderResult = renderWithRouter(<Order />);
    const { getByTestId, getByText, getByLabelText } = renderResult;

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    fireEvent.click(getByText("Two more steps"));

    // default is first item in dropdown
    expect(
      (getByLabelText("Preferred delivery date") as HTMLInputElement).value
    ).toBe("1");

    fillInDeliveryFormDefault(renderResult);
    fireEvent.change(getByLabelText("Special Instructions"), {
      target: { value: "Please leave the parcel at the guardhouse" },
    });

    fireEvent.click(getByText("One more step"));

    expect(getByTestId("customer-name").textContent).toBe("John Doe");
    expect(getByTestId("contact-number").textContent).toBe("09123456789");
    expect(getByTestId("addressLine1").textContent).toBe("street name");
    expect(getByTestId("addressLine2").textContent).toBe("village name");
    expect(getByTestId("deliveryDate").textContent).toBe("Wed, July 1, 2020");
    expect(getByTestId("delivery-type").textContent).toBe(
      "We will deliver to:"
    );
    expect(getByTestId("payment-type").textContent).toContain(
      "Cash on Delivery"
    );
    expect(getByTestId("specialInstructions").textContent).toContain(
      "Please leave the parcel at the guardhouse"
    );
  });

  it("still keeps values in delivery form even when going back to delivery form", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText, getByLabelText, getByPlaceholderText } = renderResult;

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    fireEvent.click(getByText("Two more steps"));

    fillInDeliveryFormDefault(renderResult);
    fireEvent.change(getByLabelText("Special Instructions"), {
      target: { value: "Please leave the parcel at the guardhouse" },
    });

    fireEvent.click(getByText("One more step"));
    fireEvent.click(getByText("< Back"));
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
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
    expect((getByLabelText("Address Line 1") as HTMLInputElement).value).toBe(
      "street name"
    );
    expect((getByLabelText("Address Line 2") as HTMLInputElement).value).toBe(
      "village name"
    );
    expect((getByLabelText("City") as HTMLInputElement).value).toBe(
      "Sta. Rosa"
    );
    expect(
      (getByLabelText("Special Instructions") as HTMLInputElement).value
    ).toBe("Please leave the parcel at the guardhouse");
  });

  it("does not let you continue when delivery form is not completed", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText, getAllByText } = renderResult;

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    fireEvent.click(getByText("Two more steps"));

    fillInDeliveryForm(
      {
        firstName: "John",
        lastName: "",
        contactNumber: "",
        addressLine1: "",
        addressLine2: "",
        deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
        paymentType: undefined,
      },
      renderResult
    );

    fireEvent.click(getByText("One more step"));

    expect(getAllByText("Required").length).toBe(4);
  });

  it("does not let you continue when delivery form is not completed - meet up", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText, getAllByText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    fillInDeliveryForm(
      {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "09123456789",
        addressLine1: "",
        addressLine2: "",
        city: "",
        specialInstructions: "",
        deliveryType: OrderDtoDeliveryTypeEnum.MEETUP,
        paymentType: OrderDtoPaymentTypeEnum.CASH,
      },
      renderResult
    );

    fireEvent.click(getByText("One more step"));

    expect(getAllByText("Required").length).toBe(1);
  });

  it("does not let you continue when delivery form city is not in Sta Rosa", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText, getByLabelText, getAllByText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    expect(getByText("Delivery information")).toBeInTheDocument();

    fillInDeliveryFormDefault(renderResult);
    fireEvent.change(getByLabelText("City"), {
      target: { value: "Other" },
    });

    fireEvent.click(getByText("One more step"));

    expect(getAllByText(/Sorry/).length).toBe(1);
  });

  it("lets you continue when delivery form is completed - meet up", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    expect(getByText("Delivery information")).toBeInTheDocument();

    const mockValues: DeliveryData = {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "09123456789",
      addressLine1: "",
      addressLine2: "",
      city: "",
      deliveryType: OrderDtoDeliveryTypeEnum.MEETUP,
      paymentType: OrderDtoPaymentTypeEnum.CASH,
      specialInstructions: "Let's meet in Nuvali",
    };
    fillInDeliveryForm(mockValues, renderResult);

    fireEvent.click(getByText("One more step"));

    expect(getByText("Order")).toBeInTheDocument();
  });

  it("removes address info when changing between delivery types", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText, container, getByLabelText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    expect(getByText("Delivery information")).toBeInTheDocument();

    const mockValues: DeliveryData = {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "09123456789",
      addressLine1: "street",
      addressLine2: "village",
      city: "Sta. Rosa",
      deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
      paymentType: OrderDtoPaymentTypeEnum.CASH,
      specialInstructions: "Let's meet in Nuvali",
    };
    fillInDeliveryForm(mockValues, renderResult);

    changeRadioButton(
      Array.from(container.querySelectorAll("input[name=deliveryOption]")),
      OrderDtoDeliveryTypeEnum.MEETUP
    );

    expect(
      (getByLabelText("Special Instructions") as HTMLInputElement).value
    ).toBe("");

    fireEvent.change(getByLabelText("Special Instructions"), {
      target: { value: "My special instructions" },
    });

    changeRadioButton(
      Array.from(container.querySelectorAll("input[name=deliveryOption]")),
      OrderDtoDeliveryTypeEnum.DELIVER
    );

    expect(
      (getByLabelText("Special Instructions") as HTMLInputElement).value
    ).toBe("");
  });

  it("shows validation error when given invalid contact number", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText, getAllByText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    expect(getByText("Delivery information")).toBeInTheDocument();

    const mockValues: DeliveryData = {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "0123456789",
      addressLine1: "street",
      addressLine2: "village",
      city: "Sta. Rosa",
      deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
      paymentType: OrderDtoPaymentTypeEnum.CASH,
      specialInstructions: "Let's meet in Nuvali",
    };
    fillInDeliveryForm(mockValues, renderResult);

    fireEvent.click(getByText("One more step"));

    expect(getAllByText(/Invalid/i).length).toBe(1);
  });

  it("changes delivery date if other date is selected", async () => {
    const renderResult = renderWithRouter(<Order />);
    const { getByText, getByLabelText } = renderResult;

    fireEvent.click(getByText("Two more steps"));

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    expect(getByText("Delivery information")).toBeInTheDocument();

    const mockValues: DeliveryData = {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "0123456789",
      addressLine1: "street",
      addressLine2: "village",
      city: "Sta. Rosa",
      deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
      paymentType: OrderDtoPaymentTypeEnum.CASH,
      specialInstructions: "Let's meet in Nuvali",
      deliveryDateId: 2,
    };
    fillInDeliveryForm(mockValues, renderResult);

    expect(
      (getByLabelText("Preferred delivery date") as HTMLInputElement).value
    ).toBe("2");
  });

  it("shows error page when has error in get delivery date api call", async () => {
    PublicApi.getDeliveryDates = jest.fn().mockRejectedValue({});

    const renderResult = renderWithRouter(<Order />);
    const { getByText, container } = renderResult;

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

    expect(getByText(/error/i)).toBeInTheDocument();
  });

  it("shows error page when has error in post order api call", async () => {
    PublicApi.postOrder = jest.fn().mockRejectedValue({});

    const renderResult = renderWithRouter(<Order />);
    const { getByText, container } = renderResult;

    const mockedApiDelivery = mocked(PublicApi.getDeliveryDates, true);
    await wait(() => {
      expect(mockedApiDelivery.mock.calls.length).toBe(1);
    });

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
