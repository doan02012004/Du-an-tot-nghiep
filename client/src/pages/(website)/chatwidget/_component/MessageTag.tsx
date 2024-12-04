/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setMesageTag } from '../../../../common/redux/features/chatSlice'
import { messageTag } from '../../../../common/interfaces/message'
import { useEffect, useState } from 'react'
import { Igallery } from '../../../../common/interfaces/product'
import { formatPrice } from '../../../../common/utils/product'


const MessageTag = () => {
    const [gallery, setGallery] = useState<Igallery | null>(null)
    const [minPrice, setMinPrice] = useState<number | null>(null)
    const [maxPrice, setMaxPrice] = useState<number | null>(null)
    const mesageTag = useSelector((state: any) => state.chat.messageTag) as messageTag
    const dispath = useDispatch()

    useEffect(() => {
        if (mesageTag && mesageTag?.type == 'product') {
            if (mesageTag.attribute) {
                const findGallery = mesageTag.product?.gallerys.find((item: Igallery) => item.name == mesageTag.attribute?.color)
                setGallery(findGallery ? findGallery : null)
            } else {
                if (!minPrice || !maxPrice) {
                    const attributeMinPrice = mesageTag.product?.attributes.reduce((current, item) => item.price_new < current.price_new ? item : current, mesageTag.product?.attributes[0])
                    const attributeMaxPrice = mesageTag.product?.attributes.reduce((current, item) => item.price_new > current.price_new ? item : current, mesageTag.product?.attributes[0])
                    setMinPrice(attributeMinPrice ? attributeMinPrice?.price_new : 0)
                    setMaxPrice(attributeMaxPrice ? attributeMaxPrice?.price_new : 0)
                }
                setGallery(mesageTag.product ? mesageTag.product?.gallerys[0] : null)
            }
        }
    }, [mesageTag])
    return (
        <div className="w-full h-auto border p-4 relative">
            <CloseOutlined onClick={() => dispath(setMesageTag(null))} className=' absolute right-1 top-1 cursor-pointer hover:text-red' />
            {mesageTag.type == 'product' && (
                <div className='flex gap-x-3'>
                    <div className='w-14 h-20 overflow-hidden'>
                        <img src={gallery?.avatar} className=' object-cover w-full h-full' alt={mesageTag?.product?.name} />
                    </div>
                    <div>
                        <h5 className='font-semibold text-xs text-black w-full'>{mesageTag.product?.name}</h5>
                        {mesageTag.attribute && (
                            <p className='text-xs'>
                                <span className='block'>size: {mesageTag.attribute.size}</span>
                                <span>màu:  {mesageTag.attribute.color}</span>
                            </p>
                        )}
                        {mesageTag.attribute ?
                            (
                                <p className='flex items-center text-xs gap-x-2'>
                                    <span className='text-black font-semibold' >{formatPrice(mesageTag.attribute ? mesageTag.attribute.price_new : 0)}đ</span>
                                    <span className=' line-through'>{formatPrice(mesageTag.attribute ? mesageTag.attribute.price_old : 0)}đ</span>
                                </p>
                            ) : (
                                <p className='flex items-center text-xs text-black font-semibold'>
                                    {minPrice !== maxPrice ?
                                        (
                                            <>
                                                <span >{formatPrice(minPrice ? minPrice : 0)}đ -</span>
                                                <span>{formatPrice(maxPrice ? maxPrice : 0)}đ</span>
                                            </>
                                        ) : (
                                            <span>{formatPrice(minPrice ? minPrice : 0)}đ</span>
                                        )}
                                </p>
                            )}
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default MessageTag