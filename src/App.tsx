import React from "react";
import { AppLayout } from "./component/AppLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./component/About";
import ContactUs from "./component/ContactUs";
import Error from "./component/Error";
import { Body } from "./component/Body";
import RestaurantMenu from "./component/restaurants/RestaurantMenu";
import { Cart } from "./component/restaurants/Cart";
import { SignUp } from "./component/Auth/SignUp";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/restaurants/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <SignUp />,
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
