import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../../../common/utils/product'
import { Iattribute, Igallery } from '../../../../common/interfaces/product'
import { IcartItem } from '../../../../common/interfaces/cart'
import { ArrowDownOutlined } from '@ant-design/icons'

type Props = {
    cart: IcartItem
}

const ItemProduct = ({cart}: Props) => {
    const inputRef = useRef<any>(null)
    useEffect(()=>{
        inputRef.current.value = cart?.quantity
    },[cart?.quantity])
    const [attribute, setAttribute] = useState<Iattribute | null>(null)
    const [gallery, setGallery] = useState<Igallery | null>(null)
    useEffect(() => {
        const findAttribute = cart?.productId?.attributes?.find((item: Iattribute) => item?._id == cart?.attributeId)
        if (findAttribute) {
            setAttribute(findAttribute)
        }
    }, [cart?.attributeId, cart?.total])
    useEffect(() => {
        const findGallery = cart?.productId?.gallerys?.find((item: Igallery) => item._id == cart?.galleryId)
        if (findGallery) {
            setGallery(findGallery)
        }
    }, [cart?.galleryId])
    return (
        <tbody>
            <tr className="border-b border-t *:py-5">
                <td className="w-[27rem]">
                    <div className="flex mt-0 pt-0 w-[25rem]">
                        <div className="flex-none max-w-36 ">
                            <Link to={`/productdetails/${cart?.productId?.slug}`} className='block h-[205px] w-[140px]'>
                                <img src={gallery?.avatar} className='object-cover w-full h-full' />
                            </Link>
                        </div>
                        <div className="flex-grow p-0 m-0 ml-4">
                            <span className='text-wrap'> {cart?.productId?.name}</span>
                            <div className="flex gap-4 pt-5">
                                <span className="text-[12px]">Màu sắc: {attribute && attribute?.color}</span>
                                <span className="text-[12px]">Size: {attribute && attribute?.size}</span>
                            </div>
                            <p className="text-xs font-bold text-red"><ArrowDownOutlined />{attribute ? attribute?.discount: 0}%</p>
                        </div>
                    </div>
                </td>
                <td className="align-top">
                    <div className="text-left">
                        <span className='text-sm'>{attribute ? formatPrice(attribute?.price_new) : 0}đ</span>
                        {/* <p className="text-xs font-bold text-red">( -60% )</p> */}
                    </div>
                </td>
                <td className="w-24 align-top">
                    <div className="border items-center rounded-tl-[20px] rounded-br-[20px]">
                        <input ref={inputRef} className="h-full text-xs py-2 text-center bg-transparent outline-0 flex items-center justify-center" readOnly defaultValue={cart?.quantity} />
                    </div>
                </td>
                <td className="align-top">
                    <div className=''>
                        <span className="pl-4 text-sm font-bold text-black">{formatPrice(cart?.total)}đ</span>
                    </div>
                </td>
                {/* <td className="align-top">
                    <img onClick={remove} src={bin} />
                </td> */}
            </tr>
        </tbody>
    )
}

export default ItemProduct