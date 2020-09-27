import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Navbar from "react-bootstrap/Navbar";
import logo from "../minanamanila_thin-removebg-preview.png";
import SearchIcon from "@material-ui/icons/Search";

export const MyNavbar: React.FC<{}> = () => {
  return (
    <Navbar className="custom-navbar">
      <div className="flex-1-only">
        <MenuIcon />
      </div>
      <Navbar.Brand className="nav-brand" href="/">
        <img src={logo} alt="Logo" className="logo" />
      </Navbar.Brand>
      <div className="flex-1-only">
        <div className="d-flex flex-row-reverse">
          <div className="font-weight-bold">Login</div>
          <div className="font-weight-bold pr-3"><SearchIcon /></div>
        </div>
      </div>
    </Navbar>
  );
};
