
import { Iaddress } from '../../../../common/interfaces/address'

type Props = {
    address: Iaddress
}

const OrderAddressItem = ({ address }: Props) => {
    return (
        <div className=" py-6">
            <div className="my-4 border rounded-tl-[30px] rounded-br-[30px]">
                <div className="px-5 py-6 lg:py-8 lg:px-10 justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-lg text-black font-semibold">{address?.fullname} {address.option == "house" ? "(Nhà riêng)" : "(Cơ quan)"}</span>
                        <div className="flex items-center gap-2">
                            <a href=''><u>Chọn địa chỉ khác</u></a>
                            <button className="bg-black rounded-tl-[10px] rounded-br-[10px] px-4 py-2 text-white hover:bg-white hover:text-black hover:border hover:border-black">MẶC ĐỊNH</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className='text-sm'>Điện thoại: {address?.phone}</span>
                        <span className='text-sm'>Địa chỉ: {address?.district}, {address?.city}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderAddressItem