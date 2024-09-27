import { useEffect } from "react"
import useOrderMutation from "../../../../common/hooks/orders/useOrderMutation"
import { Iaddress } from "../../../../common/interfaces/address"
import { Iuser } from "../../../../common/interfaces/auth"
import { ICart, IcartItem } from "../../../../common/interfaces/cart"
import { Iattribute, Igallery } from "../../../../common/interfaces/product"
import { message } from "antd"
import { useNavigate } from "react-router-dom"

type Props ={
    payment:"cash"|"atm"|"momo"|"credit",
    address:Iaddress | null,
    cartUser:ICart,
    user:Iuser
}

const OrderSubmit = ({payment,address,cartUser,user}:Props) => {
    const orderMutation = useOrderMutation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(orderMutation?.data?.response?.status === 500){
          return message.error("Lỗi thanh toán")

        }
        if(orderMutation?.data?.userId){
            return navigate('/thanks')
  
          }
    },[orderMutation?.data])
    const onHandleOrder = async() =>{
        const newProductsOrder = await cartUser?.carts.map((item:IcartItem)=>{
            const gallery = item.productId.gallerys.find((gallery:Igallery)=> gallery._id == item.galleryId )
            const attribute = item.productId.attributes.find((attribute:Iattribute)=> attribute._id == item.attributeId )
            return {
                productId:item.productId._id,
                name:item.productId.name,
                categoryId: item.productId.categoryId,
                price:item.productId.price_new,
                gallery,
                attribute,
                total:item.total,
                quantity:item.quantity
            }
        })
        const newOrder = {
            userId: user?._id,
            customerInfor:{
                ...address
            },
            items:[...newProductsOrder],
            paymentMethod: payment,
            status:"pending",
            totalOrder: cartUser?.totalCart,
            totalPrice: cartUser?.totalPrice
        }
        orderMutation.mutate({action:"create",newOrder:newOrder})
       
    }
    return (
        <button onClick={onHandleOrder} className="bg-black text-white w-full py-3 text-lg font-semibold rounded-tl-[20px] rounded-br-[20px] hover:bg-white hover:text-black hover:border hover:border-black">HOÀN
            THÀNH
        </button>
    )
}

export default OrderSubmit