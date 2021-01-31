import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";

const useAuth0Util = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = React.useState<string>();

  React.useEffect(() => {
    const getAccessToken = async () => {
      const _token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      sessionStorage.setItem("auth0_token", _token);
      setToken(_token);
    };

    if (!sessionStorage.getItem("auth0_token")) {
      getAccessToken();
    }
  }, [getAccessTokenSilently]);

  return {
    getAccessToken: () => sessionStorage.getItem("auth0_token") || token,
  };
};

export default useAuth0Util;
