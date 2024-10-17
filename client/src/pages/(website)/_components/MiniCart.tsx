import { useContext, useEffect, useState } from 'react'
import MiniCartItem from './MiniCartItem';
import useCartQuery from '../../../common/hooks/carts/useCartQuery';
import { formatPrice } from '../../../common/utils/product';
import { Link } from 'react-router-dom';
import { IcartItem } from '../../../common/interfaces/cart';
import { Iattribute, Iproduct } from '../../../common/interfaces/product';
import { useDispatch, useSelector } from 'react-redux';
import { setCarts, setTotalCart, setTotalProduct } from '../../../common/redux/features/cartSlice';
import { AppContext } from '../../../common/contexts/AppContextProvider';


const MiniCart = () => {
    const {socket} = useContext(AppContext)
    const [isOpenCart, setIsOpenCart] = useState(false)
    const { data: cartUser } = useCartQuery()
    const dispath = useDispatch()
    const carts = useSelector((state: any) => state.cart.carts)
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalProduct = useSelector((state: any) => state.cart.totalProduct)
    const onMiniCart = () => {
        const miniCart = document.querySelector<HTMLElement>('.mini-cart');
        if (isOpenCart == true) {
            if (miniCart) {
                miniCart.style.right = '-100%';
                miniCart.style.opacity = '0';
            }
        }
        else {
            if (miniCart) {
                miniCart.style.right = '0';
                miniCart.style.opacity = '1';
            }
        }
        setIsOpenCart(!isOpenCart)
    }
    useEffect(() => {
        if (cartUser?.carts && cartUser.carts.length > 0) {
            const newCarts = cartUser?.carts?.map((cart: IcartItem) => {
                const attribute = cart?.productId?.attributes?.find((attribute: Iattribute) => attribute?._id == cart?.attributeId) as Iattribute
                return {
                    ...cart,
                    total: Number(attribute?.price_new * cart?.quantity)
                }
            })
            const totalProduct = newCarts.reduce((sum:number, cart:IcartItem)=> sum+ cart.quantity ,0 )
            const totalCart = newCarts.reduce((sum:number, cart:IcartItem)=> sum+ cart.total ,0 )
            dispath(setCarts(newCarts))
            dispath(setTotalProduct(totalProduct))
            dispath(setTotalCart(totalCart))
        }else{
            dispath(setCarts([]))
            dispath(setTotalProduct(0))
            dispath(setTotalCart(0))
        }

    }, [cartUser?.carts])
    useEffect(()=>{
        if(socket?.current){
            socket?.current?.on("adminUpdateProduct",(option:{newProduct:Iproduct,attributeId:string})=>{
                if(carts.length> 0){
                    const cart = carts.find((cart:IcartItem)=>( cart.productId._id === option.newProduct._id && cart.attributeId === option.attributeId)) as IcartItem
                   if(cart){
                        const attribute = option.newProduct.attributes.find((item:Iattribute)=> item._id === option.attributeId) as Iattribute
                        
                    //    const newTotal = Number(cart.quantity * attribute?.price_new )
                       const newCart = {
                        ...cart,
                        productId:option.newProduct,
                        total:Number(cart.quantity * attribute?.price_new )
                       } as IcartItem
                       const newCarts = carts.map((cart:IcartItem)=>( cart.productId._id === newCart.productId._id && cart.attributeId === newCart.attributeId) ?newCart: cart)
                       const totalCart = newCarts.reduce((sum:number, cart:IcartItem)=> sum+ cart.total ,0 )
                       dispath(setCarts(newCarts))
                       dispath(setTotalCart(totalCart))
                   }
                }
            })
        }
    },[socket?.current,carts])
    return (
        <div className="relative pr-5">
            <span onClick={onMiniCart} className="block open-mini-cart cursor-pointer text-base hover:text-gray-800 ">
                <i className="fa-solid fa-cart-shopping" />
            </span>
            <span className="absolute -top-1 right-0 flex justify-center items-center text-sm size-4 rounded-full bg-black text-white">{totalProduct}</span>
            {/* Mini cart  */}
            <div className="mini-cart fixed top-0 -right-full opacity-0 h-screen min-w-full lg:min-w-[390px] bg-white border border-gray-200 z-[15] transition-all duration-500 ease-in-out">
                <div className="flex items-center justify-between px-[15px]  pt-6 pb-5 border-b border-gray-200 mb-6 lg:px-6">
                    <h1 className="text-xl font-semibold flex items-center">Giỏ hàng
                        <span className="ml-[10px] size-6 bg-black text-white text-sm rounded-full flex justify-center items-center">{totalProduct}</span>
                    </h1>
                    <span onClick={onMiniCart} className="close-mini-cart cursor-pointer text-2xl">
                        <i className="fa-solid fa-xmark" />
                    </span>
                </div>
                <div className="px-6 h-main_mini_cart overflow-y-auto scrollbar mb-6 lg:mb-12">
                    {/* cart item  */}
                    {carts?.map((item: any) => (
                        <MiniCartItem cart={item} key={item.attributeId} />
                    ))}

                </div>
                <div >
                    <p className="text-right px-6 pb-3 mb-3 border-b border-gray-200">Tổng cộng: <span className="text-lg font-semibold text-[#0A0A0B]">{totalCart > 0 ? formatPrice(totalCart) : '0'}đ</span></p>
                    <div className="px-6">
                        <Link to='/cart' onClick={onMiniCart} className="block w-full py-4 bg-black border border-black uppercase font-semibold text-lg  text-center text-white transition duration-300 ease-in-out hover:bg-white hover:text-black ">Xem
                            giỏ hàng</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniCart