import React from 'react'
import { Iaddress } from '../../../../common/interfaces/address'
import closeIcon from '../../../../assets/icons/x-letter.svg'


type Props = {
    listAddress: Iaddress[],
    isOpenAddress : boolean
}

const OrderListAddress = ({ listAddress, isOpenAddress }: Props) => {

    const aa= false;
    
    return (
        <div className='fixed top-0 left-0 bg-black/30 w-full h-full z-50 flex justify-center'>
            <div className=" py-6">
                <div className="my-4 rounded-md  w-[320px] lg:w-[700px] pt-6 bg-white">
                    <div className="flex justify-between">
                        <div className="mx-6 mb-4">Chọn địa chỉ</div>
                        <div className="mx-6 mb-4">
                            <button onClick={() => isOpenAddress = aa}>
                                <img src={closeIcon} alt="" srcSet="" />
                            </button>
                        </div>
                    </div>
                    <div className=" w-[100%] bg-slate-400 h-[1px]"></div>
                    <div className="px-6 py-6">
                        {listAddress && listAddress.map(address => (
                            <div className="px-5 mt-4 rounded-tl-[30px] rounded-br-[30px] border border-green-500 py-6 lg:py-8 lg:px-10 justify-between">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg text-black font-semibold">{address?.fullname} {address.option == "house" ? "(Nhà riêng)" : "(Cơ quan)"}</span>
                                    <div className="flex items-center gap-2">
                                        <button disabled className="bg-black rounded-tl-[10px] cursor-pointer rounded-br-[10px] px-4 py-2 text-white hover:bg-white hover:text-black hover:border hover:border-black">MẶC ĐỊNH</button>
                                    </div>
                                </div>
                                <div className="flex  flex-col gap-2">
                                    <span className='text-sm'>Điện thoại: {address?.phone}</span>
                                    <span className='text-sm'>Địa chỉ: {address.address}, {address?.district}, {address?.city}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderListAddress