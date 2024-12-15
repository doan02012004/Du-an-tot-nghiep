/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { IshipSubmit } from "../../../common/interfaces/orderInterfaces"
import FormAddress from "../my-information/address/_components/FormAddress"
import { PlusCircleFilled } from "@ant-design/icons"
import ProductDisplay from "./_components/ProductDisplay"
import { IcartItem } from "../../../common/interfaces/cart"
import { Iattribute } from "../../../common/interfaces/product"
import { setCheckCarts } from "../../../common/redux/features/cartSlice"
import useCartQuery from "../../../common/hooks/carts/useCartQuery"


const OrderPage = () => {
    // const [ship, setShip] = useState<IshipItem | null>(null)
    const { socket } = useContext(AppContext)
    const [shippingCost, setShippingCost] = useState<IshipSubmit | null>(null);
    const [payment, setPayment] = useState<"cash" | "atm" | "vnPay" | "credit">('cash')
    const [productDisplay, setProductDisplay] = useState(false)
    const { currentUser } = useContext(AppContext)
    const [addressDefault, setAddressDefault] = useState<Iaddress | any>(null)
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [vouchers, setVouchers] = useState<IVoucher[]>([])
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalProduct = useSelector((state: any) => state.cart.totalProduct)
    const checkCarts = useSelector((state: any) => state.cart.checkCarts)
    const addressQuery = useAddressQuery()
    const voucherQuery = useVoucherQuery({})
    const { data: cartUser } = useCartQuery()
    const navigate = useNavigate()
    const dispath = useDispatch()
    const carts = useSelector((state: any) => state.cart.carts)
    useEffect(()=>{
        if (socket?.current) {
            socket?.current.on('deleteVoucher',(data:any)=>{
                if (voucherQuery.data && voucherQuery.data.length > 0) {
                    if (data?._id) {
                        const vouchers = voucherQuery.data?.find((voucher:IVoucher)=>voucher?._id===data?._id)
                        if (vouchers) {
                            const newVouchers =voucherQuery.data?.filter((voucher: IVoucher) => voucher._id !== data._id);
                            setVouchers(newVouchers)
                        }
                    }
                }
            })
        }
    },[socket?.current,vouchers,voucherQuery.data])
    useEffect(()=>{
        if (socket?.current) {
            socket?.current.on('updateVoucher',(data:any)=>{
                if (voucherQuery.data && voucherQuery.data.length > 0) {
                    const updatedVouchers = voucherQuery.data.map((voucher:IVoucher) => 
                        voucher._id === data._id ? data : voucher
                    );
                    setVouchers(updatedVouchers)
                }
            })
        }
    },[socket?.current,vouchers,voucherQuery.data])
    useEffect(() => {
        if (cartUser) {
            if (cartUser?.carts?.length == 0) {
                navigate('/cart')
            }
        }
    }, [cartUser])
    useEffect(() => {
        if (voucherQuery.data && voucherQuery.data.length > 0) {
            setVouchers(voucherQuery.data)
        }
    }, [voucherQuery.data])
    useEffect(() => {
        if (addressQuery?.data && addressQuery?.data?.length > 0) {
            const findAddressDefault = addressQuery?.data?.find((item: Iaddress) => item.isDefault == true)
            if(findAddressDefault){
                setAddressDefault(findAddressDefault)
            }else{
                setAddressDefault(() =>{
                    if(addressQuery?.data){
                        if(addressQuery?.data?.length > 0){
                            return addressQuery?.data[0]
                        }else{
                            return null
                        }
                    }else{
                        return null
                    }
                })
            }
        }
    }, [addressQuery?.data])

    useEffect(() => {
        if (carts.length > 0) {
            const check = carts.some((item: IcartItem) => item?.productId?.active == false)
            const checkProduct = carts.some((item: IcartItem) => item?.productId == null)
            const cartAtb = carts.map((item:IcartItem) => {
                const findAtb = item?.productId?.attributes.find((atb:Iattribute) => atb?._id == item?.attributeId)
                return findAtb
            })
            const checkQuantity = carts.some((item:IcartItem) => {
                const findAtb = item?.productId?.attributes.find((atb:Iattribute) => atb?._id == item?.attributeId)
                if(findAtb){
                    if(findAtb.instock < item.quantity){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return true
                }
            })
            const checkAtb = cartAtb.some((item: Iattribute) => item?.active == false)
            const checkInstock = cartAtb.some((item: Iattribute) => item?.instock == 0)
            if(check || checkAtb || checkInstock||checkProduct|checkQuantity){
                if(checkCarts == true){
                    dispath(setCheckCarts(false))
                }
                navigate('/cart')
            } else {
                if (checkCarts == false) {
                    dispath(setCheckCarts(true))
                }
            }
        }else{
            if(checkCarts == true){
                dispath(setCheckCarts(false))
                navigate('/cart')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts, checkCarts])


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
                                    {/* {!currentUser && (
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

                                    )} */}

                                    {
                                        addressDefault && (
                                            <OrderAddressItem address={addressDefault} listAddress={addressQuery.data} />
                                        )
                                    }

                                    <button onClick={() => { setIsOpenForm(true) }} className="rounded-tl-[20px] rounded-br-[20px] px-6 py-4  border text-white bg-dark hover:text-black hover:bg-white font-medium"><PlusCircleFilled /> Thêm địa chỉ </button>
                                    {isOpenForm && (
                                        <FormAddress setIsOpenForm={setIsOpenForm} />
                                    )}
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
                                    <button className="text-sm lg:text-lg text-white group-hover:text-black" onClick={() => setProductDisplay(!productDisplay)}>{productDisplay ? "ẨN SẢN PHẨM" : "HIỂN THỊ SẢN PHẨM"}</button>
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