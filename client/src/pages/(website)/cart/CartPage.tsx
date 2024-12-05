/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from 'react-router-dom'
import Status from './_components/Status'
import Table from './_components/Table'
import Total from './_components/Total'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../../common/contexts/AppContextProvider'
import { IcartItem } from '../../../common/interfaces/cart'
import { Iattribute, Iproduct } from '../../../common/interfaces/product'
import { setCarts, setCheckCarts, setTotalCart } from '../../../common/redux/features/cartSlice'
const CartPage = () => {
    const { socket } = useContext(AppContext)
    const dispath = useDispatch()
    const checkCarts = useSelector((state: any) => state.cart.checkCarts)
    const carts = useSelector((state: any) => state.cart.carts)
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalProduct = useSelector((state: any) => state.cart.totalProduct)
    const navigate = useNavigate()

    //real-time update product
    useEffect(() => {
        if (socket?.current) {
            socket?.current?.on("adminUpdateProduct", (option: { newProduct: Iproduct, attributeId: string }) => {
                if (carts.length > 0) {
                    if(option?.attributeId){
                        const cart = carts.find((cart: IcartItem) => (cart.productId._id === option.newProduct._id && cart.attributeId === option.attributeId)) as IcartItem
                        if(cart){
                            const attribute = option.newProduct.attributes.find((item: Iattribute) => item._id === option.attributeId) as Iattribute

                            //    const newTotal = Number(cart.quantity * attribute?.price_new )
                            const newCart = {
                                ...cart,
                                productId: option.newProduct,
                                total: Number(cart.quantity * attribute?.price_new)
                            } as IcartItem
                            const newCarts = carts.map((cart: IcartItem) => (cart.productId._id === newCart.productId._id && cart.attributeId === newCart.attributeId) ? newCart : cart)
                            const totalCart = newCarts.reduce((sum: number, cart: IcartItem) => sum + cart.total, 0)
                            dispath(setCarts(newCarts))
                            dispath(setTotalCart(totalCart))
                        }
                    }else{
                            const newCarts = carts.map((cart: IcartItem) => (cart.productId._id === option.newProduct._id) ? {...cart,productId:option.newProduct} : cart)
                            console.log(newCarts)
                            const totalCart = newCarts.reduce((sum: number, cart: IcartItem) => sum + cart.total, 0)
                            dispath(setCarts(newCarts))
                            dispath(setTotalCart(totalCart))
                           
                           
                        
                    }
                }
            })
        }
    }, [socket?.current, carts])
    useEffect(() => {
        if (carts.length > 0) {
            const check = carts.some((item: IcartItem) => item?.productId?.active == false)
            const checkProduct = carts.some((item: IcartItem) => item?.productId == null)
            const cartAtb = carts.map((item:IcartItem) => {
                const findAtb = item?.productId?.attributes.find((atb:Iattribute) => atb?._id == item?.attributeId)
                return findAtb
            })
            const checkAtb = cartAtb.some((item: Iattribute) => item?.active == false)
            const checkInstock = cartAtb.some((item: Iattribute) => item?.instock == 0)
            if(check || checkAtb || checkInstock||checkProduct){
                if(checkCarts == true){
                    dispath(setCheckCarts(false))
                }
            }else{
                if(checkCarts == false){
                    dispath(setCheckCarts(true))
                }
            }
        }else{
            if(checkCarts == true){
                dispath(setCheckCarts(false))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts,checkCarts])
    const onHandleCheckToOrder = () => {
        if (!carts || carts?.length == 0) {
            return message.error("Hiện tại chưa có sản phẩm nào")
        }
        else {
            return navigate("/order")
        }
    }
    return (
        <section>
            <div>
                <div className="container pb-4 mx-auto lg:flex pt-11 lg:gap-10">
                    <div className="lg:w-[68%]">
                        <Status />
                        <div className="flex items-center gap-2 py-6 lg:py-11">
                            <span className="text-sm lg:text-2xl text-[#000000] font-bold">Giỏ hàng của bạn</span>
                            <span className="text-sm font-bold lg:text-2xl text-red">{totalProduct} Sản Phẩm</span>
                        </div>
                        <Table carts={carts} setCheckCarts={setCheckCarts} />
                        <div className="py-6 lg:pt-7">
                            <a href="/product" className="w-[60%] flex items-center border border-black lg:w-[30%] py-3 justify-center gap-2 rounded-tl-[20px] rounded-br-[20px] hover:bg-black hover:text-white">
                                <span><i className="fa-solid fa-arrow-left-long" /></span>
                                <button>Tiếp tục mua hàng</button>
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-[32%]">
                        <Total totalProduct={totalProduct} totalCart={totalCart} />
                        <button disabled={!checkCarts} onClick={onHandleCheckToOrder} className={`${!checkCarts?'bg-gray-300 text-white':'bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black'} w-full py-3 text-lg font-semibold rounded-tl-[20px] rounded-br-[20px] `}>ĐẶT HÀNG</button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CartPage