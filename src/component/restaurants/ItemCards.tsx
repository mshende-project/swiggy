import React, { FunctionComponent } from "react";
import { IMAGE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  CartItem,
  cartItemsSelector,
  removeItem,
} from "../../store/slices/cartSlice";
import noimage from "../../assets/noimage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemCards: FunctionComponent<{ items: CartItem[]; isCart?: boolean }> = ({
  items,
  isCart,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const handleItemAdd = (item: any) => {
    dispatch(addItem(item));
    toast(`${cartItems.length + 1} items added to cart`);
  };
  const handleItemRemove = (item: any) => {
    if (item.card.info.id !== undefined) {
      console.log("remove", item.card.info.id);
      dispatch(removeItem(item.card.info.id));
    }
  };
  return (
    <div>
      {items.map((item: any) => (
        <div className="item-card" key={item.card.info.id}>
          <div key={item.card.info.id}>
            <div>
              <div className="menu-name">{item.card.info.name} </div>
              <div className="menu-price">
                Rs.
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </div>
              <div className="menu-review">
                {Object.keys(item.card.info.ratings.aggregatedRating).length >
                  0 && (
                  <>
                    ✩ {item.card.info.ratings.aggregatedRating.rating} (
                    {item.card.info.ratings.aggregatedRating.ratingCountV2})
                  </>
                )}
              </div>
            </div>
            <p className="menu-desc">{item.card.info.description}</p>
          </div>
          <div className="item-action">
            <div>
              {isCart ? (
                <button onClick={() => handleItemRemove(item)}>Remove</button>
              ) : (
                <button onClick={() => handleItemAdd(item)}>ADD</button>
              )}
              <ToastContainer
                theme="dark"
                closeOnClick
                autoClose={5000}
                position="bottom-right"
              />
            </div>
            {!!item.card.info.imageId ? (
              <img
                alt={item.card.info.name}
                src={IMAGE_URL + `/${item.card.info.imageId}`}
              />
            ) : (
              <img alt={item.card.info.name} src={noimage} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCards;
