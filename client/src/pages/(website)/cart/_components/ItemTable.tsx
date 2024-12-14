/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import { formatPrice } from '../../../../common/utils/product'
import { Iattribute, Igallery } from '../../../../common/interfaces/product'
import useCartMutation from '../../../../common/hooks/carts/useCartMutation'
import { IcartItem } from '../../../../common/interfaces/cart'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { ArrowDownOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons'
import { setCheckCarts } from '../../../../common/redux/features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
type Props = {
    cart: IcartItem,
    setCheckCarts: any
}

const ItemTable = ({ cart }: Props) => {
    const [attribute, setAttribute] = useState<Iattribute | null>(null)
    const [gallery, setGallery] = useState<Igallery | null>(null)
    const checkCarts = useSelector((state: any) => state.cart.checkCarts)
    const inputRef = useRef<any>(null)
    const dispath = useDispatch()
    const cartMutation = useCartMutation()
    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.value = cart?.quantity
        }
    }, [cart?.quantity, inputRef])
    useEffect(() => {
        const findAttribute = cart?.productId?.attributes?.find((item: Iattribute) => item?._id == cart?.attributeId)
        if (findAttribute) {
            setAttribute(findAttribute)
        }
    }, [cart?.attributeId, cart?.total, cart?.productId?.attributes])
    useEffect(() => {
        const findGallery = cart?.productId?.gallerys?.find((item: Igallery) => item._id == cart?.galleryId)
        if (findGallery) {
            setGallery(findGallery)
        }
    }, [cart?.galleryId])
    useEffect(() => {
        if (attribute) {
            if (attribute.active == false) {
                if (checkCarts !== false) {
                    dispath(setCheckCarts(false))
                }
            } else {
                if (checkCarts !== true) {
                    dispath(setCheckCarts(true))
                }
            }
        } else {
            if (checkCarts !== false) {
                dispath(setCheckCarts(false))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attribute])

    const textErrorCart = (option:{attribute:any,cart:IcartItem}) =>{
        if(!option?.attribute || option?.attribute?.active == false || option?.attribute?.instock == 0 || option?.cart?.productId?.active == false){
            return 'Hết sản phẩm'
        }else if( option?.attribute?.instock < option?.cart?.quantity){
            return 'Số lượng vượt quá kho hàng'
        }else{
            return 'Hết sản phẩm'
        }
    }
    const quantityErrorCart = (option:{attribute:any,cart:IcartItem}) =>{
        if(!option?.attribute || option?.attribute.instock == 0 || !option?.attribute.active || !option?.cart?.productId?.active){
            return true
        }else{
            return false
        }
    }
    const increaseQuantity = () => {
        if (attribute && Number(inputRef.current.value) + 1 > attribute?.instock) return message.error("Đã đạt số lượng tối đa")
        const newCart = {
            productId: cart.productId._id as string,
            attributeId: cart.attributeId as string,
        }
        cartMutation.mutate({ action: "increase", cart: newCart })
    }
    const decreaseQuantity = () => {
        const newCart = {
            productId: cart.productId._id as string,
            attributeId: cart.attributeId as string,
        }
        cartMutation.mutate({ action: "decrease", cart: newCart })
    }
    const onInput = () => {
        const attribute = cart.productId.attributes.find((item: Iattribute) => item._id == cart.attributeId) as Iattribute
        if (Number(inputRef.current.value) <= attribute.instock && Number(inputRef.current.value) > 0) {
            const newCart = {
                productId: cart.productId._id as string,
                attributeId: cart.attributeId as string,
                quantity: Number(inputRef.current.value)
            }
            cartMutation.mutate({ action: "oninput", cart: newCart })
        }
        if (Number(inputRef.current.value) <= 0 || inputRef.current.value == "" || Number(inputRef.current.value) > attribute.instock) {
            inputRef.current.value = cart.quantity
        }
    }
    const remove = () => {
        const newCart = {
            productId: cart.productId?._id as string,
            attributeId: cart.attributeId as string,
        }
        cartMutation.mutate({ action: "remove", cart: newCart })
    }
    return (
        <tr className="border-b border-t  *:py-5">
            <td className="w-[27rem]">
                <div className="flex mt-0 pt-0 w-[25rem]">
                    <div className="flex-none max-w-36 relative ">
                        <Link to={`/productdetails/${cart?.productId?.slug}`} className='block h-[205px] w-[140px]'>
                            <img src={gallery?.avatar} className='object-cover w-full h-full' />
                        </Link>
                        {(!attribute || attribute?.active == false || attribute.instock == 0 || cart?.productId?.active == false|| attribute?.instock < cart?.quantity) && (
                            <div className='absolute z-10 top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center'>
                                <div className='px-2 py-1 rounded-lg flex items-center bg-white max-w-[95%] mx-auto'>
                                    <WarningOutlined className='text-red' />
                                    <span className='ml-2 text-yellow text-xs'>{textErrorCart({attribute,cart})}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex-grow p-0 m-0 ml-4">
                        <span className='text-wrap'> {cart?.productId?.name}</span>
                        <div className="flex gap-4 pt-5">
                            <span className="text-[12px]">Màu sắc: {attribute && attribute?.color}</span>
                            <span className="text-[12px]">Size: {attribute && attribute?.size}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className="align-top">
                <div className="text-left">
                    <div className=' relative'>
                    <span className='text-sm text-black'>{attribute ? formatPrice(attribute?.price_new) : 0}đ</span>
                    <span className='text-xs absolute -top-2.5 right-0 line-through text-gray-500'>{attribute ? formatPrice(attribute?.price_new) : 0}đ</span>
                    </div>
                    <p className="text-xs font-bold text-red"><ArrowDownOutlined />{attribute ? attribute?.discount: 0}%</p>
                </div>
            </td>
            <td className="w-24 align-top">
                <div className="border grid grid-cols-3 items-center rounded-tl-[20px] rounded-br-[20px]">
                    <button disabled={quantityErrorCart({attribute,cart})} onClick={decreaseQuantity} className=" border border-t-0 border-l-0 border-b-0 rounded-tl-[20px] rounded-br-[20px] py-1 px-1 text-lg ">-</button>
                    <input disabled={quantityErrorCart({attribute,cart})} ref={inputRef} onBlur={onInput} className="h-full text-xs text-center bg-transparent outline-0 " defaultValue={cart?.quantity} />
                    <button disabled={quantityErrorCart({attribute,cart})} onClick={increaseQuantity} className=" border border-t-0 border-r-0 border-b-0 rounded-tl-[20px] rounded-br-[20px] py-1 px-1 text-lg ">+</button>
                </div>
            </td>
            <td className="align-top">
                <div className=''>
                    <span className="pl-4 text-sm font-bold text-black">{formatPrice(cart?.total)}đ</span>
                </div>
            </td>
            <td className="align-top">
                <DeleteOutlined className=' text-xl cursor-pointer hover:text-red' onClick={remove} />
            </td>
        </tr>
    )
}
export default ItemTable