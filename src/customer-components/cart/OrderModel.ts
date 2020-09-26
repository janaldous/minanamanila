import { OrderDtoDeliveryTypeEnum, OrderDtoPaymentTypeEnum, DeliveryDate } from "../../api/models";
import { ProductDto } from "api/models/OrderDto";

export interface OrderData {
  items: Array<ProductDto>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  price: 165;
  deliveryForm: {
    formValues: DeliveryData;
    formErrors: Partial<DeliveryData>;
    formTouched: DeliveryDataTouched;
    isSubmitting: boolean;
  }
  orderConfirmation?: {
    orderNumber?: number;
  },
  availableDeliveryDates: Array<DeliveryDate>,
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
  deliveryDateId?: number;
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
  data: OrderData;
  onChange?: (e: any) => void;
  onSubmit?: () => Promise<boolean>;
  onValidate?: () => boolean;
}
