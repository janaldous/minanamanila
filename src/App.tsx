import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./admin-components/Admin";
import Customer from "./customer-components/Customer";
import ErrorBoundary from "./ErrorBoundary";
import {
  FeatureToggles,
} from "@paralleldrive/react-feature-toggles";
import queryString from "query-string";

const initialFeatures = ["online-order"];

function App() {

  const searchString = window.location.search.substring(1);
  const {ft} = queryString.parse(searchString);
  const features1 = ft ? (ft as string).split(",") : [];
  
  const features = [...initialFeatures, ...features1];

  return (
    <FeatureToggles features={features}>
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Customer />
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </FeatureToggles>
  );
}

export default App;
