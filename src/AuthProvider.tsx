import * as React from "react";
import { AuthContext, useProvideAuth } from "useAuth";

const AuthProvider: React.FC = (props) => {
    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
