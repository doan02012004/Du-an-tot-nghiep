/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppContext } from '../../../../../common/contexts/AppContextProvider'
import useAddressMutation from '../../../../../common/hooks/address/useAddressMutation'
import { Iaddress } from '../../../../../common/interfaces/address'

type Props = {
    setIsOpenForm : any
}


const FormAddress = ({setIsOpenForm}:Props) => {
    const addressMutation = useAddressMutation()
    const {register,handleSubmit} = useForm()
    const [address, setAddress] = useState<number | null>(null)
    const {location,currentUser} = useContext(AppContext)
    const [huyen, setHuyen] = useState([])
    const [xa, setXa] = useState<any>([])
    const onClickAddress = (number: number) => {
        if (address == null || address !== number) {
            setAddress(number)
        } else {
            setAddress(null)
        }
    }
    const onChangeTinh = (tinh: string) => {
        if (tinh !== '') {
            const newDataTinh = location?.find((item: any) => item.name == tinh)
            setHuyen(newDataTinh.data2)
        }
    }
    
    const onChangeHuyen = (data: string) => {
        if (data !== '') {
            const newDataHuyen: any = huyen.find((item: any) => item.name == data)
            setXa(newDataHuyen.data3)
        }
    }
    const onSubmit:any = (data:Iaddress) =>{
        const newData = {
            ...data,
            userId:currentUser._id
        }
        addressMutation.mutate({action:"add",newAddress:newData})
        setIsOpenForm(false)
    }
    return (
        <div className=' fixed top-0 left-0 bg-black/30 w-full h-full z-50 flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 bg-white relative p-6 w-[320px] lg:w-[700px]">
                <h2 className='font-bold uppercase text-2xl text-center'>THÊM ĐỊA CHỈ</h2>
                <span onClick={() =>{ setIsOpenForm(false)}} className=' cursor-pointer absolute top-4 right-4'><CloseOutlined /></span>
                <div className="w-full flex flex-col lg:justify-between items-center gap-3 lg:gap-5 lg:flex-row">
                    <input type="text" {...register("fullname",{required:true})} placeholder="Họ tên" className="placeholder:text-sm lg:text-base border rounded-md py-3 px-5 w-full  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-base placeholder-black lg:w-1/2" />
                    <input type="text"  {...register("phone",{required:true})} placeholder="Số điện thoại" className="placeholder:text-sm lg:text-base border rounded-md py-3 px-5 w-full  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-base placeholder-black lg:w-1/2" />
                </div>
                <div className="w-full flex flex-col items-center gap-3 lg:gap-5 lg:flex-row lg:justify-between" >
                    <div className="w-full relative select-information" >
                        <select {...register("city",{required:true, onChange: (e) => onChangeTinh(e.target.value),onBlur:()=>{setAddress(null)}})} className="text-sm border rounded-md py-3 px-5 w-full appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  lg:text-base text-black" onClick={() => onClickAddress(1)}>
                            <option value={''} disabled selected>Tỉnh/Thành Phố</option>
                            {location?.map((item: any, i: number) => (
                                <option key={i} value={item.name} >{item.name}</option>
                            ))}
                        </select>
                        <span className={`absolute right-5 top-1/2 -translate-y-1/2 ${address == 1 ? 'active' : 'anactive'}`}><i className="fa-solid fa-chevron-right" /></span>
                    </div>
                    <div className="w-full relative select-information">
                        <select {...register('district', { required: true, onChange: (e) => onChangeHuyen(e.target.value), onBlur:()=>{setAddress(null)} })} className="text-sm border rounded-md py-3 px-5 w-full appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base text-black " onClick={() => onClickAddress(2)}>
                            <option disabled selected>Quận/Huyện</option>
                            {huyen?.map((item: any, i: number) => (
                                <option key={i} value={item.name} >{item.name}</option>
                            ))}
                        </select>
                        <span className={`absolute right-5 top-1/2 -translate-y-1/2 ${address == 2 ? 'active' : 'anactive'}`}><i className="fa-solid fa-chevron-right" /></span>
                    </div>
                </div>
                <div className="w-full relative select-information">
                    <select {...register('ward', { required: true,  onBlur:() =>  setAddress(null)  })} onBlur={() => { setAddress(null) }} className="text-sm border rounded-md py-3 px-5 w-full appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base text-black " onClick={() => onClickAddress(3)}>
                        <option disabled selected>Phường/Xã</option>
                        {xa?.map((item: any, i: number) => (
                            <option key={i} value={item.name} >{item.name}</option>
                        ))}
                    </select>
                    <span className={`absolute right-5 top-1/2 -translate-y-1/2 ${address == 3 ? 'active' : 'anactive'}`}><i className="fa-solid fa-chevron-right" /></span>
                </div>
                <div>
                    <input type="text" {...register("address",{required:true})} className="w-full  border rounded-md py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:placeholder:text-base placeholder-black placeholder:text-sm" placeholder="Địa chỉ" />
                </div>
                <div className="flex items-center gap-x-8">
                    <div className="flex items-center gap-x-2">
                        <input type="radio" id="nam" value={"house"}  className="accent-slate-950 size-5" {...register("option",{required:true})}/>
                        <label htmlFor="nam" className="block cursor-pointer text-dark font-semibold text-sm">Nhà/chung cư</label>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input type="radio" id="nu" value={"company"} className="accent-slate-950 size-5" {...register("option",{required:true})}/>
                        <label htmlFor="nu" className="block cursor-pointer text-dark font-semibold text-sm">Công ty/cơ quan</label>
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <input type="checkbox" id="checkdefault" {...register("isDefault")} className="accent-slate-950 size-5"  />
                    <label htmlFor="checkdefault" className="block cursor-pointer  text-sm">Đặt làm mặc định</label>
                </div>
                <button type='submit' className='uppercase w-full py-3 btn-lg font-semibold border'>Thêm địa chỉ</button>
            </form>
        </div>
    )
}

export default FormAddress