import React from "react";

interface AuthContextModel {
  authorized: boolean;
  setAuthorized: (value: boolean) => void;
  basicAuth: string;
  setBasicAuth: (value: string) => void;
}

export const AuthContext = React.createContext<AuthContextModel>({
  authorized: false,
  setAuthorized: (val) => {console.log(val + " adf")},
  basicAuth: "Basic username:password",
  setBasicAuth: (val) => {console.log(val + " lel")},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function useProvideAuth(): AuthContextModel {
  const [authorized, setAuthorized] = React.useState(false);
  const [basicAuth, setBasicAuth] = React.useState("");

  return {
    authorized,
    setAuthorized,
    basicAuth,
    setBasicAuth,
  };
}
