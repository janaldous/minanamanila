import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import OrderAdmin from "./OrderAdmin";
import "./Admin.scss";
import OrderDetail from "./OrderDetail";
import Login from "./Login";
import { Auth0Provider } from "@auth0/auth0-react";

const Admin: React.FC<{}> = () => {
  return (
    <div className="admin-container">
      <Auth0Provider
        domain="janaldous.eu.auth0.com"
        clientId="XBxLW6htBnvKJzqzWxQKpThM2fOmKr0U"
        redirectUri={`${window.location.origin}/admin`}
        audience={"http://localhost:8080"}
      >
        <Router basename="/admin">
          <Switch>
            <Route exact path="/orders" component={OrderAdmin} />
            <Route path="/orders/:id" component={OrderDetail} />
            <Route path="/login" component={Login} />
            <Route path="/">
              <Redirect to="/orders" />
            </Route>
          </Switch>
        </Router>
      </Auth0Provider>
    </div>
  );
};

export default Admin;
