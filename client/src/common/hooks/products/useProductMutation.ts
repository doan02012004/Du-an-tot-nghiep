import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iproduct } from '../../interfaces/product'
import { message } from 'antd'
import { addProduct } from '../../../services/products'
import { useNavigate } from 'react-router-dom'

const useProductMutation = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey:['PRODUCT'],
        mutationFn: async(option:{action:string,product:Iproduct}) =>{
            switch (option.action) {
                case 'add':
                    try {
                        await addProduct(option.product)
                        message.success("Thêm sản phẩm thành công")
                        localStorage.removeItem('product')
                        localStorage.removeItem('gallerys')
                        localStorage.removeItem('attributes')
                        localStorage.removeItem('sizes')
                        localStorage.removeItem('colors')
                        navigate('/admin/products')
                    } catch (error) {
                        console.log(error)
                        message.error("Thêm sản phẩm thất bại")
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