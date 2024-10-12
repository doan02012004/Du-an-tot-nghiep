
import { Iaddress } from '../../../../../common/interfaces/address'

type Props = {
    address: Iaddress
}

const AddressItem = ({address}:Props) => {
    return (
        <div className="w-full">
            <div className=" border rounded-tl-[30px] rounded-br-[30px]">
                <div className="px-5 py-3 lg:py-5 lg:px-6 justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-black font-semibold leading-7">{address?.fullname} {address.option=="house"? "(Nhà riêng)":"(Cơ quan)"}</span>
                        <div className="flex items-center gap-3">
                            <button className='text-sm underline'>Xóa</button>
                            <button>Sửa</button>
                            <button className={` ${address?.isDefault?"bg-black text-white": "bg-white text-black border-black"} border text-sm rounded-tl-[10px] rounded-br-[10px] px-3 py-2  hover:bg-white hover:text-black `}>MẶC ĐỊNH</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 *:leading-7">
                        <span className='text-sm'>Điện thoại: {address?.phone}</span>
                        <span className='text-sm'>Địa chỉ: {address?.district}, {address?.city}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressItem