import { createBrowserRouter } from "react-router-dom";
import { Userlayout } from "../layout/Userlayout";
import { Errorpage } from "../pages/user/Errorpage";
import { Signuppage } from "../pages/user/Signuppage";
import { Homepage } from "../pages/user/Homepage";
import { DatePlace } from "../pages/user/DatePlace";
import { Loginpage } from "../pages/user/Loginpage";
import { Protectedroute } from "./Protectedroute";

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
              element: <Protectedroute />,
              children: [
                {
                  path: "filter",
                  element: <DatePlace />
                },
                {
                  path: "userprofile"
                },
                {
                  path: "mybookings"
                }
              ]
        }

      ],
    },
    
  ]);