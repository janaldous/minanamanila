import {
  cartReducer,
  CartState,
  ProductWithQuantity,
  sumItems,
} from "./CartReducer";

describe("Cart reducer", () => {
  test("sumItems - empty list", () => {
    const cartItems: Array<ProductWithQuantity> = [];
    const result = sumItems(cartItems, 100);
    expect(result.itemCount).toBe(0);
    expect(result.subtotalPrice).toBe(0);
    expect(result.totalPrice).toBe(0);
  });

  test("sumItems", () => {
    const cartItems: Array<ProductWithQuantity> = [
      {
        brand: "Apple",
        description: "MacBook Pro",
        id: 5,
        name: "MacBook Pro",
        pictureUrl: "macbook-pro.png",
        unitPrice: 45000,
        quantity: 1,
      },
    ];
    const result = sumItems(cartItems, 100);
    expect(result.itemCount).toBe(1);
    expect(result.subtotalPrice).toBe(45000);
    expect(result.totalPrice).toBe(45100);
  });

  test("add first item", () => {
    const state: CartState = {
      deliveryFee: 100,
      isCheckout: false,
      itemCount: 0,
      items: [],
      subtotalPrice: 0,
      totalPrice: 0,
    };
    const action = {
      type: "ADD_ITEM",
      payload: {
        brand: "Apple",
        description: "MacBook Pro",
        id: 5,
        name: "MacBook Pro",
        pictureUrl: "macbook-pro.png",
        unitPrice: 45000,
      },
    };

    const result = cartReducer(state, action);
    expect(result.itemCount).toBe(1);
    expect(result.subtotalPrice).toBe(action.payload.unitPrice);
  });

  test("add second item", () => {
    const state: CartState = {
      deliveryFee: 100,
      isCheckout: false,
      itemCount: 1,
      items: [
        {
          brand: "Apple",
          description: "MacBook Pro",
          id: 5,
          name: "MacBook Pro",
          pictureUrl: "macbook-pro.png",
          unitPrice: 45000,
          quantity: 1,
        },
      ],
      subtotalPrice: 45000,
      totalPrice: 45100,
    };
    const action = {
      type: "ADD_ITEM",
      payload: {
        brand: "Apple",
        description: "MacBook Pro",
        id: 5,
        name: "MacBook Pro",
        pictureUrl: "macbook-pro.png",
        unitPrice: 45000,
      },
    };

    const result = cartReducer(state, action);
    expect(result.itemCount).toBe(2);
    expect(result.subtotalPrice).toBe(90000);
  });

  test("increase quantity of existing item", () => {
    const state: CartState = {
      deliveryFee: 100,
      isCheckout: false,
      itemCount: 1,
      items: [
        {
          brand: "Apple",
          description: "MacBook Pro",
          id: 5,
          name: "MacBook Pro",
          pictureUrl: "macbook-pro.png",
          unitPrice: 45000,
          quantity: 1,
        },
      ],
      subtotalPrice: 45000,
      totalPrice: 45100,
    };
    const action = {
      type: "INCREASE_QUANTITY",
      payload: { id: 5 },
    };

    const result = cartReducer(state, action);
    expect(result.itemCount).toBe(2);
    expect(result.subtotalPrice).toBe(90000);
  });

  test("checkout", () => {
    const state: CartState = {
      deliveryFee: 100,
      isCheckout: false,
      itemCount: 1,
      items: [
        {
          brand: "Apple",
          description: "MacBook Pro",
          id: 5,
          name: "MacBook Pro",
          pictureUrl: "macbook-pro.png",
          unitPrice: 45000,
          quantity: 1,
        },
      ],
      subtotalPrice: 45000,
      totalPrice: 45100,
    };
    const action = {
      type: "CHECKOUT",
    };
    const result = cartReducer(state, action);
    expect(result.isCheckout).toBeTruthy();
    expect(result.itemCount).toBe(state.itemCount);
    expect(result.totalPrice).toBe(state.totalPrice);
  });
});
