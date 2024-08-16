import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsSelector } from "../../store/slices/cartSlice";
import ItemCards from "./ItemCards";
import { clearCart } from "../../store/slices/cartSlice";
import empty_cart from "../../assets/empty_cart.jpg";
import { Link } from "react-router-dom";

export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleTotal = () => {
    let price: number = 0;
    cartItems.map((item: any) => {
      if (!!item.card.info.price) {
        price += item.card.info.price;
      }
      return price;
    });
    setTotalPrice(price / 100);
  };

  useEffect(() => {
    handleTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <img alt="empty-cart" src={empty_cart} />
          <h3>Your cart is empty</h3>
          <p>Please go to homepage to view restaurants</p>
          <Link to={"/"} className="home-btn">
            Go to home
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-action">
            <h1>Cart</h1>
            <button onClick={handleClearCart} className="cart-clear">
              Clear cart
            </button>
          </div>
          <div className="cart-items">
            <ItemCards items={cartItems} isCart />
          </div>
          <div className="cart-total">Total - {totalPrice}</div>
        </>
      )}
    </div>
  );
};
