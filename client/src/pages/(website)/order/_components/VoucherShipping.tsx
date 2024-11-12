import React, { useEffect, useState } from 'react'
import { IVoucher } from '../../../../common/interfaces/voucher'
import { useDispatch, useSelector } from 'react-redux'
import { setTotalSubmit, setVoucher } from '../../../../common/redux/features/cartSlice'
import { IshipSubmit } from '../../../../common/interfaces/orderInterfaces'
import { formatPrice } from '../../../../common/utils/product'

type Props = {
    voucher: IVoucher,
    setSelectedVoucherCode: any
    shippingCost: IshipSubmit | null // Thêm shippingCost vào props
}

const VoucherShipping = ({voucher,setSelectedVoucherCode,shippingCost}: Props) => {
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalSubmit = useSelector((state: any) => state.cart.totalSubmit)
    const carts = useSelector((state: any) => state.cart.carts)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (voucher) {
            if (voucher?.minOrderValue <= totalCart) {
                if (voucher?.type === 'freeship') {
                    if (Number(voucher?.maxDiscountValue) >= Number(shippingCost?.value?.price)) {
                        const total = totalCart -  Number(shippingCost?.value?.price)
                        dispatch(setTotalSubmit(total))
                    }else{
                        const total = totalCart -  Number(voucher?.maxDiscountValue)
                        dispatch(setTotalSubmit(total))
                    }
                }
                
            }else{
                dispatch(setVoucher(null))
                dispatch(setTotalSubmit(0))
            }
        }else{
            // setProductCheck([]) lưu ý trường hợp chọn voucher giảm giá xong chọn phí vận chuyển
            dispatch(setTotalSubmit(0))
        }
    },[voucher,setSelectedVoucherCode,totalCart,shippingCost])
   
  return (
    <div className="flex justify-between items-center">
            <span className="text-sm">Giảm giá</span>
            <span className="text-sm">
                -{formatPrice(Math.min(Number(shippingCost?.value?.price), Number(voucher?.maxDiscountValue) ))}đ
            </span>
        </div>
  )
}

export default VoucherShipping