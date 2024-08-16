import { createContext } from "react";

//central global object for user
const UserContext = createContext({
  loggedInUser: "Default User",
});

export default UserContext;
