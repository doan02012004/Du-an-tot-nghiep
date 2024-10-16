/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"

import OrderAddressItem from "./_components/OrderAddressItem"
import useAddressQuery from "../../../common/hooks/address/useAddressQuery"
import { Iaddress } from "../../../common/interfaces/address"
import OrderFormAddress from "./_components/OrderFormAddress"
import { AppContext } from "../../../common/contexts/AppContextProvider"
import OrderTotal from "./_components/OrderTotal"
import OrderPaymentMethod from "./_components/OrderPaymentMethod"
import OrderSubmit from "./_components/OrderSubmit"
import OrderStep from "./_components/OrderStep"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const OrderPage = () => {
    const [payment, setPayment] = useState<"cash" | "atm" | "momo" | "credit">('cash')
    const { currentUser } = useContext(AppContext)
    const [addressDefault, setAddressDefault] = useState<Iaddress | null>(null)
    const addressQuery = useAddressQuery()
    const navigate = useNavigate()
    const carts = useSelector((state: any) => state.cart.carts)
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalProduct = useSelector((state: any) => state.cart.totalProduct)
    useEffect(() => {
        if (addressQuery?.data && addressQuery?.data?.length > 0) {
            const findAddressDefault = addressQuery?.data?.find((item: Iaddress) => item.isDefault == true)
            setAddressDefault(findAddressDefault)
        }
    }, [addressQuery?.data])
    useEffect(() => {
        if (carts.lenght == 0) {
            return navigate("/cart")
        }
        if (!currentUser) {
            return navigate("/signin")
        }
    }, [carts, currentUser])
    return (
        <section>
            <div>
                <div className="container mx-auto lg:flex pt-11 pb-4 gap-10">
                    <div className="lg:w-[68%]">
                        <div className=''>
                            <OrderStep />
                            <div className=''>
                                <div className="pb-4">
                                    <span className="text-lg lg:text-xl text-black font-semibold">Địa chỉ giao hàng</span>
                                    {!currentUser && (
                                        <>
                                            <div className="py-4 flex items-center gap-5">
                                                <button className="py-3 bg-black w-48 lg:py-4 rounded-tl-[20px] rounded-br-[20px] font-semibold text-white hover:bg-white hover:text-black hover:border hover:border-black">ĐĂNG
                                                    NHẬP</button>
                                                <button className="py-3 bg-white w-48 lg:py-4 rounded-tl-[20px] rounded-br-[20px] font-semibold text-black border-black border hover:bg-black hover:text-white">ĐĂNG
                                                    KÝ</button>
                                            </div>
                                            <span className="text-xs lg:text-sm">Đăng nhập/ Đăng ký tài khoản để được tích điểm và nhận thêm nhiều ưu
                                                đãi từ IVY
                                                moda.</span>
                                        </>

                                    )}

                                    {
                                        addressDefault && (
                                            <OrderAddressItem address={addressDefault} />
                                        )
                                    }
                                </div>
                                {!currentUser && (
                                    <OrderFormAddress />
                                )}
                            </div>
                            {/*  */}
                            <div className="py-6">
                                <span className="text-lg lg:text-xl text-black font-semibold">Phương thức giao hàng</span>
                                <div className="my-4 border rounded-tl-[30px] rounded-br-[30px]">
                                    <div className="px-5 py-6 flex items-center gap-2 lg:py-8 lg:px-10">
                                        <span className="size-3 text-[10px] bg-black rounded-full text-white lg:size-4 flex justify-center items-center lg:text-[12px]"><i className="fa-solid fa-check " /></span>
                                        <p className="text-sm text-black font-semibold">Chuyển phát nhanh</p>
                                    </div>
                                </div>
                            </div>
                            <OrderPaymentMethod setPayment={setPayment} payment={payment} />
                            <div className="py-7">
                                <div className="w-[60%] flex group items-center border border-black lg:w-[35%] py-3 justify-center gap-2 rounded-tl-[20px] rounded-br-[20px] hover:bg-white bg-black">
                                    <button className="text-sm lg:text-lg text-white group-hover:text-black">HIỂN THỊ SẢN PHẨM</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[32%]">
                        <OrderTotal totalCart={totalCart} />

                        <OrderSubmit user={currentUser} payment={payment} address={addressDefault} carts={carts} totalCart={totalCart} totalProduct={totalProduct} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderPage