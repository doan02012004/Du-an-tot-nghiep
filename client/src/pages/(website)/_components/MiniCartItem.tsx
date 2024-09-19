import { useEffect, useRef, useState } from 'react'
import { formatPrice } from '../../../common/utils/product'
import { Iattribute, Igallery } from '../../../common/interfaces/product'
import useCartMutation from '../../../common/hooks/carts/useCartMutation'

type Props = {
    cart: any
}

const MiniCartItem = ({cart}: Props) => {
    const [attribute,setAttribute] = useState<Iattribute | null>(null)
    const [gallery,setGallery] = useState<Igallery | null>(null)
    const inputRef = useRef<any>(null)
    const cartMutation = useCartMutation()
    useEffect(()=>{
        inputRef.current.value = cart?.quantity
    },[cart?.quantity])
    useEffect(()=>{
        const findAttribute = cart?.productId?.attributes?.find((item:Iattribute)=> item._id == cart?.attributeId ) 
        if (findAttribute) {
            setAttribute(findAttribute)
        }
    },[cart?.attributeId])
    useEffect(()=>{
        const findGallery = cart?.productId?.gallerys?.find((item:Igallery)=> item._id == cart?.galleryId)
        if (findGallery) {
            setGallery(findGallery)
        }
    },[cart?.galleryId])
    const increaseQuantity = ()=>{
        const newCart = {
            productId:cart.productId._id,
            attributeId: cart.attributeId,
        }
        cartMutation.mutate({action:"increase",cart:newCart})
    }
    const decreaseQuantity = ()=>{
        const newCart = {
            productId:cart.productId._id,
            attributeId: cart.attributeId,
        }
        cartMutation.mutate({action:"decrease",cart:newCart})
    }
    const onInput = ()=>{
        const attribute = cart.productId.attributes.find((item:Iattribute)=> item._id == cart.attributeId)
        if ( Number(inputRef.current.value) <= attribute.instock && Number(inputRef.current.value) >0   ) {
            const newCart = {
                productId:cart.productId._id,
                attributeId: cart.attributeId,
                quantity: Number(inputRef.current.value)
            }
            cartMutation.mutate({action:"oninput",cart:newCart})
        }
        if (Number(inputRef.current.value) <= 0 || inputRef.current.value == "" || Number(inputRef.current.value) > attribute.instock) {
            inputRef.current.value = cart.quantity
        }
    }
    return (
        <div className="w-full h-[94px] flex gap-3 pb-4 border-b border-gray-200  mb-4  ">
            <div className="w-16 h-full flex-shrink-0">
                <img src={gallery?.avatar} className="w-full h-full object-cover" />
            </div>
            <div className="w-full flex flex-col justify-between ">
                <h3 className="text-base"><a href="#" className="text-[#373737]">{cart?.productId?.name}</a></h3>
                <div className="flex justify-between items-center">
                    <span className="text-sm ">Màu sắc:
                        <span className="text-[#373737]">{attribute && attribute?.color}</span>
                    </span>
                    <span className="text-sm ">Size:
                        <span>{attribute && attribute?.size}</span>
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="relative w-[74px] h-6 border border-gray-200 overflow-hidden rounded-tl-lg rounded-br-lg">
                        <span onClick={decreaseQuantity}  className="absolute z-[5] cursor-pointer left-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                            <i className="fa-solid fa-minus" />
                        </span>
                        <input ref={inputRef} onBlur={onInput} type="number" className="absolute left-[50%] translate-x-[-50%] w-12 px-3 z-[3] text-center outline-0 border-0" defaultValue={cart?.quantity} />
                        <span onClick={increaseQuantity} className="absolute z-[5] cursor-pointer right-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                            <i className="fa-solid fa-plus" />
                        </span>
                    </div>
                    <span className="text-sm text-[#AC2F33] font-semibold ">{cart?.total >0 ? formatPrice(cart?.total) : '0'} <span className="underline">đ</span></span>
                </div>
            </div>
        </div>
    )
}

export default MiniCartItem