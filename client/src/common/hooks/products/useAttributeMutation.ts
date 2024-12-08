/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Iattribute, Igallery, InewColor, InewSize } from '../../interfaces/product'
import { message } from 'antd'
import { addColorProduct, addSizeProduct, deleteColorProduct, deleteImageGallery, deleteSizeProduct, updateProductAttribute, updateProductGallery } from '../../../services/products'
import { IColor } from '../../interfaces/Color'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContextProvider'
const useAttributeMutation = () => {
    const { socket } = useContext(AppContext)
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['PRODUCT'],
        mutationFn: async (option: { action: string, size?: string | any, color?: IColor | any, gallery?: Igallery | any, productId?: string | number | any, newSize?: InewSize | any, newColor?: InewColor | any, attribute?: Iattribute | any,dataDeleteImage?:any }) => {
            switch (option.action) {
                case 'updateGallery':
                    try {
                        await updateProductGallery(option.productId, option.gallery)
                        message.success("Cập nhật ảnh thành công")
                    } catch (error) {
                        console.log(error)
                        message.error("Cập nhật ảnh thất bại")
                    }
                    break;
                case 'updateAtb':
                    try {
                        const res = await updateProductAttribute(option.productId, option.attribute)
                        if (res?.status === 200) {
                            socket.current.emit('adminUpdatePrice', { newProduct: res?.data?.data, attributeId: option.attribute._id })
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'addSizes':
                    try {
                        await addSizeProduct(option.productId, option.newSize)
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'addColors':
                    try {
                        await addColorProduct(option.productId, option.newColor)
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'deleteSize':
                    try {
                      const data =   await deleteSizeProduct(option.productId, option.size) as {message:string,success:boolean}
                        if(data?.success == true){
                            message.success(`Xóa size ${option?.size} thành công!`);
                            socket?.current?.emit('adminDeleteSize',{productId:option.productId,size:option.size})
                           }else{
                            message.error('Xóa thất bại !')
                           }
                    } catch (error) {
                        console.log(error)
                    }
                    break;
                case 'deleteColor':
                    try {
                       const data =  await deleteColorProduct(option.productId, option.color) as {message:string,success:boolean}
                       if(data?.success == true){
                        message.success("Xóa màu sắc thành công!");
                        socket?.current?.emit('adminDeleteColor',{productId:option.productId,color:option.color})
                       }else{
                        message.error('Xóa thất bại !')
                       }
                    } catch (error) {
                        console.log(error)
                    }
                    break;

                case 'deleteImage': 
                    try {
                        const res = await deleteImageGallery(option.dataDeleteImage) as any
                        if(res?.status == 200){
                            message.success('Xóa thành công!')
                        }else{
                            message.error('Xóa thất bại')
                        }
                        return res
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

export default useAttributeMutation