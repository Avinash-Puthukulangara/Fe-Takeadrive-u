import { createBrowserRouter } from "react-router-dom";
import { Userlayout } from "../layout/Userlayout";
import { Errorpage } from "../pages/user/Errorpage";
import { Signuppage } from "../pages/user/Signuppage";
import { Homepage } from "../pages/user/Homepage";

import { Loginpage } from "../pages/user/Loginpage";
import { ProtectedRoute } from "./Protectedroute";
import { CarList } from "../pages/user/CarList";

import { SearchProvider } from "../components/user/SearchContext";
import { DatePlace } from "../components/user/DatePlace";
import { MyProfile } from "../pages/user/MyProfile";
import { BookCar } from "../pages/user/BookCar";
import PaymentSuccess from "../components/user/PaymentSuccess";
import PaymentCanceled from "../components/user/PaymentCancel";
import { MyBookings } from "../pages/user/MyBookings";

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
            element:
            <SearchProvider><Signuppage /></SearchProvider>   
        },
        {
            path: "login",
            element: (
             <SearchProvider><Loginpage /></SearchProvider>
          )
        },

        {
              path: "user",
              element: <ProtectedRoute />,
              children: [
                {
                  path: "dateplace",
                  element: (
                    <SearchProvider><DatePlace /></SearchProvider>
                  )
                },
                {
                  path: "carlist",
                  element:(
                    <SearchProvider><CarList /></SearchProvider>
                  ) 
                },
                {
                  path: "bookcar/:carId",
                  element: <BookCar />
                },
                {
                  path: "myprofile",
                  element: <MyProfile />
                },
                {
                  path: "paymentsuccess",
                  element: <PaymentSuccess />,
                },
                {
                  path: "paymentcancel",
                  element: <PaymentCanceled />,
                },
                {
                  path: "mybookings",
                  element: <MyBookings />
                }
              ]
        }

      ],
    },
    
  ]);