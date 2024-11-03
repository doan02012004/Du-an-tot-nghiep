import { useEffect, useState } from "react"
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
    const [productCheck, setProductCheck] = useState<any[]>([])
    const [totalEligibleProducts, setTotalEligibleProducts] = useState<number>() // tổng sản phẩm đủ điều kiện
    const dispatch = useDispatch()
    console.log(carts)
    useEffect(() => {
        if (voucher?.scope !== "all" && voucher?.applicableProducts) {
            const updatedProductCheck = carts.filter((cartItem: any) => {
                const isApplicable = voucher.applicableProducts.some(
                    (applicableProduct: any) =>
                        applicableProduct.productId === cartItem.productId._id &&
                        applicableProduct.attributeId === cartItem.attributeId
                );
                return isApplicable && cartItem.quantity > 0; // Chỉ giữ sản phẩm đủ điều kiện và có số lượng > 0
            });
            setProductCheck(updatedProductCheck);
        } else {
            // Nếu không có voucher, reset productCheck và totalEligibleProducts
            setProductCheck([]);
            setTotalEligibleProducts(0);
        }
    }, [carts, voucher]); // cập nhật lại productCheck khi tăng giảm số lượng
    
    useEffect(() => {
       if(voucher){
        if (voucher?.type === "percentage") {
            if (voucher?.minOrderValue <= totalCart) {
                if (voucher?.scope == "all") {
                    const discountVoucher = totalCart * voucher?.value / 100
                    setProductCheck([])
                    if (voucher?.maxDiscountValue && voucher?.maxDiscountValue > discountVoucher) {
                        const totalSubmit = totalCart - discountVoucher
                        dispatch(setTotalSubmit(totalSubmit))
                    } else {
                        const totalSubmit = totalCart - Number(voucher?.maxDiscountValue)
                        dispatch(setTotalSubmit(totalSubmit))
                    }
                } else {
                    carts?.map((cartItem: any) => {
                        const check = voucher?.applicableProducts?.includes(cartItem?.productId._id)//list qua toàn bộ giỏ hàng để kiểm tra xem có sp nào đủ đk để áp dụng mã giảm giá này không
                        if (check) {
                            // Kiểm tra xem sản phẩm đã tồn tại trong productCheck hay chưa
                            setProductCheck((productCheck) => {
                                const isAlreadyInArray = productCheck.some(
                                    (item) => item.productId._id === cartItem.productId._id &&
                                    item.attributeId === cartItem.attributeId
                                );
                                if (!isAlreadyInArray) {
                                    return [...productCheck, cartItem];
                                }
                                return productCheck; // Nếu đã tồn tại, trả về mảng hiện tại mà không thay đổi
                            });
                        } 
                    })
                  
                    
                }

            } else {
                dispatch(setVoucher(null))
                dispatch(setTotalSubmit(0))
                console.log("Đã vào, tổng cart", totalCart)
                // return message.error('Mã không đủ điều kiện!')
            }
        } else {
            if (totalCart >= voucher?.minOrderValue) {
                if (voucher?.scope == "all") {
                    const totalSubmit = totalCart - voucher?.value
                    dispatch(setTotalSubmit(totalSubmit))
                    setProductCheck([])
                } else {
                    carts?.map((cartItem: any) => {
                        const check = voucher?.applicableProducts?.includes(cartItem?.productId._id)//list qua toàn bộ giỏ hàng để kiểm tra xem có sp nào đủ đk để áp dụng mã giảm giá này không
                        if (check) {
                            // Kiểm tra xem sản phẩm đã tồn tại trong productCheck hay chưa
                            setProductCheck((productCheck) => {
                                const isAlreadyInArray = productCheck.some(
                                    (item) => item.productId._id === cartItem.productId._id &&
                                    item.attributeId === cartItem.attributeId
                                );
                                if (!isAlreadyInArray) {
                                    return [...productCheck, cartItem];
                                }
                                return productCheck; // Nếu đã tồn tại, trả về mảng hiện tại mà không thay đổi
                                
                            });
                        }
                    })
                    

                }
            } else {
                dispatch(setVoucher(null))
                dispatch(setTotalSubmit(0))
                // return message.error('Mã không đủ điều kiện!')
            }
        }
       }else{
        setProductCheck([])
        dispatch(setTotalSubmit(0))
       }
    }, [voucher, setSelectedVoucherCode,totalCart])
    useEffect(() => {
       
        if (productCheck && productCheck.length > 0) {
            const total = productCheck.reduce((sum, item) => sum + (item?.total || 0), 0) // tính tổng sản phẩm đủ điều kiện
            setTotalEligibleProducts(total)
        }

    }, [productCheck])
    useEffect(()=>{
  
        if (voucher && productCheck && productCheck.length > 0) {
            if (voucher?.type === "percentage") {
                if (Number(totalEligibleProducts) >= voucher?.minOrderValue) {
                    const discountVoucher = Number(totalEligibleProducts) * voucher?.value / 100
                    if (voucher?.maxDiscountValue && voucher?.maxDiscountValue > discountVoucher) {
                        console.log("Đã vào 1")
                        const totalSubmit = totalCart - discountVoucher
                        dispatch(setTotalSubmit(totalSubmit))
                    } else {
                        console.log("Đã vào 2")
                        const totalSubmit = totalCart - Number(voucher?.maxDiscountValue)
                        dispatch(setTotalSubmit(totalSubmit))
                    }
                } else {
                    return message.error("Tổng sản phẩm đủ kiều không đủ kiều kiện để sử dụng mã")
                }
            }else{
                if (Number(totalEligibleProducts) >= voucher?.minOrderValue) {
                    console.log("Đã vào 3")
                    const totalSubmit = totalCart - voucher?.value
                    dispatch(setTotalSubmit(totalSubmit))
                } else {
                    return message.error("Tổng sản phẩm đủ kiều không đủ kiều kiện để sử dụng mã")
                }
            }
        }

    },[productCheck,totalEligibleProducts,voucher,totalCart])
    console.log(productCheck)
    console.log(totalEligibleProducts)
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm">Giảm giá</span>
            <span className="text-sm">
                -{voucher?.scope === "all"
                    ? voucher?.type === "percentage"
                        ? `${formatPrice(Math.min(totalCart * voucher.value / 100, Number(voucher.maxDiscountValue) ))}`
                        : `${formatPrice(Math.min(voucher.value))}`
                    : productCheck.length > 0 && Number(totalEligibleProducts) >= voucher.minOrderValue
                        ? voucher?.type === "percentage"
                            ? `${formatPrice(Math.min(Number(totalEligibleProducts) * voucher.value / 100, Number(voucher.maxDiscountValue)))}`
                            : `${formatPrice(Math.min(voucher.value))}`
                        : "0"}đ
            </span>
        </div>
    )
}

export default VoucherDiscount