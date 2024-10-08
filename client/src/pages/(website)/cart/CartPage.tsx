
import { useNavigate } from 'react-router-dom'
import Status from './_components/Status'
import Table from './_components/Table'
import Total from './_components/Total'
import useCartQuery from '../../../common/hooks/carts/useCartQuery'
import { message } from 'antd'

const CartPage = () => {
    const { data: cartUser } = useCartQuery()
    const navigate = useNavigate()
    const onHandleCheckToOrder = () => {
        if (!cartUser || cartUser?.totalCart == 0) {
            return message.error("Hiện tại chưa có sản phẩm nào")
        }
        else {
            return navigate("/order")
        }
    }
    return (
        <section>
            <div>
                <div className="container mx-auto lg:flex pt-11 pb-4 lg:gap-10">
                    <div className="lg:w-[68%]">
                        <Status />
                        <div className="py-6 lg:py-11 flex gap-2 items-center">
                            <span className="text-sm lg:text-2xl text-[#000000] font-bold">Giỏ hàng của bạn</span>
                            <span className="text-sm lg:text-2xl text-red font-bold">{cartUser ? cartUser?.totalCart : "0"} Sản Phẩm</span>
                        </div>
                        <Table cartUser={cartUser} />
                        <div className="py-6 lg:pt-7">
                            <a href="/product" className="w-[60%] flex items-center border border-black lg:w-[30%] py-3 justify-center gap-2 rounded-tl-[20px] rounded-br-[20px] hover:bg-black hover:text-white">
                                <span><i className="fa-solid fa-arrow-left-long" /></span>
                                <button>Tiếp tục mua hàng</button>
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-[32%]">
                        <Total cartUser={cartUser} />
                        <button onClick={onHandleCheckToOrder} className="bg-black text-white w-full py-3 text-lg font-semibold rounded-tl-[20px] rounded-br-[20px] hover:bg-white hover:text-black hover:border hover:border-black">ĐẶT HÀNG</button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CartPage