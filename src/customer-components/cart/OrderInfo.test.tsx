import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { fireEvent, render } from "@testing-library/react";
import { CartState, ProductWithQuantity } from "context/CartReducer";
import "date-fns";
import React from "react";
import { mocked } from "ts-jest/utils";
import { getInitialCartState } from "./cartTestUtil";
import OrderInfo from "./OrderInfo";

describe("OrderInfo", () => {
  const renderComponent = (component) => {
    const Wrapper: React.FC = ({ children }): React.ReactElement => (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {children}
      </MuiPickersUtilsProvider>
    );
    return render(component, { wrapper: Wrapper });
  };

  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("call callback on quantity change", async () => {
    const product: ProductWithQuantity = {
      id: 11121,
      name: "Original Banana Bread",
      unitPrice: 165,
      description: "",
      quantity: 1,
      code: "",
      brand: "Breadforyouph",
      pictureUrl: "original-banana-bread.png",
    };

    const cart: CartState = {
      ...getInitialCartState(),
    };

    const mockOnDecreaseQuantity = jest.fn();
    const mockOnIncreaseQuantity = jest.fn();
    const mockOnNext = jest.fn();

    const { getByTestId } = renderComponent(
      <OrderInfo
        data={cart}
        items={[product]}
        onDecreaseQuantity={mockOnDecreaseQuantity}
        onIncreaseQuantity={mockOnIncreaseQuantity}
        total={165}
        onNext={mockOnNext}
      />
    );

    fireEvent.change(getByTestId("quantity"), { target: { value: "2" } });

    const mockedIncreaseQuanitityCallback = mocked(mockOnIncreaseQuantity);
    expect(mockedIncreaseQuanitityCallback.mock.calls.length).toBe(1);
    expect(mockedIncreaseQuanitityCallback.mock.calls[0][0]).toBe(11121);
  });
});
