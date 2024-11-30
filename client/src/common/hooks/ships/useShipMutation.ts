import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { createShip } from "../../../services/ship";
import { IShip } from "../../interfaces/ship";


const useShipMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["SHIPS"],
    mutationFn: async (option: { action: string; newShip?: IShip, shipId?: string }) => {
      switch (option.action) {

        case "add":
          try {
            const res = await createShip(option?.newShip)
            message.success("Thêm ship thành công");
            navigate('/admin/ships')
            return res;
          } catch (error) {
            message.error("Thêm ship thất bại");
          }
          break;
        // case "delete":
        //   if (!option.shipId) {
        //     message.error("Không tìm thấy ID ship để xóa");
        //     return;
        //   }
        //   try {
        //     const res = await deleteShip(option.shipId);
        //     message.success("Xóa ship thành công");
        //     return res;
        //   } catch (error) {
        //     message.error("Xóa ship thất bại");

        //   }
        //   break;

        // case "update":
        //   if (!option.shipId || !option.newShip) {
        //     message.error("Dữ liệu cập nhật không đầy đủ");
        //     navigate(`/admin/ships`);
        //     return;
        //   }
        //   try {
        //     const res = await updateShip(option.shipId, option.newShip)
        //     message.success('update phí ship thành công')
        //     navigate(`/admin/ships`)
        //     return res
        //   } catch (error) {
        //     message.error('Update thất bại')
        //   }
        //   break;

        default:
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["SHIPS"] });
    },
  });
  return mutation
}

export default useShipMutation