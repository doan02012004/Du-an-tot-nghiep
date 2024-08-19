import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IColor } from "../../interfaces/Color";
import {
  addColor,
  DeleteColorById,
  updateColorById,
} from "../../services/color";
import { message } from "antd";

const useColorMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["COLORS"],
    mutationFn: async (option: { action: string; color: IColor }) => {
      switch (option.action) {
        case "add":
          try {
            await addColor(option.color);
            message.success("Thêm màu thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        case "delete":
          try {
            await DeleteColorById(option.color._id);
            message.success("Xóa màu thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        case "update":
          try {
            await updateColorById(option.color);
            message.success("Cập nhật màu thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["COLORS"] }); //Tu dong cap nhat lai API
    },
  });
  return mutation;
};

export default useColorMutation;
