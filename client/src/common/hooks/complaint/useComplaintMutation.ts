import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { createComplaint, updateComplaintStatus } from "../../../services/complaint";
import { IComplaint } from "../../interfaces/complaint";
import { IComplaintUpdate } from './../../interfaces/complaint';

const useComplaintMutation = () =>{
    // const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey:["COMPLAINT"],
        mutationFn: async (options: { action: string; complaintData: any }) => {

            switch (options.action) {
                case "add":
                    try {
                        const data = await createComplaint(options.complaintData as IComplaint)
                        message.success("Đơn khiếu nại của bạn đã được gửi")
                        return data
                    } catch (error) {
                        return message.error("Khiếu nại thất bại")
                    }
                case "update":
                    try {
                        const data = await updateComplaintStatus(options.complaintData as IComplaintUpdate)
                        message.success("Đơn khiếu nại của bạn đã được cập nhật")
                        return data
                    } catch (error) {
                        return message.error("Cập nhật thất bại")
                    }
                default:
                    break;
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['COMPLAINT'] })
        },
    })
    return mutation
}
export default useComplaintMutation