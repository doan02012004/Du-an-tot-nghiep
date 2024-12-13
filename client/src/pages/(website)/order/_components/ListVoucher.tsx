import React, { useContext, useEffect, useState } from 'react'
import { IVoucher } from '../../../../common/interfaces/voucher'
import moment from 'moment'
import { formatPrice } from '../../../../common/utils/product'
import { useDispatch, useSelector } from 'react-redux'
import DetailVoucher from './DetailVoucher'
import { Button } from 'antd'
import { AppContext } from '../../../../common/contexts/AppContextProvider'

type Props = {
    displayVoucher: boolean
    setDisplayVoucher: any
    vouchers: IVoucher[]
    onVoucherSelect: (voucherCode: string) => void
}

const ListVoucher = ({ displayVoucher, setDisplayVoucher, vouchers, onVoucherSelect }: Props) => {
    const [selectedVoucher, setSelectedVoucher] = useState('');
    const [detailVoucher, setDetailVoucher] = useState<IVoucher | null>(null);
    const [displayList, setDisplayList] = useState(true); // Quản lý hiển thị danh sách hoặc chi tiết
    const { currentUser } = useContext(AppContext)
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const voucher = useSelector((state: any) => state.cart.voucher) as IVoucher
    const dispatch = useDispatch()

    useEffect(() => {
        if (!voucher) {
            setSelectedVoucher('')
        }
    }, [voucher]);
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
    // Function khi nhấn vào "Điều kiện"
    const handleViewDetail = (voucher: IVoucher) => {
        setDetailVoucher(voucher);
        setDisplayList(false)
    };
    const handleBackToList = () => {
        setDetailVoucher(null);
        setDisplayList(true); // Show list and hide detail
    };
    
    return (
        <>
            {displayList ? (<div id="myModalVoucher" className={`modal fixed top-0 left-0 w-full h-full bg-black/45 z-[51] ${displayVoucher ? "" : "hidden"}`}>
                <div className="w-[400px] mt-3 lg:w-[800px] mx-auto bg-white lg:mt-9 rounded-lg relative">
                    <div className="border-b">
                        <div className="flex items-center justify-between px-5 py-4">
                            <span className="text-black text-xl font-semibold">Danh sách Voucher</span>
                            <button id="closeModalVoucher" onClick={() => setDisplayVoucher(!displayVoucher)}>
                                <i className="fa-solid fa-xmark" />
                            </button>
                        </div>
                    </div>
                    <div className="px-5 pt-4 pb-6 overflow-auto max-h-[400px]">
                        {/* Danh mục Mã Giảm Giá Sản Phẩm */}
                        <div className="mb-6">
                            <h6 className='text-lg font-semibold text-black mb-3'>Mã Giảm Giá Sản Phẩm</h6>
                            <ul className="space-y-3">
                                {
                                    vouchers
                                        ?.filter((voucher) => 
                                            moment().isBefore(moment(voucher?.endDate)) && // Chưa hết hạn
                                            moment().isSameOrAfter(moment(voucher?.startDate)) && // Ngày bắt đầu <= ngày hiện tại
                                            !voucher?.usedBy?.includes(currentUser?._id) && // Loại bỏ voucher đã được sử dụng bởi người dùng hiện tại
                                            voucher?.status == true &&
                                            voucher?.category === "discount"
                                        )    
                                        ?.sort((a:any, b:any) => {
                                            // Sắp xếp voucher đủ điều kiện lên trước
                                            const isEligibleA = totalCart >= a?.minOrderValue;
                                            const isEligibleB = totalCart >= b?.minOrderValue;
                                            return (isEligibleB ? 1 : 0) - (isEligibleA ? 1 : 0);
                                        })
                                        ?.map((voucher: IVoucher, index: number) => (
                                            <li key={index}
                                                className={`border border-gray-300 rounded-lg p-4 flex items-center justify-between transition-colors duration-200 ease-in-out ${selectedVoucher === voucher?.code ? 'bg-green-500 text-white' : totalCart < voucher?.minOrderValue
                                                    ? 'bg-gray-200 text-gray-500'
                                                    : 'hover:bg-gray-100'}`}
                                            >
                                                {/* Icon voucher */}
                                                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 border-2 rounded-full bg-green-500 text-white text-lg font-semibold">
                                                    <i className="fa-solid fa-ticket"></i>
                                                </div>

                                                {/* Thông tin voucher */}
                                                <div className="ml-4 flex-grow">
                                                    <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-600'}`}>
                                                        Giảm {voucher?.type === "percentage" ? voucher?.value : formatPrice(voucher?.value / 1000)}{voucher?.type === "percentage" ? "%" : "K"} {voucher?.type === "percentage" ? "Giảm tối đa" : ""} {voucher?.type === "fixed" ? "" : Number(voucher?.maxDiscountValue) / 1000}{voucher?.type === "percentage" ? (Number(voucher?.maxDiscountValue) > 1000000 ? "Tr" : "K") : ""}
                                                    </p>
                                                    <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-600'}`}>
                                                        Đơn tối thiểu {voucher?.minOrderValue / 1000}{Number(voucher?.minOrderValue) > 1000000 ? "Tr" : "K"}
                                                    </p>
                                                    <div className='flex gap-4'>
                                                        <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-400'}`} >
                                                            HSD: {moment(voucher?.endDate).format('DD/MM/YYYY')}
                                                        </p>
                                                        <span className='text-sm text-blue cursor-pointer' onClick={() => handleViewDetail(voucher)}>Điều kiện</span>
                                                    </div>
                                                </div>

                                                {/* Checkbox để chọn voucher */}
                                                <div
                                                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors duration-200 ease-in-out ${selectedVoucher === voucher?.code ? 'bg-white text-green-500' : 'border-gray-300 bg-white'}`}
                                                    onClick={() => {
                                                        if (totalCart >= voucher?.minOrderValue) {
                                                            handleSelectVoucher(voucher?.code) // k cho chọn những voucher k đủ điều kiện
                                                        }
                                                    }}
                                                >
                                                    {selectedVoucher === voucher?.code && <i className="fa-solid fa-check"></i>}
                                                </div>
                                            </li>

                                        ))
                                }
                            </ul>
                        </div>

                        {/* Danh mục Mã Miễn Phí Vận Chuyển */}
                        <div>
                            <h6 className='text-lg font-semibold text-black mb-3'>Mã Miễn Phí Vận Chuyển</h6>
                            <ul className="space-y-3">
                                {
                                    vouchers
                                        ?.filter((voucher) => 
                                            moment().isBefore(moment(voucher?.endDate)) && // Chưa hết hạn
                                            moment().isSameOrAfter(moment(voucher?.startDate)) && // Ngày bắt đầu <= ngày hiện tại
                                            !voucher?.usedBy?.includes(currentUser?._id) && // Loại bỏ voucher đã được sử dụng bởi người dùng hiện tại
                                            voucher?.status == true &&
                                            voucher?.category === "shipping")
                                        ?.sort((a, b) => {// sort để phân loại a và b luôn là 2 phần tử khác nhau của mảng
                                            // Sắp xếp voucher đủ điều kiện lên trước
                                            const isEligibleA = totalCart >= a?.minOrderValue; // đúng trả về true sai trả về flase
                                            const isEligibleB = totalCart >= b?.minOrderValue;
                                            return (isEligibleB ? 1 : 0) - (isEligibleA ? 1 : 0);
                                        })
                                        ?.map((voucher: IVoucher, index: number) => (
                                            <li key={index}
                                                className={`border border-gray-300 rounded-lg p-4 flex items-center justify-between transition-colors duration-200 ease-in-out ${selectedVoucher === voucher?.code ? 'bg-green-500 text-white' : totalCart < voucher?.minOrderValue
                                                    ? 'bg-gray-200 text-gray-500'
                                                    : 'hover:bg-gray-100'}`}
                                            >
                                                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 border-2 rounded-full bg-green-500 text-white text-lg font-semibold">
                                                <i className="fa-solid fa-truck-fast"></i>
                                                </div>
                                                <div className='ml-4 flex-grow'>
                                                    <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-600'}`}>
                                                        Giảm tối đa {Number(voucher?.maxDiscountValue) / 1000}{Number(voucher?.maxDiscountValue) > 1000000 ? "Tr" : "K"}
                                                    </p>
                                                    <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-600'}`}>
                                                        Đơn tối thiểu {voucher?.minOrderValue / 1000}{voucher?.minOrderValue > 1000000 ? "Tr" : "K"}
                                                    </p>
                                                    <div className='flex gap-4'>
                                                        <p className={`text-sm ${selectedVoucher === voucher?.code ? 'text-white' : 'text-gray-400'}`}>
                                                            HSD: {moment(voucher?.endDate).format('DD/MM/YYYY')}
                                                        </p>
                                                        <span className='text-sm text-blue cursor-pointer' onClick={() => handleViewDetail(voucher)}>Điều kiện</span>
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
                        </div>
                    </div>

                    {/* Đặt lớp "sticky" để nút "Đồng ý" cố định */}
                    <div className="mt-1 flex justify-end sticky bottom-0 bg-white p-4">
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={handleConfirmVoucher}
                        >
                            Đồng ý
                        </button>
                    </div>

                </div>

            </div>) : (<DetailVoucher
                voucher={detailVoucher!}
                onBack={handleBackToList}
            />)}
        </>

    )
}

export default ListVoucher;
