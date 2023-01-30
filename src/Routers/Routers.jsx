import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registaion from "../Pages/Registation/Registaion";
import PrivetRoute from "./PrivetRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Login></Login>
            },
            {
                path: '/registaion',
                element: <Registaion></Registaion>
            },
            {
                path: '/bill',
                element: <PrivetRoute><Home></Home></PrivetRoute>
            }
        ],
    }
]);

export default router;