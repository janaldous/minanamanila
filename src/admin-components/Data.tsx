import * as React from "react";
import "./Data.scss";

const Data: React.FC<{ name: string; value: any }> = (props) => {
  return (
    <div className="data-row">
      <span className="name">{props.name}</span>
      <span className="value">{props.value}</span>
    </div>
  );
};

export default Data;
