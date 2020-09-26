import React from "react";

import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className="admin-login">
      <h2>Login</h2>
      {!isAuthenticated && (
        <Button variant="primary" onClick={loginWithRedirect}>
          Log in
        </Button>
      )}
    </div>
  );
};

export default Login;
