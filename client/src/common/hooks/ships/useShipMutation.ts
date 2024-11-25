import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IShip } from "../../interfaces/ship";
import { createShip } from "../../../services/ship";
import { message } from "antd";
import { useNavigate } from "react-router-dom";


const useShipMutation = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["SHIPS"],
        mutationFn: async (option: { action: string; newShip?:IShip}) => {
          switch (option.action) {
            case "add":
                try {
                    const res = await createShip(option?.newShip)
                    message.success("Thêm ship thành công");
                  navigate('/admin/ships')
                    return res;
                } catch (error) {
                    message.error("Thêm ship thất bại");
                    throw error;
                }
            case "delete":
            
              break;
            case "update":
              break;
            default:
              break;
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["SHIPS"] }); //Tu dong cap nhat lai API
        },
      });
  return mutation
}

export default useShipMutation