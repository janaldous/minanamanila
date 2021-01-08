import { Product } from "api/minanamanila-api-client/api";

const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (
  cartItems: Array<ProductWithQuantity>
): { itemCount: number; totalPrice: number } => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = cartItems.reduce(
    (total, product) => total + (product.unitPrice ?? 0) * product.quantity,
    0
  );
  return { itemCount, totalPrice: total };
};

export type ProductWithQuantity = Product & { quantity: number };

export interface CartState {
  items: Array<ProductWithQuantity>;
  isCheckout: boolean;
  itemCount: number;
  totalPrice: number;
  deliveryFee: number;
}

export const cartReducer = (state: CartState, action): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      let newCartItems = state.items;
      if (!newCartItems.find((item) => item.id === action.payload.id)) {
        newCartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        newCartItems = newCartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: ++item.quantity };
          }
          return item;
        });
      }

      return {
        ...state,
        items: [...newCartItems],
        ...sumItems(newCartItems),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.items.filter((item) => item.id !== action.payload.id)
        ),
        items: [...state.items.filter((item) => item.id !== action.payload.id)],
      };
    case "INCREASE_QUANTITY":
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        return state;
      }
      ++state.items[index].quantity;
      return {
        ...state,
        ...sumItems(state.items),
        items: [...state.items],
      };
    case "DECREASE":
      state.items[
        state.items.findIndex((item) => item.id === action.payload.id)
      ].quantity--;
      return {
        ...state,
        ...sumItems(state.items),
        items: [...state.items],
      };
    case "CHECKOUT":
      return {
        ...state,
        items: [],
        isCheckout: true,
        ...sumItems([]),
      };
    case "CLEAR":
      return {
        ...state,
        items: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
