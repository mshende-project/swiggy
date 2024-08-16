import React, { FunctionComponent } from "react";
import { CDN_URL } from "../../utils/constants";

interface RestaurantCardProps {
  data: any;
}
export const RestaurantCard: FunctionComponent<RestaurantCardProps> = ({
  data,
}) => {
  return (
    <div className="res-card">
      <img
        alt="res-image"
        className="res-image"
        src={CDN_URL + data.cloudinaryImageId}
      />
      <h5>{data.name}</h5>
      <p>
        ★{data.avgRating} • {data.sla.deliveryTime} mins
      </p>
      <p>{data.cuisines.join(", ").substring(0, 25)}</p>
    </div>
  );
};
