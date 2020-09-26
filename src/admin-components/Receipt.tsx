import React from "react";
import { OrderDetail } from "../api/models";

import "./Receipt.scss";
import Data from "./Data";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const Receipt: React.FC<{ orderDetail?: OrderDetail }> = (props) => {
  if (!props.orderDetail) {
    return <div className="receipt-container">No data.</div>;
  }

  const { orderItems } = props.orderDetail;

  return (
    <div className="receipt-container">
      <div>
        <b>Order details</b>
      </div>
      <Data
        name={"Total items"}
        value={(orderItems && orderItems.length) || 0}
      />
      <Data name={"Total"} value={`₱ ${props.orderDetail.total}`} />
      <div className="receipt-table">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Qty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.product?.name}</TableCell>
                  <TableCell align="right">{row.productCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Receipt;
