import { Product } from "api/minanamanila-api-client/api";
import React, { createContext, useReducer } from "react";
import { CartReducer, CartState, sumItems } from "./CartReducer";

const storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "")
  : [];

const initialState: CartState = {
  cartItems: storage,
  ...sumItems(storage),
  checkout: false,
};

export const CartContext = createContext<any>(null);

interface CartContextType {
  removeProduct: (id: number) => void;
  addProduct: (product: Product) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clearCart: () => void;
  handleCheckout: () => void;
  cart: CartState;
}

const CartContextProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (payload) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload) => {
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
    increase,
    decrease,
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
