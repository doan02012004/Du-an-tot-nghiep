import { useEffect, useState } from 'react';
import { formatPrice } from '../../../../common/utils/product';
import { IVoucher } from '../../../../common/interfaces/voucher';
import ListVoucher from './ListVoucher';
import { getVoucherByCode } from '../../../../services/voucher';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalSubmit, setVoucher } from '../../../../common/redux/features/cartSlice';
import VoucherDiscount from './VoucherDiscount';
import { IshipSubmit } from '../../../../common/interfaces/orderInterfaces'
import VoucherShipping from './VoucherShipping';
import { IcartItem } from '../../../../common/interfaces/cart';

type Props = {
    carts:IcartItem
    totalCart: number;
    vouchers: IVoucher[];
    shippingCost: IshipSubmit | null // Thêm shippingCost vào props
};

const OrderTotal = ({ totalCart, vouchers, shippingCost,carts }: Props) => {
    const [displayVoucher, setDisplayVoucher] = useState(false);
    const [selectedVoucherCode, setSelectedVoucherCode] = useState(''); // State để lưu mã voucher
    const voucher = useSelector((state: any) => state.cart.voucher) as IVoucher
    const totalSubmit = useSelector((state: any) => state.cart.totalSubmit)
    const dispatch = useDispatch()
    useEffect(() => {
        // Tính lại tổng giá trị đơn hàng (totalCart)
        dispatch(setTotalSubmit(totalCart));
    
        // Nếu có voucher, tính lại giá trị giảm giá
        if (voucher) {
            let newTotalSubmit = totalCart;
    
            if (voucher.category === 'discount') {
                if (voucher.type === 'percentage') {
                    const discount = totalCart * voucher.value / 100;
                    const maxDiscount = voucher.maxDiscountValue;
                    newTotalSubmit -= Math.min(discount, maxDiscount || discount);
                } else if (voucher.type === 'fixed') {
                    newTotalSubmit -= voucher.value;
                }
            }
    
            dispatch(setTotalSubmit(newTotalSubmit));
        }
    }, [carts, voucher, totalCart, dispatch]);
    const handleVoucherSelect = (voucherCode: string) => {
        setSelectedVoucherCode(voucherCode); // Cập nhật mã voucher vào state
    };
    const onAplly = async () => {
        if (selectedVoucherCode) {
            try {
                const data = await getVoucherByCode(selectedVoucherCode)// Gọi API lấy voucher theo mã 
                if (data) {
                    dispatch(setVoucher(data))
                } else {
                    dispatch(setVoucher(null))
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            message.error("Chưa tồn tại mã")
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedVoucherCode(value); // Cập nhật mã trong state
        if (value.trim() === '') {
            // Nếu người dùng xóa hết, reset voucher
            dispatch(setTotalSubmit(totalCart))
            dispatch(setVoucher(null));
        }else if (value !== voucher?.code){
            dispatch(setTotalSubmit(totalCart))
            dispatch(setVoucher(null));
        }
    };
    useEffect(() => {
        // Reset Redux state khi component mount vào trang Order
        dispatch(setVoucher(null));
        dispatch(setTotalSubmit(totalCart));
    }, []); // Chỉ chạy 1 lần khi mount
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
                    {voucher && voucher.category == 'discount' && (
                        <VoucherDiscount voucher={voucher} setSelectedVoucherCode={selectedVoucherCode} />
                    )}
                    {voucher && voucher.category == 'shipping' && (
                        <VoucherShipping voucher={voucher} setSelectedVoucherCode={selectedVoucherCode} shippingCost={shippingCost}/>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Phí vận chuyển</span>
                        <span className="text-sm">{shippingCost ? formatPrice(shippingCost?.value?.price ? shippingCost?.value?.price : 0) : "0"}đ</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-5">
                        <span className="text-sm">Tiền thanh toán</span>
                        {/* <span className="text-lg text-dark font-semibold">{totalCart > 0 ? (voucher && totalSubmit ? formatPrice(totalSubmit) : formatPrice(totalCart)) : "0"}đ</span> */}
                        <span className="text-lg text-dark font-semibold">{shippingCost ? (totalSubmit > 0 ? formatPrice(totalSubmit + shippingCost?.value?.price) : formatPrice(totalCart + shippingCost?.value?.price)) : formatPrice(totalCart)}đ</span>
                    </div>
                </div>
                <div className="px-5 pb-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between lg:justify-around">
                        <span className="lg:text-lg text-black font-semibold">Mã phiếu giảm giá</span>
                        <div className="w-[1px] h-6 bg-black" />
                        <button className="lg:text-lg text-gray-400 font-semibold" id="zoomVoucher" onClick={() => setDisplayVoucher(!displayVoucher)}>
                            Mã của tôi
                        </button>
                        {/* <button className="lg:text-lg text-gray-400 font-semibold" onClick={() => setDisplayVoucher(!displayVoucher)}>Mã của tôi</button> */}
                    </div>
                    <div className="flex items-center gap-3 justify-between">
                        {/* Ô input sử dụng giá trị từ selectedVoucherCode */}
                        <input
                            type="text"
                            className="placeholder:text-sm border rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:placeholder:text-base"
                            placeholder="Mã giảm giá"
                            value={selectedVoucherCode} // Hiển thị mã đã chọn
                            onChange={(e) => handleInputChange(e)} // Gọi hàm xử lý khi nhập liệu
                        />
                        <button className="text-sm lg:text-base bg-white px-3 lg:px-1 py-1 lg:py-3 rounded-tl-[20px] rounded-br-[20px] font-semibold text-black border-black border hover:bg-black hover:text-white"
                            onClick={onAplly}
                        >
                            ÁP DỤNG
                        </button>

                    </div>
                    <div>
                        <select className="text-sm border w-full rounded-md py-3 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base">
                            <option value=''>Mã nhân viên hỗ trợ</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Modal chọn voucher */}
            <ListVoucher
                displayVoucher={displayVoucher}
                setDisplayVoucher={setDisplayVoucher}
                vouchers={vouchers}
                onVoucherSelect={handleVoucherSelect} // Truyền callback để cập nhật voucher
            />
        </>
    );
};

export default OrderTotal;

