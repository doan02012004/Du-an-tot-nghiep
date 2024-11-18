import React, { useEffect, useRef, useState } from 'react'
import { IcartItem } from '../../../../common/interfaces/cart'
import { Iattribute, Igallery } from '../../../../common/interfaces/product'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../../../common/utils/product'

type Props = {
    cart: IcartItem
}

const ItemProductMobi = ({cart}: Props) => {
    const [attribute, setAttribute] = useState<Iattribute | null>(null)
    const [gallery, setGallery] = useState<Igallery | null>(null)
    const inputRef = useRef<any>(null)
    useEffect(() => {
        inputRef.current.value = cart?.quantity
    }, [cart?.quantity])
    useEffect(() => {
        const findAttribute = cart?.productId?.attributes?.find((item: Iattribute) => item?._id == cart?.attributeId)
        if (findAttribute) {
            setAttribute(findAttribute)
        }
    }, [cart?.attributeId])
    useEffect(() => {
        const findGallery = cart?.productId?.gallerys?.find((item: Igallery) => item._id == cart?.galleryId)
        if (findGallery) {
            setGallery(findGallery)
        }
    }, [cart?.galleryId])
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
                    {attribute ? formatPrice(attribute?.price_new) : 0}đ
                        <span className='text-sm'>Tổng giá: {formatPrice(cart?.total)}</span>
                        {/* <span className="text-sm font-semibold text-red">( -30% )</span> */}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end gap-10">
                <div className="border grid grid-cols-3 items-center rounded-tl-[10px] rounded-br-[10px]">
                    <input ref={inputRef} className="h-full text-xs text-center bg-transparent w-7 outline-0 " readOnly defaultValue={cart?.quantity}></input>
                </div>
            </div>
        </div>
  )
}

export default ItemProductMobi