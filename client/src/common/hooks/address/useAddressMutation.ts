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
           const res = await deleteAddress(option.newAddress._id);
           if(res?.status == 200){
            message.success("Xóa địa chỉ thành công!");

          }else{
           message.error("Xóa địa chỉ thất bại!");
          }
          } catch (error) {
            console.log(error);
          }
          break;
        case "update":
          try {
           const res = await updateAddress(option.newAddress);
           if(res?.status == 201){
             message.success("Cập nhật địa chỉ thành công!");

           }else{
            message.error("Cập nhật địa chỉ thất bại!");
           }
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
