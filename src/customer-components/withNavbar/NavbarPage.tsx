import React from "react";
import { MyNavbar } from "../navbar/Navbar";

export const NavbarPage: React.FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <div className="page">
      <MyNavbar />
      {props.children}
    </div>
  );
};
