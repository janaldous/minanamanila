import { Product } from "api/minanamanila-api-client/api";
import React, { createContext, useReducer } from "react";
import { cartReducer, CartState, sumItems } from "./CartReducer";

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "")
  : [];

const initialState: CartState = {
  items: storage,
  ...sumItems(storage),
  isCheckout: false,
  deliveryFee: 100,
};

export const CartContext = React.createContext<CartContextType>(
  {} as CartContextType
);

interface CartContextType {
  removeProduct: (id: number) => void;
  addProduct: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  handleCheckout: () => void;
  cart: CartState;
}

const CartContextProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const increaseQuantity = (payload) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decreaseQuantity = (payload) => {
    dispatch({ type: "DECREASE", payload });
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
    console.log("CHECKOUT", state);
    dispatch({ type: "CHECKOUT" });
  };

  const contextValues: CartContextType = {
    removeProduct,
    addProduct,
    increaseQuantity: increaseQuantity,
    decreaseQuantity: decreaseQuantity,
    clearCart,
    handleCheckout,
    cart: state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
