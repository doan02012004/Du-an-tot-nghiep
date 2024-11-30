
import { IcartItem } from '../../../../common/interfaces/cart'
import ItemProduct from './ItemProduct'
import ItemProductMobi from './ItemProductMobi'

type Props = {
    cart: IcartItem[]
}

const ProductDisplay = ({ cart }: Props) => {
    return (
        <div>
            <div className="hidden lg:block">
            <h1 className='text-2xl pb-3 font-bold text-black'>Giỏ hàng của bạn</h1>
            <table className="lg:w-full min-w-[600px]">
                <thead>
                    <tr className="*:pb-5">
                        <th className="text-left text-sm ">TÊN SẢN PHẨM</th>
                        <th className="text-[10px] text-sm ">GIÁ SẢN PHẨM</th>
                        <th className="text-[10px] text-sm ">SỐ LƯỢNG</th>
                        <th className="text-[10px] text-sm  pl-4">TỔNG GIÁ</th>
                        <th />
                    </tr>
                </thead>
                {
                    cart?.map((item: IcartItem) => (
                        <ItemProduct cart={item} key={item.attributeId}/>
                    ))
                }

            </table>
            
        </div>
            {
                    cart?.map((item: IcartItem) => (
                        <ItemProductMobi cart={item} key={item.attributeId}/>
                    ))
                }
        </div>
        
        
    )
}

export default ProductDisplay