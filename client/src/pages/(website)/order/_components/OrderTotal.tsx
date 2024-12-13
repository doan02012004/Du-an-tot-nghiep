import { useContext, useEffect, useState } from 'react';
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
import { AppContext } from '../../../../common/contexts/AppContextProvider';

type Props = {
    carts: IcartItem
    totalCart: number;
    vouchers: IVoucher[];
    shippingCost: IshipSubmit | null // Thêm shippingCost vào props
};

const OrderTotal = ({ totalCart, vouchers, shippingCost, carts }: Props) => {
    const { socket } = useContext(AppContext)
    const [displayVoucher, setDisplayVoucher] = useState(false);
    const [selectedVoucherCode, setSelectedVoucherCode] = useState(''); // State để lưu mã voucher
    const { currentUser } = useContext(AppContext)
    const voucher = useSelector((state: any) => state.cart.voucher) as IVoucher
    const totalSubmit = useSelector((state: any) => state.cart.totalSubmit)
    const dispatch = useDispatch()
    useEffect(() => {
        if (socket?.current) {
            socket?.current.on('deleteVoucher', (data: any) => {
                if (data._id === voucher?._id) {
                    message.error('Voucher đã bị xoá')
                    dispatch(setVoucher(null))
                }
            })
        }
    }, [socket?.current, voucher])
    useEffect(() => {
        const socketCurrent = socket?.current;
        const handleUpdateVoucher = (data: any) => {
            if (data._id === voucher?._id) {
                message.warning('Voucher đã được update')
                dispatch(setVoucher(data))
                if (!voucher?.usedBy?.includes(currentUser?._id)) {
                    if (voucher?.status == true) {
                        if (new Date(voucher?.endDate) >= new Date()) {
                            if (voucher?.quantity > 0) {
                                if (totalCart >= voucher?.minOrderValue) {
                                    if (data.type == 'fixed') {
                                        const newTotalSubmit = totalCart - data?.value
                                        if (Number(newTotalSubmit) < 0) {
                                            dispatch(setTotalSubmit(0))
                                        } else {
                                            dispatch(setTotalSubmit(newTotalSubmit))
                                        }
                                    } else if (data.type == 'percentage') {
                                        const discountVoucher = totalCart * data?.value / 100
                                        if (data?.maxDiscountValue && data?.maxDiscountValue > discountVoucher) {
                                            const newTotalSubmit = totalCart - discountVoucher
                                            if (Number(newTotalSubmit) < 0) {
                                                dispatch(setTotalSubmit(0))
                                            } else {
                                                dispatch(setTotalSubmit(newTotalSubmit))
                                            }
                                        } else {
                                            const newTotalSubmit = totalCart - Number(data?.maxDiscountValue)
                                            if (Number(newTotalSubmit) < 0) {
                                                dispatch(setTotalSubmit(0))
                                            } else {
                                                dispatch(setTotalSubmit(newTotalSubmit))
                                            }
                                        }
                                    }else if (data.type == 'freeship'){
                                        if (Number(data?.maxDiscountValue) >= Number(shippingCost?.value?.price)) {
                                            const newTotalSubmit = totalCart - Number(shippingCost?.value?.price)
                                            if (Number(newTotalSubmit) < 0) {
                                                dispatch(setTotalSubmit(0))
                                            } else {
                                                dispatch(setTotalSubmit(newTotalSubmit))
                                            }
                                        } else {
                                            const newTotalSubmit = totalCart - Number(data?.maxDiscountValue)
                                            if (Number(newTotalSubmit) < 0) {
                                                dispatch(setTotalSubmit(0))
                                            } else {
                                                dispatch(setTotalSubmit(newTotalSubmit))
                                            }
                                        }
                                    }
                                }else{
                                    dispatch(setVoucher(null))
                                }
                            }else{
                                dispatch(setVoucher(null))
                            }
                        }else{
                            dispatch(setVoucher(null))
                        }
                    }else{
                        dispatch(setVoucher(null))
                    }
                }else{
                    dispatch(setVoucher(null))
                }
                
                

            }
        };
        if (socketCurrent) {
            // Gỡ bỏ listener cũ trước khi đăng ký mới
            socketCurrent.off('updateVoucher', handleUpdateVoucher);
            socketCurrent.on('updateVoucher', handleUpdateVoucher);
        }
    
        // Cleanup function để gỡ listener khi component unmount
        return () => {
            if (socketCurrent) {
                socketCurrent.off('updateVoucher', handleUpdateVoucher);
            }
        };
    }, [socket?.current, voucher,totalCart])
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
            }else{
                if (voucher.type === 'freeship') {
                    newTotalSubmit -= Math.min(Number(voucher?.maxDiscountValue), shippingCost?.value?.price || Number(voucher?.maxDiscountValue))
                }
            }

            dispatch(setTotalSubmit(newTotalSubmit));
        }
    }, [carts, voucher, totalCart, dispatch]);
    useEffect(() => {
        if (!voucher) {
            setSelectedVoucherCode('');
        }
    }, [voucher]);
    const handleVoucherSelect = (voucherCode: string) => {
        setSelectedVoucherCode(voucherCode); // Cập nhật mã voucher vào state
    };
    const onAplly = async () => {
        if (selectedVoucherCode) {
            if (selectedVoucherCode !== voucher?.code) {
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
                message.error("Mã đã tồn tại")
            }
        } else {
            message.error("Mã không hợp lệ")
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedVoucherCode(value); // Cập nhật mã trong state
        if (value.trim() === '') {
            // Nếu người dùng xóa hết, reset voucher
            dispatch(setTotalSubmit(totalCart))
            dispatch(setVoucher(null));
        } else if (value !== voucher?.code) {
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
                    {voucher && voucher.category == 'discount' && (
                        <VoucherDiscount voucher={voucher} setSelectedVoucherCode={selectedVoucherCode} />
                    )}
                    {voucher && voucher.category == 'shipping' && (
                        <VoucherShipping voucher={voucher} setSelectedVoucherCode={selectedVoucherCode} shippingCost={shippingCost} />
                    )}
                    <div className="flex justify-between items-center">
                        <span className="text-sm">Phí vận chuyển</span>
                        <span className="text-sm">{shippingCost ? formatPrice(shippingCost?.value?.price ? shippingCost?.value?.price : 0) : "0"}đ</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-5">
                        <span className="text-sm">Tiền thanh toán</span>
                        {/* <span className="text-lg text-dark font-semibold">{totalCart > 0 ? (voucher && totalSubmit ? formatPrice(totalSubmit) : formatPrice(totalCart)) : "0"}đ</span> */}
                        <span className="text-lg text-dark font-semibold">{shippingCost ? (totalSubmit >= 0 ? formatPrice(totalSubmit + shippingCost?.value?.price) : formatPrice(totalCart + shippingCost?.value?.price)) : formatPrice(totalCart)}đ</span>
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

