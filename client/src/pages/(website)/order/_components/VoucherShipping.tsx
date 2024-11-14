import React, { useEffect, useState } from 'react'
import { IVoucher } from '../../../../common/interfaces/voucher'
import { useDispatch, useSelector } from 'react-redux'
import { setTotalSubmit, setVoucher } from '../../../../common/redux/features/cartSlice'
import { IshipSubmit } from '../../../../common/interfaces/orderInterfaces'
import { formatPrice } from '../../../../common/utils/product'
import { message } from 'antd'

type Props = {
    voucher: IVoucher,
    setSelectedVoucherCode: any
    shippingCost: IshipSubmit | null // Thêm shippingCost vào props
}

const VoucherShipping = ({ voucher, setSelectedVoucherCode, shippingCost }: Props) => {
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalSubmit = useSelector((state: any) => state.cart.totalSubmit)
    const carts = useSelector((state: any) => state.cart.carts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setTotalSubmit(totalCart));
        if (voucher) {
            if (voucher?.status == true || new Date(voucher?.endDate) >= new Date()) {
                if (voucher?.quantity >= Number(voucher?.usedQuantity)) {
                    if (voucher?.minOrderValue <= totalCart) {
                        if (voucher?.type === 'freeship') {
                            if (Number(voucher?.maxDiscountValue) >= Number(shippingCost?.value?.price)) {
                                const total = totalCart - Number(shippingCost?.value?.price)
                                dispatch(setTotalSubmit(total))
                            } else {
                                const total = totalCart - Number(voucher?.maxDiscountValue)
                                dispatch(setTotalSubmit(total))
                            }
                        }
                    } else {
                        dispatch(setTotalSubmit(totalCart));  // Reset totalSubmit về totalCart
                        message.error("Tổng giá không đủ điều kiện");
                        setTimeout(() => {
                            dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                        }, 0);  // Đặt voucher về null sau một khoảng ngắn để message xuất hiện trước
                    }
                } else {
                    message.error("Số lượng voucher đã hết");
                    setTimeout(() => {
                        dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                    }, 0);  // Đặt voucher về null sau một khoảng ngắn để message xuất hiện trước
                }
            }else{
                message.error("Voucher đã hết hạn");
                    setTimeout(() => {
                        dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                    }, 0);  // Đặt voucher về null sau một khoảng ngắn để message xuất hiện trước
            }
        } else {
            dispatch(setTotalSubmit(0))
        }
    }, [voucher, setSelectedVoucherCode, totalCart, shippingCost])

    return (
        <div className="flex justify-between items-center">
            <span className="text-sm">Giảm giá</span>
            <span className="text-sm">
                -{formatPrice(Math.min(Number(shippingCost?.value?.price), Number(voucher?.maxDiscountValue)))}đ
            </span>
        </div>
    )
}

export default VoucherShipping