import { useEffect} from "react"
import { IVoucher } from "../../../../common/interfaces/voucher"
import { useDispatch, useSelector } from "react-redux"
import { message } from "antd"
import { formatPrice } from "../../../../common/utils/product"
import { setTotalSubmit, setVoucher } from "../../../../common/redux/features/cartSlice"


type Props = {
    voucher: IVoucher,
    setSelectedVoucherCode: any
}

const VoucherDiscount = ({ voucher, setSelectedVoucherCode }: Props) => {
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalSubmit = useSelector((state: any) => state.cart.totalSubmit)
    const carts = useSelector((state: any) => state.cart.carts)
    const dispatch = useDispatch()
    useEffect(() => {
        // Reset totalSubmit về totalCart khi voucher thay đổi
        dispatch(setTotalSubmit(totalCart));
        if (carts.lenght !== 0) {
            if (voucher) {
                if (voucher?.type === "percentage") {
                    if (voucher?.status == true || new Date(voucher?.endDate) >= new Date()) {
                        if (voucher?.quantity >= Number(voucher?.usedQuantity)) {
                            if (voucher?.minOrderValue <= totalCart) {
                                if (voucher?.scope == "all") {
                                    const discountVoucher = totalCart * voucher?.value / 100
                                    if (voucher?.maxDiscountValue && voucher?.maxDiscountValue > discountVoucher) {
                                        const totalSubmit = totalCart - discountVoucher
                                        dispatch(setTotalSubmit(totalSubmit))
                                    } else {
                                        const totalSubmit = totalCart - Number(voucher?.maxDiscountValue)
                                        dispatch(setTotalSubmit(totalSubmit))
                                    }
                                } else {
                                    const hasIneligibleProduct = carts?.some((cartItem: any) =>
                                        !voucher?.applicableProducts?.includes(cartItem?.productId._id)
                                    );
                                    if (hasIneligibleProduct) {
                                        dispatch(setTotalSubmit(totalCart));  // Reset totalSubmit về totalCart
                                        message.error("Giỏ hàng có chứa sản phẩm không đủ điều kiện áp dụng mã giảm giá");
        
                                        setTimeout(() => {
                                            dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                                        }, 0);  // Đặt voucher về null sau một khoảng ngắn để message xuất hiện trước
        
                                    } else {
                                        const discountVoucher = totalCart * voucher?.value / 100
                                        if (voucher?.maxDiscountValue && voucher?.maxDiscountValue > discountVoucher) {
                                            const totalSubmit = totalCart - discountVoucher
                                            dispatch(setTotalSubmit(totalSubmit))
                                        } else {
                                            const totalSubmit = totalCart - Number(voucher?.maxDiscountValue)
                                            dispatch(setTotalSubmit(totalSubmit))
                                        }
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
                    if (voucher?.status == true || new Date(voucher?.endDate) >= new Date()) {
                        if (voucher?.quantity >= Number(voucher?.usedQuantity)) {
                            if (totalCart >= voucher?.minOrderValue) {
                                if (voucher?.scope == "all") {
                                    const totalSubmit = totalCart - voucher?.value
                                    if(Number(totalSubmit)<0){
                                        dispatch(setTotalSubmit(0))
                                    }else{
                                        dispatch(setTotalSubmit(totalSubmit))
                                    }
                                } else {
                                    const hasIneligibleProduct = carts?.some((cartItem: any) =>
                                        !voucher?.applicableProducts?.includes(cartItem?.productId._id)
                                    );
                                    if (hasIneligibleProduct) {
                                        dispatch(setTotalSubmit(totalCart));  // Reset totalSubmit về totalCart
                                        message.error("Giỏ hàng có chứa sản phẩm không đủ điều kiện áp dụng mã giảm giá");
            
                                        setTimeout(() => {
                                            dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                                        }, 0);  // Đặt voucher về null sau một khoảng ngắn để message xuất hiện trước
                                    } else {
                                        const totalSubmit = totalCart - voucher?.value
                                        dispatch(setTotalSubmit(totalSubmit))
                                    }
                                }
                            } else {
                                dispatch(setTotalSubmit(totalCart));  // Reset totalSubmit về totalCart
                                message.error("Tổng giá không đủ điều kiện");
                                setTimeout(() => {
                                    dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                                }, 0);  // Đặt voucher về null sau một khoảng ngắn để message xuất hiện trước
                            }
                        }else{
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
                    
                }
            } else {
                dispatch(setTotalSubmit(0))
            }
        }else{
            dispatch(setTotalSubmit(totalCart))
        }
        
    }, [voucher, setSelectedVoucherCode, totalCart])
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm">Giảm giá</span>
            <span className="text-sm">
                -{voucher?.scope === "all"
                    ? voucher?.type === "percentage"
                        ? `${formatPrice(Math.min(totalCart * voucher.value / 100, Number(voucher.maxDiscountValue)))}`
                        : `${formatPrice(Math.min(voucher.value))}`
                    : totalSubmit < totalCart
                        ? voucher?.type === "percentage"
                            ? `${formatPrice(Math.min(totalCart * voucher.value / 100, Number(voucher.maxDiscountValue)))}`
                            : `${formatPrice(Math.min(voucher.value))}`
                        : "0"}đ
            </span>
        </div>
    )
}

export default VoucherDiscount