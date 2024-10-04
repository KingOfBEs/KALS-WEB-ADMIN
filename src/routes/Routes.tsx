import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../layouts/main/Main";
import LoginPage from "../pages/login/LoginPage";

export const router = createBrowserRouter( [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "admin",
                element: <Main />
            },
        ]
    }
] )