import { CartState, ProductWithQuantity } from "context/CartReducer";
import {
  OrderDtoDeliveryTypeEnum,
  OrderDtoPaymentTypeEnum,
  DeliveryDate,
} from "../../api/models";

export interface OrderData {
  items: Array<ProductWithQuantity>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryForm: {
    formValues: DeliveryData;
    formErrors: Partial<DeliveryData>;
    formTouched: DeliveryDataTouched;
    isSubmitting: boolean;
  };
  orderConfirmation?: {
    orderNumber?: number;
  };
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

export interface OrderComponentProps {
  onNext?: () => void;
  data: CartState;
}

export interface OrderComponentFormProps {
  onChange?: (name: string, value: any) => void;
}
