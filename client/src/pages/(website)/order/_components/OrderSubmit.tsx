import { useEffect } from "react"
import useOrderMutation from "../../../../common/hooks/orders/useOrderMutation"
import { Iaddress } from "../../../../common/interfaces/address"
import { Iuser } from "../../../../common/interfaces/auth"
import { IcartItem } from "../../../../common/interfaces/cart"
import { Iattribute, Igallery } from "../../../../common/interfaces/product"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { IshipSubmit, Vouchers } from "../../../../common/interfaces/orderInterfaces"
import { useSelector } from "react-redux"

type Props = {
    payment: "cash" | "atm" | "momo" | "credit",
    address: Iaddress | null,
    user: Iuser,
    carts: IcartItem[],
    totalCart: number,
    totalProduct: number,
    ship: IshipSubmit | null
}

const OrderSubmit = ({ payment, address, user, totalProduct, totalCart, carts, ship }: Props) => {
    const voucher = useSelector((state: any) => state.cart.voucher) as Vouchers;
    const orderMutation = useOrderMutation()
    const navigate = useNavigate()
    console.log(voucher)
    useEffect(() => {
        if (orderMutation?.data?.response?.status === 500) {
            return message.error("Lỗi thanh toán")

        }
        if (orderMutation?.data?.userId) {
            return navigate('/thanks')

        }
    }, [orderMutation?.data])

    const onHandleOrder = async () => {
        const newProductsOrder = await carts.map((item: IcartItem) => {
            const gallery = item.productId.gallerys.find((gallery: Igallery) => gallery._id == item.galleryId)
            const attribute = item.productId.attributes.find((attribute: Iattribute) => attribute._id == item.attributeId)
            return {
                productId: item.productId._id,
                name: item.productId.name,
                categoryId: item.productId.categoryId,
                price: attribute?.price_new,
                gallery,
                attribute,
                total: item.total,
                quantity: item.quantity
            }
            
        })
        const newOrder = {
            userId: user?._id,
            customerInfor: {
                ...address,
            },
            items: [...newProductsOrder],
            paymentMethod: payment,
            status: "pending",
            totalOrder: totalProduct,
            totalPrice: ship?.value?.price ? totalCart + ship?.value?.price : totalCart,
            ship: ship,
            // Thêm thông tin voucher vào đơn hàng
            voucher: {
                code: voucher?.code || null,
                discountValue: (voucher?.type === "percentage" && (Math.min(totalCart * voucher.value / 100, Number(voucher.maxDiscountValue) ))) || (voucher?.type === "fixed" && (voucher?.value )) || (voucher?.type === "freeship" && (Math.min(Number(ship?.value?.price), Number(voucher?.maxDiscountValue) )))  || 0,
                category: voucher?.category || null,
                type: voucher?.type || null
            },
        };

        orderMutation.mutate({ action: "create", newOrder: newOrder });

    }
    return (
        <button onClick={onHandleOrder} className="bg-black text-white w-full py-3 text-lg font-semibold rounded-tl-[20px] rounded-br-[20px] hover:bg-white hover:text-black hover:border hover:border-black">HOÀN
            THÀNH
        </button>
    )
}

export default OrderSubmit