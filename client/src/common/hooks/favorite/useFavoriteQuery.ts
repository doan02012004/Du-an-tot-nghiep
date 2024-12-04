// hooks/useFavoriteQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../../services/favorite";

const useFavoriteQuery = (userId: string) => {
  const query = useQuery({
    queryKey: ["FAVORITES", userId],
    queryFn: async () => {
      try {
        const data = await getFavorites(userId);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return query;
};

export default useFavoriteQuery;
