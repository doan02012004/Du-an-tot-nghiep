
import useCartQuery from '../../../../common/hooks/carts/useCartQuery'
import { ICart } from '../../../../common/interfaces/cart'
import ItemCartMobile from './ItemCartMobile'
import ItemTable from './ItemTable'

type Props = {
    cartUser: ICart
}

const Table = ({cartUser}:Props) => {
   
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
                        cartUser?.carts?.map((item:any)=>(
                            <ItemTable cart={item} key={item.attributeId}/>
                        ))
                    }
                    
                </table>
            </div>
            {
                cartUser?.carts?.map((item:any)=>(
                    <ItemCartMobile cart={item} key={item.attributeId}/>
                ))
            }
            
        </div>
    )
}

export default Table