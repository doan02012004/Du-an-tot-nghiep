/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iproduct, IproductInfor } from '../../interfaces/product'
import { message } from 'antd'
import { addItemsGallery, addProduct, deleteProduct, updateProductInfor } from '../../../services/products'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContextProvider'


const useProductMutation = () => {
    const {socket} = useContext(AppContext)
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['PRODUCT'],
        mutationFn: async (option: { action: string, product?: Iproduct, productInfor?: IproductInfor,optionGallery?:any }) => {
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
                    case 'addImage':
                        try {
                            await addItemsGallery(option.optionGallery)
                        } catch (error) {
                            console.log(error)
                            message.error("Thêm ảnh thất bại")
                        }
                        break;
                case 'delete':
                    try {
                       const data = await deleteProduct(option.product?._id)
                       if(data?.message && data?.message =='ok'){
                        if(socket.current){
                            socket.current.emit('adminDeleteProduct',{productId:option.product?._id})
                           }
                       }
                        message.success("Xoá sản phẩm thành công")
                    } catch (error) {
                        console.log(error)
                        message.error("Xoá sản phẩm thất bại")
                    }
                    break;
                case 'updateInfor':
                    try {
                        const data = await updateProductInfor(option.productInfor) as Iproduct
                        if (data?.slug) {
                           if(socket.current){
                            socket.current.emit('adminUpdateInforProduct',{newProduct:data})
                           }
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                default:
                    break;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['PRODUCT'] })
        }
    })
    return mutation
}

export default useProductMutation