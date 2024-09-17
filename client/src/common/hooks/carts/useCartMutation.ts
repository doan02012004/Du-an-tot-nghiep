import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InewCart } from '../../interfaces/cart'
import { addToCart } from '../../../services/cart'
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
                        const data = await addToCart({ userId: currentUser?._id, newCart: options.cart })
                        message.success("Thêm sản phẩm vào giỏ hàng thành công")
                        return data
                    } catch (error) {
                        return error
                    }
                    break;
                // case "update":
                //     try {
                //         // Call API to update cart
                //         return options.cart
                //     } catch (error) {
                //         return error
                //     }
                //     break;
                // case "delete":
                //     try {
                //         // Call API to delete cart
                //         return options.cart
                //     } catch (error) {
                //         return error
                //     }
                //     break;
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