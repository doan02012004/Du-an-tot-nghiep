import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Iaddress } from "../../interfaces/address";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "../../../services/address";
import { message } from "antd";

const useAddressMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["ADDRESSES"],
    mutationFn: async (option: { action: string; newAddress: Iaddress }) => {
      switch (option.action) {
        case "add":
          try {
            await createAddress(option.newAddress);
            message.success("Thêm địa chỉ thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        case "delete":
          try {
            await deleteAddress(option.newAddress._id);
            message.success("Xóa địa chỉ thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        case "update":
          try {
            await updateAddress(option.newAddress);
            message.success("Cập nhật địa chỉ thành công!");
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADDRESSES"] });
    },
  });
  return mutation;
};

export default useAddressMutation;
