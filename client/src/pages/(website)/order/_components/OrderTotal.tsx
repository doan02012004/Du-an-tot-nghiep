import { useState } from 'react'
import { formatPrice } from '../../../../common/utils/product'

type Props = {
    totalCart: number
}
const OrderTotal = ({ totalCart }: Props) => {
    const [displayVoucher, setDisplayVoucher] = useState(false)

    return (
        <>
            <div className="bg-[#FBFBFC]">
                <div className="px-5 pt-4 pb-8 flex flex-col gap-4">
                    <span className="text-xl text-[#000000] font-medium">Tóm tắt đơn hàng</span>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Tổng tiền hàng</span>
                        <span className="text-sm">{totalCart ? formatPrice(totalCart) : "0"}đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Tạm tính</span>
                        <span className="text-sm">{totalCart ? formatPrice(totalCart) : "0"}đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Phí vận chuyển</span>
                        <span className="text-sm">0đ</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-5">
                        <span className="text-sm">Tiền thanh toán</span>
                        <span className="text-lg text-dark font-semibold">{totalCart ? formatPrice(totalCart) : "0"}đ</span>
                    </div>
                </div>
                <div className="px-5 pb-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between lg:justify-around">
                        <span className="lg:text-lg text-black font-semibold">Mã phiếu giảm giá</span>
                        <div className="w-[1px] h-6 bg-black" />
                        <button className="lg:text-lg text-gray-400 font-semibold" id="zoomVoucher" onClick={() => setDisplayVoucher(!displayVoucher)}>Mã của tôi</button>
                    </div>
                    <div className="flex items-center gap-3 justify-between">
                        <input type="text" className="placeholder:text-sm border rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:placeholder:text-base " placeholder="Mã giảm giá" />
                        <button className="text-sm lg:text-base bg-white px-3 lg:px-1 py-1 lg:py-3 rounded-tl-[20px] rounded-br-[20px] font-semibold text-black border-black border hover:bg-black hover:text-white">ÁP
                            DỤNG</button>
                    </div>
                    <div>
                        <select name='' id='' className="text-sm border w-full rounded-md py-3 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base ">
                            <option value=''>Mã nhân viên hỗ trợ</option>
                        </select>
                    </div>
                </div>
            </div>
            <div id="myModalVoucher" className={`modal fixed top-0 left-0 w-full h-full bg-black/45  z-[51]  ${displayVoucher ? "" : "hidden"}`}>
                <div className="w-[400px] mt-3 lg:w-[800px] mx-auto bg-white lg:mt-9 rounded-lg" >
                    <div className="border-b">
                        <div className="flex items-center justify-between px-5 py-4" >
                            <span className="text-black text-lg font-semibold">Danh sách Voucher</span>
                            <button id="closeModalVoucher" onClick={() => setDisplayVoucher(!displayVoucher)}><i className="fa-solid fa-xmark" /></button>
                        </div>
                    </div>
                    <div className="px-5 pt-4 pb-6">
                        <span className=''>Rấc tiếc, bạn không có mã giảm giá nào !</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderTotal