import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { IBrands } from '../../interfaces/brands'
import { create, deleteCate, update } from '../../../services/brands'

const useBrandMutation = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['BRANDS'],
        mutationFn: async (options: { action: string, brand: IBrands, isOther?:boolean }) => {
            switch (options.action) {
                case "add":
                    try {
                        const response = await create(options.brand)
                        message.success("Thêm thành công")
                       if(options.isOther == false || options.isOther == undefined){
                        navigate(`/admin/brands`)
                       }
                        return response.data
                    } catch (error) {   
                        return message.error("Thêm thất bại")
                    }
                    break;
                    
                case "update":
                    try {
                        const response = await update(options.brand)
                        message.success("Cập nhật thành công")
                        navigate(`/admin/brands`)
                        return response.data
                    } catch (error) {   
                        return message.error("Cập nhật thất bại")
                    }
                    break;

                case "delete":
                    try {
                        await deleteCate(options.brand)
                        message.success("Xóa thành công")
                    } catch (error) {
                        return error
                    }
                    break;

                default:
                    break;
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['BRANDS'] })
        },
    })
    return mutation
}

export default useBrandMutation