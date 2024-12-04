// hooks/useFavoriteMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { toggleFavorite } from "../../../services/favorite";
import { IFavoriteToggle } from "../../interfaces/favorite";

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationKey: ["FAVORITE"],
    mutationFn: async ({userId, productId, status }: IFavoriteToggle) => {
      try {
        const data = await toggleFavorite({userId, productId, status });
        message.success(status ? "Đã thêm sản phẩm vào yêu thích" : "Đã bỏ sản phẩm khỏi yêu thích");
        return data;
      } catch (error) {
        message.error("Có lỗi xảy ra!");
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey:["FAVORITES"]});
    },
  });

  return mutation;
};

export default useFavoriteMutation;
