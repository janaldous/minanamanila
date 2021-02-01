import { KeyboardDatePicker } from "@material-ui/pickers";
import {
  OrderDtoDeliveryTypeEnum,
  OrderDtoPaymentTypeEnum,
} from "api/minanamanila-api-client/api";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
  DeliveryData,
  OrderComponentFormProps,
  OrderComponentProps,
} from "./OrderModel";

const DeliveryInfo: React.FC<OrderComponentProps & OrderComponentFormProps> = (
  props
) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (props.onNext) {
      const isValid = props.data.deliveryForm.isSubmitting;
      if (isValid) {
        props.onNext();
      }
    }
  };

  const handleChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e.target.name, e.target.value);
    }
  };

  const handleChangeDatepicker = (name: string, date: Date | null) => {
    if (props.onChange) {
      props.onChange(name, date);
    }
  };

  const { formValues, formErrors } = props.data.deliveryForm;

  console.log(formErrors);

  const addressSection = () => {
    switch (formValues.deliveryType) {
      case OrderDtoDeliveryTypeEnum.DELIVER:
        return (
          <AddressSection
            formErrors={formErrors}
            formValues={formValues}
            onChange={handleChange}
          />
        );
      case OrderDtoDeliveryTypeEnum.MEETUP:
        return (
          <React.Fragment>
            <Form.Group controlId="special-instructions">
              <Form.Label>Special Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="special-instructions"
                onChange={handleChange}
                value={formValues.specialInstructions}
                placeholder={"e.g. Let's meet up at Nuvali"}
                isInvalid={!!formErrors.specialInstructions}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {formErrors.specialInstructions}
            </Form.Control.Feedback>
          </React.Fragment>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="app-container">
      <section id="order">
        <div className="row justify-content-center">
          <div className="description">
            <div className="bold-title">Delivery information</div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="description">
            <Form>
              <Form.Group>
                <Form.Label>Full name</Form.Label>
                <Form.Row>
                  <Col>
                    <Form.Control
                      name="given-name"
                      placeholder="First name"
                      aria-label={"firstName"}
                      onChange={handleChange}
                      value={formValues.firstName}
                      isInvalid={!!formErrors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.firstName}
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      name="family-name"
                      placeholder="Last name"
                      aria-label={"lastName"}
                      onChange={handleChange}
                      value={formValues.lastName}
                      isInvalid={!!formErrors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.lastName}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Label>Contact number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  aria-label={"contactNumber"}
                  onChange={handleChange}
                  value={formValues.contactNumber}
                  isInvalid={!!formErrors.contactNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.contactNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Delivery option</Form.Label>
                <Form.Row>
                  <Form.Check
                    inline={true}
                    name={"deliveryOption"}
                    type={"radio"}
                    label={"Deliver"}
                    id={"delivery-option-deliver"}
                    value={OrderDtoDeliveryTypeEnum.DELIVER}
                    onChange={handleChange}
                    checked={
                      formValues.deliveryType ===
                      OrderDtoDeliveryTypeEnum.DELIVER
                    }
                    isInvalid={!!formErrors.deliveryType}
                  />
                  <Form.Check
                    inline={true}
                    name={"deliveryOption"}
                    type={"radio"}
                    label={"Meet up"}
                    id={"delivery-option-meetup"}
                    value={OrderDtoDeliveryTypeEnum.MEETUP}
                    onChange={handleChange}
                    checked={
                      formValues.deliveryType ===
                      OrderDtoDeliveryTypeEnum.MEETUP
                    }
                    isInvalid={!!formErrors.deliveryType}
                  />
                </Form.Row>
              </Form.Group>

              {addressSection()}

              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Delivery date"
                value={formValues.deliveryDate}
                onChange={(date) =>
                  handleChangeDatepicker("deliveryDate", date)
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <div className="bold-title">Payment information</div>

              <Form.Group>
                <Form.Row>
                  <Form.Check
                    inline={true}
                    name={"paymentOption"}
                    type={"radio"}
                    label={"Cash"}
                    value={OrderDtoPaymentTypeEnum.CASH}
                    id={"payment-option-cash"}
                    onChange={handleChange}
                    checked={
                      formValues.paymentType === OrderDtoPaymentTypeEnum.CASH
                    }
                    isInvalid={!!formErrors.paymentType}
                  />
                  <Form.Check
                    inline={true}
                    name={"paymentOption"}
                    type={"radio"}
                    label={"GCash"}
                    value={OrderDtoPaymentTypeEnum.GCASH}
                    id={"payment-option-gcash"}
                    onChange={handleChange}
                    checked={
                      formValues.paymentType === OrderDtoPaymentTypeEnum.GCASH
                    }
                    isInvalid={!!formErrors.paymentType}
                  />
                </Form.Row>
              </Form.Group>

              <Button
                variant="primary"
                className="btn-next w-100"
                onClick={handleSubmit}
              >
                One more step
              </Button>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

const AddressSection: React.FC<{
  onChange?: (e: any) => void;
  formValues: DeliveryData;
  formErrors: Partial<DeliveryData>;
}> = (props) => {
  return (
    <React.Fragment>
      <Form.Group controlId="addressLine1">
        <Form.Label>Address Line 1</Form.Label>
        <Form.Control
          type="string"
          name="address-line1"
          aria-label={"addressLine1"}
          placeholder={"e.g. Street, Landmark"}
          onChange={props.onChange}
          value={props.formValues.addressLine1}
          isInvalid={!!props.formErrors.addressLine1}
        />
        <Form.Control.Feedback type="invalid">
          {props.formErrors.addressLine1}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="addressLine2">
        <Form.Label>Address Line 2</Form.Label>
        <Form.Control
          type="string"
          name="address-line2"
          aria-label={"addressLine2"}
          placeholder={"e.g. Village"}
          onChange={props.onChange}
          value={props.formValues.addressLine2}
          isInvalid={!!props.formErrors.addressLine2}
        />
        <Form.Control.Feedback type="invalid">
          {props.formErrors.addressLine2}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          as="select"
          name="city"
          isInvalid={!!props.formErrors.city}
          onChange={props.onChange}
          value={props.formValues.city}
        >
          <option>Sta. Rosa</option>
          <option>Other</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {props.formErrors.city}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="special-instructions">
        <Form.Label>Special Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="special-instructions"
          onChange={props.onChange}
          value={props.formValues.specialInstructions}
          placeholder={"e.g. Please leave the parcel at the guardhouse"}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default DeliveryInfo;
