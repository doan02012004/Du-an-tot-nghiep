import { useEffect, useRef, useState } from 'react'
import bin from '../../../../assets/icons/image 8.png'
import { formatPrice } from '../../../../common/utils/product'
import { Iattribute, Igallery } from '../../../../common/interfaces/product'
import useCartMutation from '../../../../common/hooks/carts/useCartMutation'
import { IcartItem } from '../../../../common/interfaces/cart'
import { Link } from 'react-router-dom'
import { message } from 'antd'
type Props = {
    cart: IcartItem
}

const ItemTable = ({ cart }: Props) => {
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
        if(Number(inputRef.current.value)+ 1 > attribute?.instock) return message.error("Đã đạt số lượng tối đa")
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
        <tbody>
            <tr className="border-b border-t *:py-5">
                <td className="w-[27rem]">
                    <div className="flex mt-0 pt-0 w-[25rem]">
                        <div className="max-w-36 flex-none ">
                            <Link to={`/productdetails/${cart?.productId?._id}`} className='block h-[205px] w-[140px]'>
                                <img src={gallery?.avatar} className='h-full w-full object-cover' />
                            </Link>
                        </div>
                        <div className="flex-grow ml-4 p-0 m-0">
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
                        <span className='text-sm'>{attribute? formatPrice(attribute?.price_new):0 }đ</span>
                        {/* <p className="text-red text-xs font-bold">( -60% )</p> */}
                    </div>
                </td>
                <td className="align-top w-24">
                    <div className="border grid grid-cols-3 items-center rounded-tl-[20px] rounded-br-[20px]">
                        <button onClick={decreaseQuantity} className=" border border-t-0 border-l-0 border-b-0 rounded-tl-[20px] rounded-br-[20px] py-1 px-1 text-lg ">-</button>
                        <input ref={inputRef} onBlur={onInput} className="text-center text-xs outline-0 bg-transparent  h-full " defaultValue={cart?.quantity}/>
                        <button onClick={increaseQuantity} className=" border border-t-0 border-r-0 border-b-0 rounded-tl-[20px] rounded-br-[20px] py-1 px-1 text-lg ">+</button>
                    </div>
                </td>
                <td className="align-top">
                    <div className=''>
                        <span className="text-black font-bold text-sm pl-4">{formatPrice( cart?.total)}đ</span>
                    </div>
                </td>
                <td className="align-top">
                    <img onClick={remove} src={bin} />
                </td>
            </tr>
        </tbody>
    )
}
export default ItemTable