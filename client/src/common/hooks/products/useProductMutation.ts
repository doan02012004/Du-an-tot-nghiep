import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iproduct, IproductInfor } from '../../interfaces/product'
import { message } from 'antd'
import { addProduct, deleteProduct, updateProductInfor } from '../../../services/products'
import { useNavigate } from 'react-router-dom'

const useProductMutation = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey:['PRODUCT'],
        mutationFn: async(option:{action:string,product?:Iproduct,productInfor?:IproductInfor}) =>{
            switch (option.action) {
                case 'add':
                    try {
                        await addProduct(option.product)
                        message.success("Thêm sản phẩm thành công")
                        navigate('/admin/products')
                    } catch (error) {
                        console.log(error)
                        message.error("Thêm sản phẩm thất bại")
                    }
                    break;
                    case 'delete':
                    try {
                        await deleteProduct(option.product?._id)
                        message.success("Xoá sản phẩm thành công")
                        navigate('/admin/products')
                    } catch (error) {
                        console.log(error)
                        message.error("Xoá sản phẩm thất bại")
                    }
                    break;
                case 'updateInfor':
                    try {
                       const data = await updateProductInfor(option.productInfor) as Iproduct
                       if(data?.slug){
                        navigate(`/admin/products/view/${data?.slug}`)
                       }
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                default:
                    break;
            }
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['PRODUCT']})
        }
    })
  return mutation
}

export default useProductMutation