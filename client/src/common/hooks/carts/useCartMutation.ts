import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InewCart } from '../../interfaces/cart'
import { addToCart, decreaseProductCartQuantity, increaseProductCartQuantity, onInputProductCartQuantity } from '../../../services/cart'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContextProvider'
import { message } from 'antd'

const useCartMutation = () => {
    const { currentUser } = useContext(AppContext)
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationKey: ['CARTS'],
        mutationFn: async (options: { action: string, cart: InewCart }) => {
            switch (options.action) {
                case "addtocart":
                    try {
                        const data = await addToCart({ userId: currentUser?._id, ...options.cart })
                        message.success("Thêm sản phẩm vào giỏ hàng thành công")
                        return data
                    } catch (error) {
                        return error
                    }
                    break;
<<<<<<< HEAD
=======

>>>>>>> 7a0cefbdd60da1382cdbb05f539f71707cb3b1cf
                case "increase":
                    try {
                        const data = await increaseProductCartQuantity({ userId: currentUser?._id, ...options.cart })
                        message.success("Tăng số lượng thành công")
                        return data
                    } catch (error) {
                        return error
                    }
                    break;
                case "decrease":
                    try {
                        const data = await decreaseProductCartQuantity({ userId: currentUser?._id, ...options.cart })
                        message.success("Giảm số lượng thành công")
                        return data
                    } catch (error) {
                        return error
                    }
                    break;
                case "oninput":
                    try {
                        const data = await onInputProductCartQuantity({ userId: currentUser?._id, ...options.cart })
                        message.success("Cập nhật số lượng thành công")
                        return data
                    } catch (error) {
                        return error
                    }
                    break;
                default:
                    break;
            }
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['CARTS'] })
        },
    })
    return mutation
}

export default useCartMutation