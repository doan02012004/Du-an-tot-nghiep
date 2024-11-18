/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../../common/contexts/AppContextProvider"
import useAddressQuery from "../../../common/hooks/address/useAddressQuery"
import { Iaddress } from "../../../common/interfaces/address"
import OrderAddressItem from "./_components/OrderAddressItem"
import OrderFormAddress from "./_components/OrderFormAddress"
import OrderPaymentMethod from "./_components/OrderPaymentMethod"
import OrderSubmit from "./_components/OrderSubmit"
import OrderStep from "./_components/OrderStep"
import useVoucherQuery from "../../../common/hooks/voucher/useVoucherQuery"
import { IVoucher } from "../../../common/interfaces/voucher"
import OrderTotal from "./_components/OrderTotal"
import OrderOptionShip from "./_components/OrderOptionShip"
import { IshipItem, IshipSubmit } from "../../../common/interfaces/orderInterfaces"
import ProductDisplay from "./_components/ProductDisplay"


const OrderPage = () => {
    // const [ship, setShip] = useState<IshipItem | null>(null)
    const [shippingCost, setShippingCost] = useState<IshipSubmit | null>(null);
    const [payment, setPayment] = useState<"cash" | "atm" | "momo" | "credit">('cash')
    const [productDisplay,setProductDisplay]= useState(false)
    const { currentUser } = useContext(AppContext)
    const [addressDefault, setAddressDefault] = useState<Iaddress | null>(null)
    const [vouchers,setVouchers] = useState<IVoucher[]>([])
    const addressQuery = useAddressQuery()
    const voucherQuery = useVoucherQuery({})
    const navigate = useNavigate()
    const carts = useSelector((state: any) => state.cart.carts)
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalProduct = useSelector((state: any) => state.cart.totalProduct)
    useEffect(()=>{
        if (carts.length == 0) {
            navigate('/cart')
        }
    },[carts])
    useEffect(()=>{
        if (voucherQuery.data && voucherQuery.data.length >0) {
            setVouchers(voucherQuery.data)
        }
    },[voucherQuery.data])
    
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


    const handleShippingCostChange = (ship: IshipSubmit) => {
        setShippingCost(ship);
    };
    

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
                            {/* phương thức giao hàng  */}
                            <OrderOptionShip onShippingCostChange={handleShippingCostChange} />
                            <OrderPaymentMethod setPayment={setPayment} payment={payment} />
                            <div className="py-7">
                                <div className="w-[60%] flex group items-center border border-black lg:w-[35%] py-3 justify-center gap-2 rounded-tl-[20px] rounded-br-[20px] hover:bg-white bg-black">
                                    <button className="text-sm lg:text-lg text-white group-hover:text-black" onClick={()=>setProductDisplay(!productDisplay)}>{productDisplay ? "ẨN SẢN PHẨM" : "HIỂN THỊ SẢN PHẨM"}</button>
                                </div>
                            </div>
                            {productDisplay && <ProductDisplay cart={carts} />}
                        </div>
                    </div>
                    <div className="lg:w-[32%]">
                        <OrderTotal totalCart={totalCart} vouchers={vouchers} shippingCost={shippingCost} carts={carts} />
                        <OrderSubmit user={currentUser} payment={payment} address={addressDefault} carts={carts} totalCart={totalCart} totalProduct={totalProduct} ship={shippingCost} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderPage