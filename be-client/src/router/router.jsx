import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ListStudent from "../pages/home/ListStudent";
import Login from "../pages/authentications/Login";
import Register from "../pages/authentications/Register";

import SaveUserExel from "../pages/saveInfor/SaveUserExcel";
import ListTable from "../pages/home/ListTable";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/list",
          element: <ListStudent/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/file",
          element: <SaveUserExel/>
        },
        {
          path: "/statistical",
          element: <ListTable/>
        }
        
      ]
    },
  ]);
  
export default router