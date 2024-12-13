/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react"
import { Iattribute, Igallery } from "../../../../common/interfaces/product"
import { formatPrice } from "../../../../common/utils/product"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setOpenChat } from "../../../../common/redux/features/chatSlice"
import { Space } from "antd"
import { WarningOutlined } from "@ant-design/icons"

type Props = {
    checkBoxRef: any,
    currentUser: any,
    message: any
}
const Message = ({ checkBoxRef, currentUser, message }: Props) => {
    const messageRef = useRef<HTMLDivElement>(null)
    const [gallery, setGallery] = useState<Igallery | null>(null)
    const [minPrice, setMinPrice] = useState<number | null>(null)
    const [maxPrice, setMaxPrice] = useState<number | null>(null)
    const [currentAtb, setCurrentAtb] = useState<Iattribute | null>(null)
    const navigate = useNavigate()
    const dispath = useDispatch()
    useEffect(() => {
        if (messageRef?.current) {
            const height = messageRef.current.scrollHeight
            if (height < 60) {
                messageRef.current.style.borderRadius = '999px'
            } else {
                messageRef.current.style.borderRadius = '12px'
            }
        }
    }, [messageRef, message])
    useEffect(() => {
        if (message && message?.productId) {
            if (message.attributeId) {
                const attribute = message.productId.attributes.find((item: Iattribute) => item._id == message.attributeId)
                const findGallery = message.productId?.gallerys.find((item: Igallery) => item.name == attribute?.color)
                setGallery(findGallery ? findGallery : null)
                setCurrentAtb(attribute)
            } else {
                if (!minPrice || !maxPrice) {
                    const attributeMinPrice = message.productId?.attributes.reduce((current: Iattribute, item: Iattribute) => item.price_new < current.price_new ? item : current, message.productId?.attributes[0])
                    const attributeMaxPrice = message.productId?.attributes.reduce((current: Iattribute, item: Iattribute) => item.price_new > current.price_new ? item : current, message.productId?.attributes[0])
                    setMinPrice(attributeMinPrice ? attributeMinPrice?.price_new : 0)
                    setMaxPrice(attributeMaxPrice ? attributeMaxPrice?.price_new : 0)
                }
                setGallery(message.productId ? message.productId?.gallerys[0] : null)
            }
        }
    }, [message])

    const onViewProduct = () => {
        navigate(`/productdetails/${message?.productId?.slug}`)
        dispath(setOpenChat(false))
    }
    return (
        <>
            {message.productId &&  message.type == 'product' &&message?.productId?.active===true  &&(
                <div className='flex gap-x-3 max-w-48 self-end mb-3 mt-5'>
                    <div className='w-14 h-20 overflow-hidden'>
                        <img src={gallery?.avatar} className=' cursor-pointer object-cover w-full h-full' alt={message?.productId?.name} />
                    </div>
                    <div>
                        <h5 onClick={onViewProduct} className='font-semibold cursor-pointer text-xs text-black w-full hover:text-blue hover:underline'>{message.productId?.name}</h5>
                        {currentAtb && (
                            <p className='text-xs m-0'>
                                <span className='block'>size: {currentAtb?.size}</span>
                                <span>màu:  {currentAtb?.color}</span>
                            </p>
                        )}
                        {currentAtb ?
                            (
                                <p className='flex items-center text-xs gap-x-2 m-0'>
                                    <span className='text-black font-semibold' >{formatPrice(currentAtb ? currentAtb.price_new : 0)}đ</span>
                                    <span className=' line-through'>{formatPrice(currentAtb ? currentAtb.price_old : 0)}đ</span>
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
            ) }
            {(!message?.productId && message.type == 'product' || message?.productId?.active === false && message.type == 'product') && (
                    <div className='flex gap-x-3 max-w-48 self-end mb-3 mt-5'>
                        <div className="bg-black/30 w-full h-full px-3 py-2">
                            <div className="bg-white px-2 py-1">
                                <Space>
                                    <WarningOutlined className="text-red" />
                                    <span className="text-yellow text-xs">Sản phẩm không còn tồn tại</span>
                                </Space>
                            </div>
                        </div>
                    </div>
                )}
            <div ref={messageRef} key={message?._id} className={`${currentUser?._id == message?.sender?._id ? "self-end text-white bg-blue" : "self-start text-dark bg-gray-200"} mb-2 px-3 py-2  max-w-52 border`}>
                <div ref={checkBoxRef} className={` text-sm   font-medium`} style={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}>
                    {message.message}
                </div>
            </div>
        </>
    )
}

export default Message