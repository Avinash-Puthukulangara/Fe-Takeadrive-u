import { createBrowserRouter } from "react-router-dom";
import { Userlayout } from "../layout/Userlayout";
import { Errorpage } from "../pages/user/Errorpage";
import { Signuppage } from "../pages/user/Signuppage";
import { Homepage } from "../pages/user/Homepage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Userlayout />,
      errorElement: <Errorpage />,
      children: [
        {
          path: "",
          element: <Homepage />
        },
        {
            path: "/sign-up",
            element: <Signuppage />
        },

      ],
    },
    
  ]);