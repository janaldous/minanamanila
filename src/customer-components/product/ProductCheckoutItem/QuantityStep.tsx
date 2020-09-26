import * as React from "react";

export interface QuantityStepProps {
  onIncrease: () => void;
  onDecrease: () => void;
  value: number;
}

export const QuantityStep: React.FC<QuantityStepProps> = (props) => {
  return (
    <div className="d-flex flex-row-reverse mr-2">
      <div
        className="increase"
        style={{ cursor: "pointer" }}
        onClick={props.onIncrease}
      >
        +
      </div>
      <div className="font-weight-bold m-1">{props.value}</div>
      <div
        className="decrease"
        style={{ cursor: "pointer" }}
        onClick={props.onDecrease}
      >
        -
      </div>
    </div>
  );
};
