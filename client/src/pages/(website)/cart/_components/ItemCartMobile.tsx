import React, { useEffect, useRef, useState } from 'react'
import { ICart, IcartItem } from '../../../../common/interfaces/cart'
import { Iattribute, Igallery } from '../../../../common/interfaces/product'
import useCartMutation from '../../../../common/hooks/carts/useCartMutation'
import { formatPrice } from '../../../../common/utils/product'
import { Link } from 'react-router-dom'

type Props = {
    cart: IcartItem
}

const ItemCartMobile = ({cart}: Props) => {
    const [attribute,setAttribute]=useState<Iattribute|null>(null)
    const [gallery,setGallery] = useState<Igallery | null>(null)
    const inputRef = useRef<any>(null)
    const cartMutation = useCartMutation()
    useEffect(()=>{
        inputRef.current.value = cart?.quantity
    },[cart?.quantity])
    useEffect(()=>{
        const findAttribute = cart?.productId?.attributes?.find((item:Iattribute)=> item?._id == cart?.attributeId)
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
        const newCart  = {
            productId:cart.productId._id as string,

            attributeId: cart.attributeId as string,
        }
        cartMutation.mutate({action:"increase",cart:newCart})
    }
    const decreaseQuantity = ()=>{
        const newCart = {
            productId:cart.productId._id as string,
            attributeId: cart.attributeId as string,
        }
        cartMutation.mutate({action:"decrease",cart:newCart})
    }
    const onInput = ()=>{
        const attribute = cart.productId.attributes.find((item:Iattribute)=> item._id == cart.attributeId) as Iattribute
        if ( Number(inputRef.current.value) <= attribute.instock && Number(inputRef.current.value) >0   ) {
            const newCart = {
                productId:cart.productId._id as string,
                attributeId: cart.attributeId as string,
                quantity: Number(inputRef.current.value)
            }
            cartMutation.mutate({action:"oninput",cart:newCart})
        }
        if (Number(inputRef.current.value) <= 0 || inputRef.current.value == "" || Number(inputRef.current.value) > attribute.instock) {
            inputRef.current.value = cart.quantity
        }
    }
    const remove = ()=>{
        const newCart = {
            productId:cart.productId._id as string,
            attributeId: cart.attributeId as string,
        }
        cartMutation.mutate({action:"remove",cart:newCart})
    }
  return (
    <div className="flex justify-between mb-3 lg:hidden">
                <div className="flex w-2/3 gap-4">
                    <div className="">
                        <Link to={`/productdetails/${cart?.productId?.slug}`} className='block h-[103px] w-[72px]'>
                            <img src={gallery?.avatar} className='object-cover w-full h-full' />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                        <span className="text-sm">{cart?.productId?.name}</span>
                        <div className="flex gap-2 text-sm">
                            <span>Màu sắc: {attribute && attribute?.color}</span>
                            <span>Size: {attribute && attribute?.size}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className='text-sm'>Giá: {formatPrice(cart?.total)}</span>
                            {/* <span className="text-sm font-semibold text-red">( -30% )</span> */}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-10">
                    <span onClick={remove}><i className="fa-solid fa-trash-can" /></span>
                    <div className="border grid grid-cols-3 items-center rounded-tl-[10px] rounded-br-[10px]">
                        <button onClick={decreaseQuantity} className=" border border-t-0 border-l-0 border-b-0 rounded-tl-[10px] rounded-br-[10px] px-2 text-xl">-</button>
                        <input ref={inputRef} onBlur={onInput} className="h-full text-xs text-center bg-transparent w-7 outline-0 " defaultValue={cart?.quantity}></input>
                        <button onClick={increaseQuantity} className=" border border-t-0 border-r-0 border-b-0 rounded-tl-[10px] rounded-br-[10px]  px-2 text-xl">+</button>
                    </div>
                </div>
            </div>
  )
}

export default ItemCartMobile