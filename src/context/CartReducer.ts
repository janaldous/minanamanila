import { Product } from "api/minanamanila-api-client/api";

const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (
  cartItems: Array<ProductWithQuantity>
): { itemCount: number; total: number } => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems.reduce(
    (total, product) => total + (product.unitPrice ?? 0) * product.quantity,
    0
  );
  return { itemCount, total };
};

type ProductWithQuantity = Product & { quantity: number };

export interface CartState {
  cartItems: Array<ProductWithQuantity>;
  checkout: boolean;
}

export const CartReducer = (state: CartState, action): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      let newCartItems = state.cartItems;
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        newCartItems = state.cartItems.map((x) => {
          if (x.id === action.payload.id) {
            return { ...x, quantity: x.quantity++ };
          }
          return x;
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };
    case "INCREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity--;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };
    case "CLEAR":
      return {
        ...state,
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
