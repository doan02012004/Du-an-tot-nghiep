import { useQuery } from "@tanstack/react-query";
import instance from "../../config/axios";

const useGalleryQuery = () => {
  const query = useQuery({
    queryKey: ["GALLERYS"],
    queryFn: async () => {
      try {
        const res = await instance.get("/gallerys");
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return query;
};
export default useGalleryQuery;
