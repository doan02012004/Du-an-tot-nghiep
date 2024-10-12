import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IGallery } from "./../../interfaces/gallery";
import { message } from "antd";
import {
  addGallery,
  DeleteGalleryById,
  updateGalleryById,
} from "../../../services/gallery";

const useGalleryMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["GALLERYS"],
    mutationFn: async (option: { action: string; gallery: IGallery }) => {
      switch (option.action) {
        case "add":
          try {
            await addGallery(option.gallery);
            message.success("Thêm gallery thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        case "delete":
          try {
            await DeleteGalleryById(option.gallery._id);
            message.success("Xóa gallery thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        case "update":
          try {
            await updateGalleryById(option.gallery);
            message.success("Cập nhật gallery thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GALLERYS"] }); //Tu dong cap nhat lai API
    },
  });
  return mutation;
};

export default useGalleryMutation;
