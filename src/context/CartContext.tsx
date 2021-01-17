import {
  OrderDtoPaymentTypeEnum,
  Product,
  OrderDtoDeliveryTypeEnum,
} from "api/minanamanila-api-client/api";
import React, { useReducer } from "react";
import { cartReducer, CartState, sumItems } from "./CartReducer";

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "")
  : [];

const initialState: CartState = {
  items: storage,
  ...sumItems(storage, 100),
  isCheckout: false,
  deliveryFee: 100,
  deliveryForm: {
    formErrors: {},
    formValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      addressLine1: "",
      addressLine2: "",
      deliveryType: OrderDtoDeliveryTypeEnum.DELIVER,
      paymentType: OrderDtoPaymentTypeEnum.CASH,
      city: "",
      specialInstructions: "",
    },
    formTouched: {
      firstName: false,
      lastName: false,
      contactNumber: false,
      addressLine1: false,
      addressLine2: false,
      deliveryType: false,
      paymentType: false,
      city: false,
      specialInstructions: false,
      deliveryDate: false,
    },
    isSubmitting: false,
  },
};

export const CartContext = React.createContext<CartContextType>(
  {} as CartContextType
);

export interface CartContextType {
  removeProduct: (id: number) => void;
  addProduct: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  handleCheckout: () => void;
  handleChange: <T extends {}>(name: string, value: T) => void;
  confirmOrder: (confirmationId: number) => void;
  cart: CartState;
}

const CartContextProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const increaseQuantity = (id: number) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  };

  const addProduct = (payload: Product) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = (payload: number) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleCheckout = () => {
    dispatch({ type: "CHECKOUT" });
  };

  const handleChange = <T extends {}>(name: string, value: T) => {
    dispatch({ type: "CHANGE_VALUE", payload: { name, value } });
  };

  const confirmOrder = (confirmationNumber: number) => {
    dispatch({
      type: "CONFIRM_ORDER",
      payload: { confirmationNumber },
    });
  };

  const contextValues: CartContextType = {
    removeProduct,
    addProduct,
    increaseQuantity: increaseQuantity,
    decreaseQuantity: decreaseQuantity,
    clearCart,
    handleCheckout,
    handleChange,
    confirmOrder,
    cart: state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
