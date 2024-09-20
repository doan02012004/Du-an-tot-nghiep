import { useState } from 'react'
import MiniCartItem from './MiniCartItem';
import useCartQuery from '../../../common/hooks/carts/useCartQuery';
import { formatPrice } from '../../../common/utils/product';
import { Link } from 'react-router-dom';


const MiniCart = () => {
    const [isOpenCart, setIsOpenCart] = useState(false)
    const {data:cartUser} = useCartQuery()
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
    return (
        <div className="relative pr-5">
            <span onClick={onMiniCart} className="block open-mini-cart cursor-pointer text-base hover:text-gray-800 ">
                <i className="fa-solid fa-cart-shopping" />
            </span>
            <span className="absolute -top-1 right-0 flex justify-center items-center text-sm size-4 rounded-full bg-black text-white">{cartUser?cartUser?.totalCart:"0"}</span>
            {/* Mini cart  */}
            <div className="mini-cart fixed top-0 -right-full opacity-0 h-screen min-w-full lg:min-w-[390px] bg-white border border-gray-200 z-[15] transition-all duration-500 ease-in-out">
                <div className="flex items-center justify-between px-[15px]  pt-6 pb-5 border-b border-gray-200 mb-6 lg:px-6">
                    <h1 className="text-xl font-semibold flex items-center">Giỏ hàng
                        <span className="ml-[10px] size-6 bg-black text-white text-sm rounded-full flex justify-center items-center">{cartUser?cartUser?.totalCart:"0"}</span>
                    </h1>
                    <span onClick={onMiniCart} className="close-mini-cart cursor-pointer text-2xl">
                        <i className="fa-solid fa-xmark" />
                    </span>
                </div>
                <div className="px-6 h-main_mini_cart overflow-y-auto scrollbar mb-6 lg:mb-12">
                    {/* cart item  */}
                    {cartUser?.carts?.map((item:any)=>(
                        <MiniCartItem cart={item} key={item.attributeId}/>
                    ))}
                    
                </div>
                <div >
                    <p className="text-right px-6 pb-3 mb-3 border-b border-gray-200">Tổng cộng: <span className="text-lg font-semibold text-[#0A0A0B]">{cartUser?.totalPrice>0 ? formatPrice(cartUser?.totalPrice) : '0'}đ</span></p>
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