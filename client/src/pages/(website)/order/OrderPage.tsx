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
import { useDispatch, useSelector } from "react-redux"
import { IcartItem } from "../../../common/interfaces/cart"
import { IshipItem } from "../../../common/interfaces/orderInterfaces"
import { setTotalCart } from "../../../common/redux/features/cartSlice"

const shipOption = [
    {
        minWeight: 0,
        maxWeight: 500,
        price: 3000
    },
    {
        minWeight: 501,
        maxWeight: 2000,
        price: 8000
    },
    {
        minWeight: 2001,
        maxWeight: 5000,
        price: 15000
    }
]


const OrderPage = () => {
    const [ship, setShip] = useState<IshipItem | null>(null)
    const [payment, setPayment] = useState<"cash" | "atm" | "momo" | "credit">('cash')
    const { currentUser } = useContext(AppContext)
    const [addressDefault, setAddressDefault] = useState<Iaddress | null>(null)
    const addressQuery = useAddressQuery()
    const navigate = useNavigate()
    const carts = useSelector((state: any) => state.cart.carts)
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalProduct = useSelector((state: any) => state.cart.totalProduct)
    const dispath = useDispatch()
    

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

    useEffect(() => {
        if (carts.length > 0) {
            const sumWeight = carts.reduce((sum: number, cart: IcartItem) => sum + cart.weight, 0)
            const findShip = shipOption.find((shipLV: IshipItem) => shipLV.minWeight <= sumWeight && shipLV.maxWeight >= sumWeight) as IshipItem
            if(findShip){
                dispath(setTotalCart(totalCart + findShip.price))
            }
            setShip(findShip)
        }
    }, [carts])


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
                        <OrderTotal totalCart={totalCart} ship={ship} />

                        <OrderSubmit user={currentUser} payment={payment} address={addressDefault} carts={carts} totalCart={totalCart} totalProduct={totalProduct} ship={ship} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderPage