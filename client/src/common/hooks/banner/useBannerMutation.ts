import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IBanner } from "../../interfaces/Banner";
import { message } from "antd";
import {
  addBanner,
  DeleteBannerById,
  updateBannerById,
} from "../../services/banner";

const useBannerMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["BANNERS"],
    mutationFn: async (option: { action: string; banner: IBanner }) => {
      switch (option.action) {
        case "add":
          try {
            await addBanner(option.banner);
            message.success("Thêm banner thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        case "delete":
          try {
            await DeleteBannerById(option.banner._id);
            message.success("Xóa banner thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        case "update":
          try {
            await updateBannerById(option.banner);
            message.success("Cập nhật banner thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BANNERS"] }); //Tu dong cap nhat lai API
    },
  });
  return mutation;
};

export default useBannerMutation;
