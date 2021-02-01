import {
  OrderDtoDeliveryTypeEnum,
  OrderDtoPaymentTypeEnum,
  Product,
} from "api/minanamanila-api-client/api";
import { customerReducer } from "./CustomerReducer";

const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (
  cartItems: Array<ProductWithQuantity>,
  deliveryFee: number
): { itemCount: number; subtotalPrice: number; totalPrice: number } => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let subtotal = cartItems.reduce(
    (total, product) => total + (product.unitPrice ?? 0) * product.quantity,
    0
  );
  return {
    itemCount,
    subtotalPrice: subtotal,
    totalPrice: subtotal ? subtotal + deliveryFee : 0,
  };
};

export type ProductWithQuantity = Product & { quantity: number };

export interface CartState {
  items: Array<ProductWithQuantity>;
  isCheckout: boolean;
  itemCount: number;
  deliveryFee: number;
  subtotalPrice: number;
  totalPrice: number;
  deliveryForm: DeliveryFormType;
  orderConfirmation?: {
    orderNumber?: number;
  };
}

export interface DeliveryFormType {
  formValues: DeliveryData;
  formErrors: Partial<DeliveryData>;
  formTouched: DeliveryDataTouched;
  isSubmitting: boolean;
}

export interface DeliveryData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  specialInstructions?: string;
  deliveryType?: OrderDtoDeliveryTypeEnum;
  paymentType?: OrderDtoPaymentTypeEnum;
  deliveryDate?: Date;
  auth0Id?: string;
}

export interface DeliveryDataTouched {
  firstName: boolean;
  lastName: boolean;
  contactNumber: boolean;
  addressLine1: boolean;
  addressLine2: boolean;
  deliveryType: boolean;
  paymentType: boolean;
  city: boolean;
  specialInstructions: boolean;
  deliveryDate: boolean;
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
        ...sumItems(newCartItems, state.deliveryFee),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.items.filter((item) => item.id !== action.payload.id),
          state.deliveryFee
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
        ...sumItems(state.items, state.deliveryFee),
        items: [...state.items],
      };
    case "DECREASE":
      state.items[
        state.items.findIndex((item) => item.id === action.payload.id)
      ].quantity--;
      return {
        ...state,
        ...sumItems(state.items, state.deliveryFee),
        items: [...state.items],
      };
    case "CHECKOUT":
      return {
        ...state,
        isCheckout: true,
      };
    case "CLEAR":
      return {
        ...state,
        items: [],
        ...sumItems([], state.deliveryFee),
      };
    default:
      return customerReducer(state, action);
  }
};
