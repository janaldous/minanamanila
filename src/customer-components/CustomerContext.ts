import React from "react";
import { ProductRequiredDto } from "./product/ProductPage";

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CheckoutCart {
  items: Array<ProductRequiredDto>;
  total: number;
  numberOfItems: number;
}

export type QuantityOperation = "increase" | "decrease" | "set";

export interface CustomerContextStuff {
  cart: CheckoutCart;
  onAddToCart: (
    product: ProductRequiredDto,
    operation: "increase" | "decrease"
  ) => void;
  onCartChange: (product: ProductRequiredDto, operation: QuantityOperation, quantity?: number) => void;
}

export const CustomerContext = React.createContext<CustomerContextStuff>({
  cart: {
    items: [],
    total: 0,
    numberOfItems: 0,
  },
  onAddToCart: (productId, operation) => console.log,
  onCartChange: () => console.log,
});
