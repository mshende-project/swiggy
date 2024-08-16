import { useEffect, useState } from "react";

const useRestaurantList = () => {
  const [restLists, setRestLists] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setIsLoading(true);

    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1458004&lng=79.0881546&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    )
      .then((result) => result.json())
      .finally(() => setIsLoading(false));

    if (!!data) {
      setRestLists(
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    }
  };

  return { restLists, isLoading, setRestLists };
};

export default useRestaurantList;
