import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Provider } from "react-redux";
import { appStore } from "../store/appStore";

export const AppLayout = () => {
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    //make an api call to get username & password
    const data = {
      name: "testuser",
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </Provider>
  );
};
