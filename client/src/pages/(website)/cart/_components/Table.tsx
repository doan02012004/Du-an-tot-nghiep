
import { ICart, IcartItem } from '../../../../common/interfaces/cart'
import ItemCartMobile from './ItemCartMobile'
import ItemTable from './ItemTable'

type Props = {
    carts: IcartItem[]
}

const Table = ({carts}:Props) => {
   
    return (
        <div>
            <div className="hidden lg:block">
                <table className="lg:w-full">
                    <thead>
                        <tr className="*:pb-5">
                            <th className="text-left text-[10px] ">TÊN SẢN PHẨM</th>
                            <th className="text-[10px] text-left">GIÁ SẢN PHẨM</th>
                            <th className="text-[10px] text-left">SỐ LƯỢNG</th>
                            <th className="text-[10px] text-left pl-4">TỔNG GIÁ</th>
                            <th />
                        </tr>
                    </thead>
                    {
                        carts?.map((item:IcartItem)=>(
                            <ItemTable cart={item} key={item.attributeId}/>
                        ))
                    }
                    
                </table>
            </div>
            {
                carts?.map((item:IcartItem)=>(
                    <ItemCartMobile cart={item} key={item.attributeId}/>
                ))
            }
            
        </div>
    )
}

export default Table