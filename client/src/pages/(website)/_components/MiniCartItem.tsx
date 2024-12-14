/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import { formatPrice } from '../../../common/utils/product'
import { Iattribute, Igallery } from '../../../common/interfaces/product'
import useCartMutation from '../../../common/hooks/carts/useCartMutation'
import { Link } from 'react-router-dom'
import { WarningOutlined } from '@ant-design/icons'


type Props = {
    cart: any
}

const MiniCartItem = ({cart}: Props) => {
    const [attribute,setAttribute] = useState<Iattribute | null>(null)
    const [gallery,setGallery] = useState<Igallery | null>(null)
    const inputRef = useRef<any>(null)
    const cartMutation = useCartMutation()
    useEffect(()=>{
       if(inputRef?.current){
        inputRef.current.value = cart?.quantity
       }
    },[cart?.quantity,inputRef])
    useEffect(()=>{
        const findAttribute = cart?.productId?.attributes?.find((item:Iattribute)=> item._id == cart?.attributeId ) 
        if (findAttribute) {
            setAttribute(findAttribute)
        }
    },[cart?.attributeId,cart?.productId?.attributes])
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
    const remove = () => {
        const newCart = {
            productId: cart.productId?._id as string,
            attributeId: cart.attributeId as string,
        }
        cartMutation.mutate({ action: "remove", cart: newCart })
    }
    return (
        <div className="w-full h-[94px] flex gap-3 pb-4 border-b border-gray-200  mb-4 relative ">
            <div className="flex-shrink-0 w-16 h-full">
                <Link to={`/productdetails/${cart?.productId?.slug}`}>
                    <img  src={gallery?.avatar} className="object-cover w-full h-full" />
                </Link> 
            </div>
            <div className="flex flex-col justify-between w-full ">
                <h3 className="text-base"><a href="#" className="text-[#373737]">{cart?.productId?.name}</a></h3>
                <div className="flex items-center justify-between">
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
          {(!attribute || attribute?.instock == 0 || attribute?.active == false || cart?.productId?.active == false || attribute?.instock < cart?.quantity) && (
              <div className='absolute z-10 top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center'>
              <div className='px-2 py-1 rounded-lg flex items-center bg-white'>
                  <WarningOutlined className='text-red' />
                  <span className='mx-2 text-yellow text-xs'>Hết sản phẩm</span> |
                  <button onClick={remove} className='text-sm text-red underline ml-2 hover:text-blue'>Xóa</button>
              </div>
             
      </div>
          )}
        </div>
    )
}

export default MiniCartItem