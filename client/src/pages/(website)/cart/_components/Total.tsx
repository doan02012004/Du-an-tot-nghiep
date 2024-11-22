import { ICart } from "../../../../common/interfaces/cart"
import { formatPrice } from "../../../../common/utils/product"

type Props = {
    totalProduct: number,
    totalCart: number
}
const Total = ({totalCart,totalProduct}:Props) => {
    
    return (
        <div className="bg-[#FBFBFC]">
            <div className="flex flex-col gap-4 px-5 pt-4 pb-8">
                <span className="text-xl text-[#000000] font-medium">Tổng tiền giỏ hàng</span>
                <div className="flex items-center justify-between">
                    <span className="text-sm">Tổng sản phẩm</span>
                    <span className="text-sm">{totalProduct}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">Tổng tiền hàng</span>
                    <span className="text-sm">{totalCart>0 ?formatPrice(totalCart):"0"}đ</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">Thành tiền</span>
                    <span className="text-lg font-semibold text-dark">{totalCart>0 ?formatPrice(totalCart):"0"}đ</span>
                </div>
                <div className="flex items-center justify-between pb-5 border-b">
                    <span className="text-sm">Tạm tính</span>
                    <span className="text-lg font-semibold text-dark">{totalCart>0 ?formatPrice(totalCart):"0"}đ</span>
                </div>
                <div>
                    <span className="text-red"><i className="fa-solid fa-circle-exclamation" /></span>
                    <span className="text-sm text-red">Miễn <strong>đổi trả</strong> đối với sản phẩm đồng giá / sale trên 50%</span>
                </div>
            </div>
        </div>
    )
}

export default Total