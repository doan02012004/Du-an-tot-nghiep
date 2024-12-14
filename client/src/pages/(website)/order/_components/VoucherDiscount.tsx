import { useContext, useEffect } from "react"
import { IVoucher } from "../../../../common/interfaces/voucher"
import { useDispatch, useSelector } from "react-redux"
import { message } from "antd"
import { formatPrice } from "../../../../common/utils/product"
import { setTotalSubmit, setVoucher } from "../../../../common/redux/features/cartSlice"
import { AppContext } from "../../../../common/contexts/AppContextProvider"


type Props = {
    voucher: IVoucher,
    setSelectedVoucherCode: any
}

const VoucherDiscount = ({ voucher, setSelectedVoucherCode }: Props) => {
    const totalCart = useSelector((state: any) => state.cart.totalCart)
    const totalSubmit = useSelector((state: any) => state.cart.totalSubmit)
    const carts = useSelector((state: any) => state.cart.carts)
    const { currentUser } = useContext(AppContext)
    const dispatch = useDispatch()
    useEffect(() => {
        // Reset totalSubmit về totalCart khi voucher thay đổi
        dispatch(setTotalSubmit(totalCart));
        if (carts.lenght !== 0) {
            if (voucher) {
                if (!voucher?.usedBy?.includes(currentUser?._id)) {
                    if (voucher?.status == true) {
                        if (new Date(voucher?.endDate) >= new Date()) {
                            if (voucher?.quantity > 0) {
                                if (voucher?.type === "percentage") {
                                    if (voucher?.minOrderValue <= totalCart) {
                                        const discountVoucher = totalCart * voucher?.value / 100
                                        if (voucher?.maxDiscountValue && voucher?.maxDiscountValue > discountVoucher) {
                                            const totalSubmit = totalCart - discountVoucher
                                            if (Number(totalSubmit) < 0) {
                                                dispatch(setTotalSubmit(0))
                                            } else {
                                                dispatch(setTotalSubmit(totalSubmit))
                                            }
                                        } else {
                                            const totalSubmit = totalCart - Number(voucher?.maxDiscountValue)
                                            if (Number(totalSubmit) < 0) {
                                                dispatch(setTotalSubmit(0))
                                            } else {
                                                dispatch(setTotalSubmit(totalSubmit))
                                            }
                                        }

                                    } else {
                                        dispatch(setTotalSubmit(totalCart));  // Reset totalSubmit về totalCart
                                        message.error("Tổng giá không đủ điều kiện");
                                        dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                                    }
                                } else {
                                    if (totalCart >= voucher?.minOrderValue) {
                                        const totalSubmit = totalCart - voucher?.value
                                        if (Number(totalSubmit) < 0) {
                                            dispatch(setTotalSubmit(0))
                                        } else {
                                            dispatch(setTotalSubmit(totalSubmit))
                                        }
                                    } else {
                                        dispatch(setTotalSubmit(totalCart));  // Reset totalSubmit về totalCart
                                        dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                                        message.error("Tổng giá không đủ điều kiện");
                                    }
                                }
                            } else {
                                message.error("Số lượng voucher đã hết");
                                dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                            }

                        } else {
                            message.error("Voucher đã hết hạn sử dụng");
                            dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                        }
                    } else {
                        message.error("Voucher không còn hoạt động");
                        dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                    }

                } else {
                    message.error("Bạn đã sử dụng voucher này rồi");
                    dispatch(setVoucher(null));  // Đặt voucher về null sau khi thông báo lỗi
                }

            } else {
                dispatch(setTotalSubmit(0))
            }
        } else {
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