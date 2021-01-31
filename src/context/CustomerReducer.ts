import { OrderDtoDeliveryTypeEnum } from "api/minanamanila-api-client/api";
import { CartState, DeliveryData, DeliveryFormType } from "./CartReducer";

export const customerReducer = (state: CartState, action): CartState => {
  switch (action.type) {
    case "CHANGE_VALUE":
      let { name, value } = action.payload;

      const newDeliveryFormData: DeliveryFormType = {
        ...state.deliveryForm,
        formValues: { ...state.deliveryForm.formValues, [name]: value },
        formTouched: { ...state.deliveryForm.formTouched, [name]: true },
      };

      if (
        newDeliveryFormData.formValues.deliveryType !==
        state.deliveryForm.formValues.deliveryType
      ) {
        const { formValues } = newDeliveryFormData;
        formValues.addressLine1 = "";
        formValues.addressLine2 = "";
        formValues.specialInstructions = "";
      }

      const errors = validate(newDeliveryFormData.formValues);
      if (newDeliveryFormData.formTouched) {
        newDeliveryFormData.formErrors = {
          ...newDeliveryFormData.formErrors,
          [name]: errors[name],
        };
      }
      newDeliveryFormData.isSubmitting = Object.keys(errors).length === 0;

      return {
        ...state,
        deliveryForm: newDeliveryFormData,
      };
    case "CONFIRM_ORDER":
      return {
        ...state,
        orderConfirmation: {
          orderNumber: action.payload.confirmationNumber,
        },
      };
    default:
      return state;
  }
};

const validate = (values: DeliveryData) => {
  const errors: any = {};
  if (!values.firstName) errors.firstName = "Required";
  if (!values.lastName) errors.lastName = "Required";
  if (!values.contactNumber) errors.contactNumber = "Required";
  const regexMobileNumber = RegExp("^09[0-9]{9}$");
  if (values.contactNumber && !regexMobileNumber.test(values.contactNumber)) {
    errors.contactNumber = "Invalid mobile number";
  }
  if (!values.deliveryType) errors.deliveryType = "Required";
  if (!values.paymentType) errors.paymentType = "Required";
  if (values.deliveryType === OrderDtoDeliveryTypeEnum.DELIVER) {
    if (!values.addressLine1) errors.addressLine1 = "Required";
    if (!values.addressLine2) errors.addressLine2 = "Required";
    if (values.city !== "Sta. Rosa")
      errors.city = "Sorry, we currently only deliver to Sta. Rosa";
  } else if (values.deliveryType === OrderDtoDeliveryTypeEnum.MEETUP) {
    if (!values.specialInstructions) errors.specialInstructions = "Required";
  }
  return errors;
};