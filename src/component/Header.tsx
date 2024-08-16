import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";
// import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
import { cartItemsSelector } from "../store/slices/cartSlice";

export const Header = () => {
  const onlineStatus = useOnlineStatus();
  // const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector(cartItemsSelector);

  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Online: {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/" className="text-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-link">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-link">
              Cart ({cartItems.length})
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-link">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
