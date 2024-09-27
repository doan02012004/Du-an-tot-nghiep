/* eslint-disable @typescript-eslint/no-explicit-any */

import imageVisa from '../../../../assets/images/products/image 10.jpg'
type Props ={
    setPayment:any
    payment:"cash"|"atm"|"momo"|"credit"
}
const OrderPaymentMethod = ({setPayment,payment}:Props) => {
  
  return (
 
    <div className=''>
    <span className="text-lg lg:text-xl text-black font-semibold">Phương thức thanh toán</span>
    <div className="px-5 py-4 my-4 border rounded-tl-[30px] rounded-br-[30px] lg:py-8 lg:px-10 flex flex-col gap-8" >
        <span className="text-sm ">Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng sẽ không bao giờ
            được lưu lại.</span>
        <div className="  flex items-center gap-3">
            <div className={` cursor-pointer flex items-center gap-x-3`} onClick={() => setPayment("credit")}>
                <input type="radio" name="radio-example" id="payment" checked={payment == "credit" ? true : false} className='hidden' />
                <div className={`size-4 rounded-full border flex justify-center items-center  ${payment == "credit" ? 'bg-black' : ''} `}>
                    <span className={`text-white text-[12px] ${payment !== "credit" && 'hidden'}`}><i className="fa-solid fa-check" /></span>
                </div>
                <span className="text-sm text-black">Thanh toán bằng thẻ tín dụng</span>
            </div>

            <img src={imageVisa} />

        </div>
        <div className="  flex items-center gap-3">
            <div className={` cursor-pointer flex items-center gap-x-3`} onClick={() => setPayment("atm")}>
                <input type="radio" name="radio-example" id="payment" checked={payment == "atm" ? true : false} className='hidden' />
                <div className={`size-4 rounded-full border flex justify-center items-center  ${payment == "atm" ? 'bg-black' : ''} `}>
                    <span className={`text-white text-[12px] ${payment !== "atm" && 'hidden'}`}><i className="fa-solid fa-check" /></span>
                </div>
                <span className="text-sm text-black">Thanh toán bằng thẻ ATM</span>
            </div>



        </div>
        <div className="  flex items-center gap-3">
            <div className={` cursor-pointer flex items-center gap-x-3`} onClick={() => setPayment("momo" )}>
                <input type="radio" name="radio-example" id="payment" checked={payment == "momo"  ? true : false} className='hidden' />
                <div className={`size-4 rounded-full border flex justify-center items-center  ${payment == "momo"  ? 'bg-black' : ''} `}>
                    <span className={`text-white text-[12px] ${payment !== "momo" && 'hidden'}`}><i className="fa-solid fa-check" /></span>
                </div>
                <span className="text-sm text-black">Thanh toán bằng Momo</span>
            </div>



        </div>
        <div className="  flex items-center gap-3">
            <div className={` cursor-pointer flex items-center gap-x-3`} onClick={() => setPayment("cash")}>
                <input type="radio" name="radio-example" id="payment" checked={payment == "cash" ? true : false} className='hidden' />
                <div className={`size-4 rounded-full border flex justify-center items-center  ${payment == "cash" ? 'bg-black' : ''} `}>
                    <span className={`text-white text-[12px] ${payment !== "cash" && 'hidden'}`}><i className="fa-solid fa-check" /></span>
                </div>
                <span className="text-sm text-black">Thanh toán khi nhận hàng</span>
            </div>



        </div>
    </div>
</div>
  )
}

export default OrderPaymentMethod