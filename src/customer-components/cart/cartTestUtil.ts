import { CartState } from "context/CartReducer";

export const getInitialCartState = (): CartState => ({
  items: [],
  isCheckout: false,
  itemCount: 0,
  subtotalPrice: 0,
  totalPrice: 0,
  deliveryFee: 0,
  deliveryForm: {
    formValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "Sta. Rosa",
      deliveryType: undefined,
      paymentType: undefined,
    },
    formErrors: {
      firstName: undefined,
      lastName: undefined,
      contactNumber: undefined,
      addressLine1: undefined,
      addressLine2: undefined,
      deliveryType: undefined,
      paymentType: undefined,
      city: undefined,
      specialInstructions: undefined,
      deliveryDate: undefined,
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
});

export const getInitialCartContext = () => ({
  addProduct: jest.fn(),
  cart: getInitialCartState(),
  clearCart: jest.fn(),
  decreaseQuantity: jest.fn(),
  handleCheckout: jest.fn(),
  increaseQuantity: jest.fn(),
  removeProduct: jest.fn(),
  handleChange: jest.fn(),
  confirmOrder: jest.fn,
});
