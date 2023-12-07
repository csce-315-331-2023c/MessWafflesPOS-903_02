// File: OAuth.js
// Provides functions for OAuth2.0 authentication for the website

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
        >
            Log Out
        </button>
    );
};

const OAuthText = () => {
    const { user, isAuthenticated } = useAuth0();
    if (isAuthenticated) {
        return (
            <h1>
                Logged in as {user.name} at {user.email}
            </h1>
        );
    } else {
        return <h1>Not logged in</h1>;
    }
};

const APIRoutes = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    function callAPI() {
        axios
            .get("http://localhost:5000/")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async function callProtectedAPI() {
        if (!isAuthenticated) {
            console.log("not logged in");
            return;
        }
        try {
            const token = await getAccessTokenSilently();
            console.log(token);
            const response = await axios.get(
                "http://localhost:5000/cashier/inventory",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }

    return (
        <ul>
            <li>
                <button onClick={callAPI}>Call API route</button>
            </li>
            <li>
                <button onClick={callProtectedAPI}>
                    Call protected API route
                </button>
            </li>
        </ul>
    );
};

export { LoginButton, LogoutButton, OAuthText, APIRoutes };
