import { createBrowserRouter } from "react-router-dom";
import { Userlayout } from "../layout/Userlayout";
import { Errorpage } from "../pages/user/Errorpage";
import { Signuppage } from "../pages/user/Signuppage";
import { Homepage } from "../pages/user/Homepage";
import { DatePlace } from "../pages/user/DatePlace";
import { Loginpage } from "../pages/user/Loginpage";
import { ProtectedRoute } from "./Protectedroute";
import { CarList } from "../pages/user/CarList";



export const router = createBrowserRouter([
    {
      path: "",
      element: <Userlayout />,
      errorElement: <Errorpage />,
      children: [
        {
          path: "/",
          element: <Homepage />
        },
        {
            path: "signup",
            element: <Signuppage />
        },
        {
            path: "login",
            element: <Loginpage />
        },

        {
              path: "user",
              element: <ProtectedRoute />,
              children: [
                {
                  path: "dateplace",
                  element: <DatePlace />
                },
                {
                  path: "carlist",
                  element: <CarList />
                },
                {
                  path: "mybookings"
                }
              ]
        }

      ],
    },
    
  ]);