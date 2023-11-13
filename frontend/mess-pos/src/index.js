import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: "http://localhost:3000",
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                scope: "openid profile email",
            }}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
