import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { CartContext, CartContextType } from "context/CartContext";
import { getInitialCartContext } from "customer-components/cart/cartTestUtil";
import "date-fns";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import CartPage from "./CartPage";

describe("CartPage", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const renderComponent = (
    component,
    initialCartContext: CartContextType = getInitialCartContext()
  ) => {
    const Wrapper: React.FC = ({ children }): React.ReactElement => (
      <MemoryRouter>
        <CartContext.Provider value={initialCartContext}>
          {children}
        </CartContext.Provider>
      </MemoryRouter>
    );
    return render(component, { wrapper: Wrapper });
  };

  it("smoke test", () => {
    renderComponent(<CartPage />);
  });

  test("empty cart", () => {
    const { getByText } = renderComponent(<CartPage />);

    expect(getByText(/Your cart is empty/i)).toBeInTheDocument();
  });
});
