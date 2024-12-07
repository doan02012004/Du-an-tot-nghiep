
import { useState } from 'react'
import { Iaddress } from '../../../../common/interfaces/address'
import OrderListAddress from './OrderListAddress'

type Props = {
    address: Iaddress,
    listAddress: Iaddress[]
}

const OrderAddressItem = ({ address, listAddress }: Props) => {
    const [isOpenAddress, setIsOpenAddress] = useState(false)
    const [addressOrder, setAddressOrder] = useState(address)

    return (
        <div className=" py-6">
            <div className="my-4 border rounded-tl-[30px] rounded-br-[30px]">
                <div className="px-5 py-6 lg:py-8 lg:px-10 justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-lg text-black font-semibold">{addressOrder?.fullname}</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsOpenAddress(!isOpenAddress)} className='underline'><u>Chọn địa chỉ khác</u></button>
                            {addressOrder.isDefault && (
                                <button disabled className="bg-black rounded-tl-[10px] cursor-pointer rounded-br-[10px] px-4 py-2 text-white hover:bg-white hover:text-black hover:outline hover:outline-1 hover:outline-black">MẶC ĐỊNH</button>
                            )}
                        </div>
                    </div>
                    {isOpenAddress && (
                        <OrderListAddress
                            addressOrder={addressOrder}
                            setAddressOrder={setAddressOrder}
                            listAddress={listAddress}
                            setIsOpenAddress={setIsOpenAddress}
                        />
                    )}

                    <div className="flex flex-col gap-2">
                        <span className='text-sm'>Điện thoại: {addressOrder?.phone}</span>
                        <span className='text-sm'>Địa chỉ: {addressOrder.address}, {addressOrder?.district}, {addressOrder?.city}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderAddressItem