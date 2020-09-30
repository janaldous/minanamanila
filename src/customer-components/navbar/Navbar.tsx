import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from "../minanamanila_thin-removebg-preview.png";
import SearchIcon from "@material-ui/icons/Search";

export const MyNavbar: React.FC<{ toggleSideBar: () => void }> = (props) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <Navbar className="custom-navbar">
        <div className="flex-1-only">
          <MenuIcon onClick={props.toggleSideBar} className="cursor-pointer" />
        </div>
        <Navbar.Brand className="nav-brand" href="/">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <div className="flex-1-only">
          <div className="d-flex flex-row-reverse">
            <div
              className="font-weight-bold cursor-pointer"
              onClick={handleShow}
            >
              Login
            </div>
            <div className="font-weight-bold pr-3">
              <SearchIcon />
            </div>
          </div>
        </div>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
