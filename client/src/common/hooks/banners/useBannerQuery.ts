import { useQuery } from "@tanstack/react-query";
import instance from "../../config/axios";

const useBannerQuery = () => {
  const query = useQuery({
    queryKey: ["BANNERS"],
    queryFn: async () => {
      try {
        const res = await instance.get("/banners");
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return query;
};

export default useBannerQuery;
