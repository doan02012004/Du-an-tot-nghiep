import { useEffect } from "react"
import useOrderMutation from "../../../../common/hooks/orders/useOrderMutation"
import { Iaddress } from "../../../../common/interfaces/address"
import { Iuser } from "../../../../common/interfaces/auth"
import { IcartItem } from "../../../../common/interfaces/cart"
import { Iattribute, Igallery } from "../../../../common/interfaces/product"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { IshipSubmit } from "../../../../common/interfaces/orderInterfaces"
import { paymentVNPay } from "../../../../services/order"
import { useSelector } from "react-redux"

type Props = {
    payment: "cash" | "atm" | "vnPay" | "credit",
    address: Iaddress | null,
    user: Iuser,
    carts: IcartItem[],
    totalCart: number,
    totalProduct: number,
    ship: IshipSubmit | null
}

const OrderSubmit = ({ payment, address, user, totalProduct, totalCart, carts, ship }: Props) => {
    const orderMutation = useOrderMutation()
    const navigate = useNavigate()
    const totalSubmit = useSelector((state: any) => state.cart.totalSubmit)
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
                ...address
            },
            items: [...newProductsOrder],
            paymentMethod: payment,
            status: "pending",
            totalOrder: totalProduct,
            totalPrice: ship?.value?.price ? totalCart + ship?.value?.price : totalCart,
            ship: ship
        }
        orderMutation.mutate({ action: "create", newOrder: newOrder })

    }


    const onHandlePayment = async () => {
        if (payment === "vnPay") {
            try {
                const amount = totalCart + (ship?.value?.price || 0);
                const orderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
                const response = await paymentVNPay(amount, orderId);
                if (response?.paymentUrl) {
                    window.location.href = response.paymentUrl;
                } else {
                    message.error("Không thể khởi tạo thanh toán VNPay");
                }
            } catch (error) {
                message.error("Đã xảy ra lỗi khi khởi tạo thanh toán VNPay");
                console.error(error);
            }
        } else {
            message.warning("Hình thức thanh toán chưa được hỗ trợ");
        }
    }

    return (
        <>
            {payment === "cash" ? (
                <button
                    onClick={onHandleOrder}
                    className="bg-black text-white w-full py-3 
                    text-lg font-semibold rounded-tl-[20px] rounded-br-[20px] hover:bg-white hover:text-black hover:border hover:border-black"
                >
                    HOÀN THÀNH
                </button>
            ) : (


                <button
                    onClick={onHandlePayment}
                    className="bg-black text-white w-full py-3 
                    text-lg font-semibold rounded-tl-[20px] rounded-br-[20px] hover:bg-white hover:text-black hover:border hover:border-black"
                >
                    Tiếp tục thanh toán
                </button>
            )}
        </>
    )

}

export default OrderSubmit