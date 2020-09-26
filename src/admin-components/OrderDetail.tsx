import React from "react";
import OrderApi from "../api/OrderApi";
import {
  OrderDetail as OrderDetailModel,
  OrderTrackingStatusEnum,
  OrderUpdateDtoStatusEnum,
  OrderDetailDeliveryTypeEnum,
} from "../api/models";
import { useParams, Link } from "react-router-dom";
import Receipt from "./Receipt";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import dateFormat from "dateformat";
import Data from "./Data";

const OrderDetail: React.FC = () => {
  const [order, setOrder] = React.useState<OrderDetailModel>();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<OrderTrackingStatusEnum>();

  const { id } = useParams();

  React.useEffect(() => {
    OrderApi.getOrder(id).then((res) => {
      setOrder(res.data);
      setStatus(res.data.tracking?.status);
    });
  }, [id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    const mapper = (status: OrderTrackingStatusEnum) => {
      switch (status) {
        case OrderTrackingStatusEnum.REGISTERED:
          return OrderUpdateDtoStatusEnum.REGISTERED;
        case OrderTrackingStatusEnum.COOKING:
          return OrderUpdateDtoStatusEnum.COOKING;
        case OrderTrackingStatusEnum.OTW:
          return OrderUpdateDtoStatusEnum.OTW;
        case OrderTrackingStatusEnum.DELIVERED:
          return OrderUpdateDtoStatusEnum.DELIVERED;
        default:
          throw new Error();
      }
    };
    if (!order || !status) throw new Error();
    OrderApi.updateStatus(order.id + "", mapper(status))
      .then((res) => setOrder(res.data))
      .finally(() => setOpen(false));
  };

  const handleChange = (e: any) => {
    setStatus(e.target.value);
  };

  const deliveryInfo =
    order?.deliveryType === OrderDetailDeliveryTypeEnum.DELIVER ? (
      <React.Fragment>
        <Data name={"Address line 1"} value={order?.shipping?.addressLineOne} />
        <Data name={"Village"} value={order?.shipping?.addressLineTwo} />
        <Data name={"City"} value={order?.shipping?.city} />
        <Data
          name={"Province"}
          value={`${order?.shipping?.province} ${order?.shipping?.postalCode}`}
        />
        <Data
          name={"Special Instructions"}
          value={order?.shipping?.specialInstructions}
        />
      </React.Fragment>
    ) : (
      <Data
        name={"Meet up location"}
        value={order?.shipping?.specialInstructions}
      />
    );

  return (
    <div className="order-detail-container">
      <h2>Order #{id}</h2>
      <div>
        <b>Order</b>
      </div>
      <Data name={"Order id"} value={id} />
      <div>
        <Data name={"Order status"} value={order?.tracking?.status} />
        <Button variant="contained" onClick={handleOpen}>
          Update status
        </Button>
      </div>
      <Data name={"Last updated"} value={dateFormat(order?.tracking?.dateLastUpdated)} />
      <br />
      <Receipt orderDetail={order} />
      <br />
      <div>
        <b>Customer</b>
      </div>
      <Data name={"Name"} value={`${order?.user?.firstName} ${order?.user?.lastName}`} />
      <Data name={"Contact number"} value={order?.user?.contactNumber} />
      <br />

      <div>
        <b>Delivery details</b>
      </div>
      <Data name={"Delivery type"} value={order?.deliveryType} />
      {deliveryInfo}
      <Data
        name={"Delivery date"}
        value={dateFormat(order?.deliveryDate?.date, "ddd, mmmm d, yyyy")}
      />
      <br />
      <div>
        <b>Payment information</b>
      </div>
      <Data name={"Payment type"} value={order?.paymentType} />
      <br />
      <Link to={"/orders"}>
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form>
            <FormControl>
              <InputLabel htmlFor="order-status">Status</InputLabel>
              <Select
                native={true}
                value={status}
                onChange={handleChange}
                input={<Input id="order-status" />}
              >
                <option value={OrderTrackingStatusEnum.REGISTERED}>
                  Registered
                </option>
                <option value={OrderTrackingStatusEnum.COOKING}>Cooking</option>
                <option value={OrderTrackingStatusEnum.OTW}>OTW</option>
                <option value={OrderTrackingStatusEnum.DELIVERED}>
                  Delivered
                </option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderDetail;
