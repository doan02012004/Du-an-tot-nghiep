import React, { useState } from 'react'
import { IVoucher } from '../../../../common/interfaces/voucher'
import moment from 'moment'
import { formatPrice } from '../../../../common/utils/product'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    displayVoucher: boolean
    setDisplayVoucher: any
    vouchers: IVoucher[]
    onVoucherSelect: (voucherCode: string) => void
}

const ListVoucher = ({ displayVoucher, setDisplayVoucher, vouchers, onVoucherSelect }: Props) => {
    const [selectedVoucher, setSelectedVoucher] = useState('');
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const dispatch = useDispatch()
    const handleSelectVoucher = (voucherCode: string) => {
        setSelectedVoucher(voucherCode); // Cập nhật trạng thái khi chọn voucher
    };

    const handleConfirmVoucher = () => {
        if (selectedVoucher) {
            onVoucherSelect(selectedVoucher);
            setDisplayVoucher(false); // Ẩn modal sau khi xác nhận
        } else {
            alert('Vui lòng chọn một mã voucher!');
        }
    };
    console.log(totalCart)
    return (
        <div id="myModalVoucher" className={`modal fixed top-0 left-0 w-full h-full bg-black/45 z-[51] ${displayVoucher ? "" : "hidden"}`}>
            <div className="w-[400px] mt-3 lg:w-[800px] mx-auto bg-white lg:mt-9 rounded-lg">
                <div className="border-b">
                    <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-black text-lg font-semibold">Danh sách Voucher</span>
                        <button id="closeModalVoucher" onClick={() => setDisplayVoucher(!displayVoucher)}>
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                </div>
                <div className="px-5 pt-4 pb-6">
                    <ul className="space-y-3 max-h-[350px] overflow-y-auto">
                        {
                            vouchers
                                ?.filter((voucher) => moment().isBefore(moment(voucher?.endDate))) // Lọc các voucher chưa hết hạn
                                ?.map((voucher: IVoucher, index: number) => (
                                    <li key={index}
                                        className={`border border-gray-300 rounded-lg p-4 flex items-center justify-between transition-colors duration-200 ease-in-out ${selectedVoucher === voucher?.code ? 'bg-green-500 text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        <div>
                                            <strong className="text-lg">Mã: {voucher?.code}</strong>
                                            <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-600'}`}>
                                                Giảm {voucher?.type === "percentage" ? voucher?.value : formatPrice(voucher?.value)}{voucher?.type === "percentage" ? "%" : "đ"} Giảm tối đa {voucher?.maxDiscountValue}K
                                            </p>
                                            <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-600'}`}>
                                                Đơn tối thiểu {voucher?.minOrderValue}K
                                            </p>
                                            <div className='flex gap-4'>
                                                <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-400'}`}>
                                                    HSD: {moment(voucher?.endDate).format('DD/MM/YYYY')}
                                                </p>
                                                <span className='text-sm text-blue' onClick={()=>{}}>Điều kiện</span>
                                            </div>
                                        </div>
                                        <div
                                        className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors duration-200 ease-in-out ${selectedVoucher === voucher?.code ? 'bg-white text-green-500' : 'border-gray-300 bg-white'}`}
                                        onClick={() => {
                                            if (totalCart >= voucher?.minOrderValue) {
                                                handleSelectVoucher(voucher?.code)
                                            }
                                        }}
                                    >
                                        {selectedVoucher === voucher?.code && <i className="fa-solid fa-check"></i>}
                                    </div>
                                    </li>
                                ))
                        }
                    </ul>
                    <div className="mt-6 flex justify-end">
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={handleConfirmVoucher}
                        >
                            Đồng ý
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListVoucher
