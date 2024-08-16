import { useEffect, useState } from "react";
import { RES_MENU_URL } from "../utils/constants";

const useRestaurantMenu = (id: string | undefined) => {
  const [resInfo, setResInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!!id) {
      fetchMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMenu = async () => {
    setIsLoading(true);

    const data = await fetch(RES_MENU_URL + id)
      .then((result) => result.json())
      .finally(() => setIsLoading(false));
    if (!!data?.data) {
      setResInfo(data?.data);
    }
  };

  return { resInfo, isLoading };
};

export default useRestaurantMenu;
