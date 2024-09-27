import { useState } from 'react'



const OrderFormAddress = () => {
    const [address, setAddress] = useState<number | null>(null)
    const onClickAddress = (number: number) => {
        if (address == null || address !== number) {
            setAddress(number)
        } else {
            setAddress(null)
        }
    }
  return (
    <div className="flex flex-col gap-6">
    <div className="flex gap-2 items-center">
        <span className="size-4 bg-black rounded-full text-white text-sm flex items-center justify-center"><i className="fa-solid fa-check" /></span>
        <p className="text-sm font-semibold text-black lg:text-base">Địa chỉ</p>
    </div>
    <div className="w-full flex justify-between items-center gap-8">
        <input type="text" placeholder="Họ tên" className="placeholder:text-sm lg:text-base border rounded-md py-3 px-5 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-base placeholder-black " />
        <input type="text" placeholder="Số điện thoại" className="placeholder:text-sm lg:text-base border rounded-md py-3 px-5 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-base placeholder-black" />
    </div>
    <div className="w-full flex justify-between items-center gap-8" >
        <div className="w-full relative select-information" >
            <select onBlur={() => { setAddress(null) }} className="text-sm border rounded-md py-3 px-5 w-full appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  lg:text-base text-black" onClick={() => onClickAddress(1)}>
                <option disabled selected>Tỉnh/Thành Phố</option>
                <option >Hà nội</option>
            </select>
            <span className={`absolute right-5 top-1/2 -translate-y-1/2 ${address == 1 ? 'active' : 'anactive'}`}><i className="fa-solid fa-chevron-right" /></span>
        </div>
        <div className="w-full relative select-information">
            <select onBlur={() => { setAddress(null) }} className="text-sm border rounded-md py-3 px-5 w-full appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base text-black " onClick={() => onClickAddress(2)}>
                <option disabled selected>Quận/Huyện</option>
                <option>Hà nội</option>
            </select>
            <span className={`absolute right-5 top-1/2 -translate-y-1/2 ${address == 2 ? 'active' : 'anactive'}`}><i className="fa-solid fa-chevron-right" /></span>
        </div>
    </div>
    <div className="w-full relative select-information">
        <select onBlur={() => { setAddress(null) }} className="text-sm border rounded-md py-3 px-5 w-full appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base text-black " onClick={() => onClickAddress(3)}>
            <option disabled selected>Phường/Xã</option>
            <option >Hà nội</option>
        </select>
        <span className={`absolute right-5 top-1/2 -translate-y-1/2 ${address == 3 ? 'active' : 'anactive'}`}><i className="fa-solid fa-chevron-right" /></span>
    </div>
    <div>
        <input type="text" className="w-full  border rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:placeholder:text-base placeholder-black placeholder:text-sm" placeholder="Địa chỉ" />
    </div>
</div>
  )
}

export default OrderFormAddress