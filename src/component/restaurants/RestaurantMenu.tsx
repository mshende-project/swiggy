import React, { useState } from "react";
import Shimmer from "../Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

//controlled component
const RestaurantMenu = () => {
  const { id } = useParams();
  const { resInfo } = useRestaurantMenu(id);
  const [expandItem, setExpandItem] = useState<number>(0);

  const handleClick = (index: number) => {
    setExpandItem(expandItem === index ? -1 : index);
  };

  if (resInfo === undefined) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage, avgRating, totalRatingsString } =
    resInfo?.cards[2]?.card?.card?.info;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (category: any) => typeof category?.card?.card?.["@type"]
    );

  return (
    <div className="res-menu" key={name}>
      <div className="res-menu-title">
        <h4>{name}</h4>
        <div className="res-detail">
          {!!avgRating && (
            <>
              <span className="menu-review"> ✩ </span>
              {avgRating}
            </>
          )}
          {totalRatingsString} • {costForTwoMessage}
        </div>
        <p className="res-cuisine">{cuisines.join(", ")} </p>
      </div>

      {!!categories &&
        categories.map((category: any, index: number) => (
          <RestaurantCategory
            category={category.card.card}
            key={`${index}_${category.card.card.title}`}
            collapseItems={expandItem === index}
            onClick={() => handleClick(index)}
          />
        ))}
    </div>
  );
};

export default RestaurantMenu;
