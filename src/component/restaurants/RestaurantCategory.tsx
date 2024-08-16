import React, { FunctionComponent } from "react";
import ItemCards from "./ItemCards";

const RestaurantCategory: FunctionComponent<{
  category: any;
  collapseItems: boolean;
  onClick: () => void;
}> = ({ category, collapseItems, onClick }) => {
  const handleCategoryClick = () => {
    if (!!onClick) {
      onClick();
    }
  };

  if (!category || !category.itemCards) {
    return null;
  }

  return (
    <div className="category">
      <h4 className="category-title" onClick={handleCategoryClick}>
        <span>
          {!!category.title ? category.title : ""} (
          {category?.itemCards?.length})
        </span>
        <span>{collapseItems ? "🔼" : "🔽"}</span>
      </h4>
      {collapseItems && (
        <ItemCards items={category.itemCards} key={category.title} />
      )}
    </div>
  );
};

export default RestaurantCategory;
