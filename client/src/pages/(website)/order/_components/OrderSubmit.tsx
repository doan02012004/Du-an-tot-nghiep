/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react"
import useOrderMutation from "../../../../common/hooks/orders/useOrderMutation"
import { Iaddress } from "../../../../common/interfaces/address"
import { Iuser } from "../../../../common/interfaces/auth"
import { IcartItem } from "../../../../common/interfaces/cart"
import { Iattribute, Igallery } from "../../../../common/interfaces/product"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { IshipSubmit, Vouchers } from "../../../../common/interfaces/orderInterfaces"
import { paymentVNPay } from "../../../../services/order"
import { useSelector } from "react-redux"
import { LoadingOutlined } from "@ant-design/icons"
import { AppContext } from "../../../../common/contexts/AppContextProvider"

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
    const { currentUser } = useContext(AppContext)
    const voucher = useSelector((state: any) => state.cart.voucher) as Vouchers;
    const [loading, setLoading] = useState(false)
    const orderMutation = useOrderMutation()
    const navigate = useNavigate()
    // const totalSubmit = useSelector((state: any) => state.cart.totalSubmit)
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
            ship: ship,
            // Thêm thông tin voucher vào đơn hàng
            voucher: {
                code: voucher?.code || null,
                discountValue: (voucher?.type === "percentage" && (Math.min(totalCart * voucher.value / 100, Number(voucher.maxDiscountValue)))) || (voucher?.type === "fixed" && (voucher?.value)) || (voucher?.type === "freeship" && (Math.min(Number(ship?.value?.price), Number(voucher?.maxDiscountValue)))) || 0,
                category: voucher?.category || null,
                type: voucher?.type || null
            },
        }
        orderMutation.mutate({ action: "create", newOrder: newOrder })

    }


    const onHandlePayment = async () => {
        setLoading(true)
        if (payment === "vnPay") {
            const totalPrice = ship?.value?.price ? totalCart + ship?.value?.price : totalCart;
            const newvoucher = {
                code: voucher?.code || null,
                discountValue: (voucher?.type === "percentage" && (Math.min(totalCart * voucher?.value / 100, Number(voucher.maxDiscountValue)))) || (voucher?.type === "fixed" && (voucher?.value)) || (voucher?.type === "freeship" && (Math.min(Number(ship?.value?.price), Number(voucher?.maxDiscountValue)))) || 0,
                category: voucher?.category || null,
                type: voucher?.type || null
            }
            try {
                const amount = totalCart + (ship?.value?.price || 0) as number;
                const response = await paymentVNPay({ amount, userId: currentUser?._id, customerInfor: { ...address }, ship: ship, totalPrice: totalPrice, totalOrder: totalProduct, voucher: newvoucher });
                if (response?.paymentUrl) {
                    setLoading(false)
                    window.location.href = response.paymentUrl;
                } else {
                    setLoading(false)
                    message.error("Không thể khởi tạo thanh toán VNPay");
                }
                // if (order?._id) {

                //     const response = await paymentVNPay(amount, 'kkjfdfjfksjadkj');
                //     if (response?.paymentUrl) {
                //         setLoading(false)
                //         window.location.href = response.paymentUrl;
                //     } else {
                //         setLoading(false)
                //         message.error("Không thể khởi tạo thanh toán VNPay");
                //     }
                // } else {
                //     setLoading(false)
                //     message.error("Không thể khởi tạo đơn hàng");
                // }

            } catch (error) {
                setLoading(false)
                message.error("Đã xảy ra lỗi khi khởi tạo thanh toán VNPay");
                console.error(error);
            }
        } else {
            setLoading(false)
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
                    className="flex items-center justify-center  bg-black text-white w-full py-3 
                    text-lg font-semibold rounded-tl-[20px] rounded-br-[20px] hover:bg-white hover:text-black hover:border hover:border-black"
                >
                    <span>Tiếp tục thanh toán</span>
                    {loading && (<LoadingOutlined className="ml-3" />)}
                </button>
            )}
        </>
    )

}

export default OrderSubmit