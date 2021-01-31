import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Admin.scss";
import Login from "./Login";
import OrderAdmin from "./OrderAdmin";
import OrderDetail from "./OrderDetail";

const Admin: React.FC<{}> = () => {
  return (
    <div className="admin-container">
      <Router basename="/admin">
        <Switch>
          <Route exact path="/orders" component={OrderAdmin} />
          <Route path="/orders/:id" component={OrderDetail} />
          <Route path="/login" component={Login} />
          {/* <Route path="/">
              <Redirect to="/orders" />
            </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

export default Admin;
