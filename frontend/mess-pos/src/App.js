import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cashier from "./components/Cashier"
import Home from "./components/Home"
import Manager from "./components/Manager"
import Login from "./components/Login"

// import {
//     LoginButton,
//     LogoutButton,
//     OAuthText,
//     APIRoutes,
// } from "./components/OAuth";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const RoleContext = React.createContext();
const App = () => {
    // get user email
    const { user, isAuthenticated } = useAuth0();
    const [role, setRole] = useState(null);

    // send request to backend to determine role
    useEffect(() => {
        if (isAuthenticated) {
            console.log("logged in");
            const emaildata = {
                email: user.email,
            };
            axios
                .get("http://localhost:5000/auth/role", { params: emaildata })
                .then((res) => {
                    console.log(res.data.rows[0].role.toLowerCase());
                    setRole(res.data.rows[0].role.toLowerCase());
                })
                .catch((err) => {
                    console.log(err);
                    setRole("");
                });
        } else {
            console.log("not logged in");
            setRole("");
        }
    }, [isAuthenticated]);

    return (
        <>
            <RoleContext.Provider value={role}>
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    {role == "cashier" && (
                        <Route path="cashier" element={<Cashier />} />
                    )}
                    {role == "manager" && (
                        <Route path="manager" element={<Manager />} />
                    )}
                </Routes>

                <Footer />
            </RoleContext.Provider>
        </>
    );
};

export default App;
