import { useState } from 'react'
import { formatPrice } from '../../../../common/utils/product'
import { IshipSubmit } from '../../../../common/interfaces/orderInterfaces'

type Props = {
    totalCart: number,
    shippingCost: IshipSubmit | null // Thêm shippingCost vào props
}

const OrderTotal = ({ totalCart, shippingCost }: Props) => {
    const [displayVoucher, setDisplayVoucher] = useState(false)

    return (
        <>
            <div className="bg-[#FBFBFC]">
                <div className="px-5 pt-4 pb-8 flex flex-col gap-4">
                    <span className="text-xl text-[#000000] font-medium">Tóm tắt đơn hàng</span>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Tổng tiền hàng</span>
                        <span className="text-sm">{formatPrice(totalCart)}đ</span> {/* chỉ hiển thị tổng tiền hàng */}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Tạm tính</span>
                        <span className="text-sm">{formatPrice(totalCart)}đ</span> {/* giống tổng tiền hàng */}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Phí vận chuyển</span>
                        <span className="text-sm">{shippingCost ? formatPrice(shippingCost?.value?.price) : "0"}đ</span> {/* hiển thị phí ship */}
                    </div>
                    <div className="flex justify-between items-center border-b pb-5">
                        <span className="text-sm">Tiền thanh toán</span>
                        <span className="text-lg text-dark font-semibold">{shippingCost ? formatPrice(totalCart + shippingCost?.value?.price) : formatPrice(totalCart)}đ</span> {/* cộng tổng tiền hàng và phí ship */}
                    </div>
                </div>
                <div className="px-5 pb-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between lg:justify-around">
                        <span className="lg:text-lg text-black font-semibold">Mã phiếu giảm giá</span>
                        <div className="w-[1px] h-6 bg-black" />
                        <button className="lg:text-lg text-gray-400 font-semibold" onClick={() => setDisplayVoucher(!displayVoucher)}>Mã của tôi</button>
                    </div>
                    <div className="flex items-center gap-3 justify-between">
                        <input type="text" className="placeholder:text-sm border rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:placeholder:text-base" placeholder="Mã giảm giá" />
                        <button className="text-sm lg:text-base bg-white px-3 lg:px-1 py-1 lg:py-3 rounded-tl-[20px] rounded-br-[20px] font-semibold text-black border-black border hover:bg-black hover:text-white">ÁP DỤNG</button>
                    </div>
                    <div>
                        <select className="text-sm border w-full rounded-md py-3 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base">
                            <option value=''>Mã nhân viên hỗ trợ</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderTotal
