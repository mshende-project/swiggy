import React, { useEffect, useState } from "react";
import { RestaurantCard } from "./restaurants/RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";
import useRestaurantList from "../hooks/useRestaurantList";

export const Body = () => {
  const onlineStatus = useOnlineStatus();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { restLists, isLoading } = useRestaurantList();

  useEffect(() => {
    setFilteredRestaurants(restLists);
  }, [restLists]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRestaurants(restLists);
    }
  }, [searchTerm, restLists]);

  const handleClearFilter = () => {
    setFilteredRestaurants(restLists);
    setSearchTerm("");
  };

  const handleTopRatedFilter = () => {
    if (!!restLists) {
      const topRatedRests = restLists.filter(
        (list: any) => list.info.avgRating > 4
      );
      setFilteredRestaurants(topRatedRests);
    }
  };

  const handleSearch = () => {
    const filteredRes = restLists.filter((res: any) =>
      res.info.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filteredRes);
  };

  if (!onlineStatus) return <h1>Looks like you are offline!!</h1>;

  return (
    <div>
      <div className="filter">
        <div className="search">
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button onClick={handleTopRatedFilter}>Top rated restaurants</button>
        <button onClick={handleClearFilter} className="clear-filter">
          ⤫ Clear filter
        </button>
      </div>
      <div className="res-container">
        {isLoading ? (
          <Shimmer />
        ) : (
          !!filteredRestaurants &&
          filteredRestaurants.map((restaurant: any) => (
            <Link
              to={`/restaurants/${restaurant.info.id}`}
              key={restaurant.info.id}
              className="res-link"
            >
              <RestaurantCard data={restaurant.info} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
