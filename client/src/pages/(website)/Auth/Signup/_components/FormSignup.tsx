/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useApiLocationQuery from '../../../../../common/hooks/API_location/useApiLocationQuery'
import { useMutation } from '@tanstack/react-query'
import { Isignup } from '../../../../../interface/InterfacAuth'
import { message } from 'antd'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const FormSignup = () => {
    const navigate = useNavigate()
    const queryDataLocation = useApiLocationQuery()
    const [huyen, setHuyen] = useState([])
    const [xa, setXa] = useState([])
    const { register, handleSubmit  } = useForm<Isignup>()

    useEffect(() => {
        if (queryDataLocation.data) {
            queryDataLocation.data
        }
    }, [queryDataLocation.data])

    const onChangeTinh = (tinh: string) => {
        if (tinh !== '') {
            const newDataTinh = queryDataLocation?.data?.find((item: any) => item.name == tinh)
            setHuyen(newDataTinh.data2)
        }
    }

    const onChangeHuyen = (data: string) => {
        if (data !== '') {
            const newDataHuyen = huyen.find((item: any) => item.name == data)
            setXa(newDataHuyen.data3)
        }
    }
    const { mutate } = useMutation({
        mutationFn: async (formData: Isignup) => {
            try {
                const response = await axios.post(`http://localhost:5000/api/users/register`, formData)
                if (response.data.success) {
                    message.success("Đăng kí thành công")
                    navigate('/')
                } else {
                    message.error("Đăng kí thất bại. Vui lòng kiểm tra lại thông tin.")
                }
            } catch (error) {
                message.error("Có lỗi xảy ra. Vui lòng thử lại sau.")
            }
        }
    })

    const onSubmit = (formData: Isignup) => {
        mutate(formData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-1 lg:grid-cols-2 gap-7" >
            {/* ////////////////box bên trá////////////////i */}
            <div>
                <p className="text-[16px] mb-[10px]  text-dark font-medium ">Thông tin khách hàng</p>
                <div className="w-full grid-cols-1 gap-5 grid lg:grid-cols-2 lg:gap-4  ">
                    <div className="flex flex-col">
                        <span className="input-signup">Họ:</span>
                        <input type="text" placeholder="Họ..." {...register('lastname', { required: true })} className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  " />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Tên:</span>
                        <input type="text" placeholder="Tên..." {...register('firstname', { required: true })} className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Email:</span>
                        <input type="text" placeholder="Email..." {...register('email', { required: true })} className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Điện thoại:</span>
                        <input type="text" placeholder="Điện thoại..." {...register('phone', { required: true })} className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Ngày sinh:</span>
                        <input type="date" placeholder="Ngày sinh..." {...register('date', { required: true })} className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Giới tính:</span>
                        <select {...register('gender', { required: true })} className=" h-12 w-full   px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option >Nữ</option>
                            <option >Nam</option>
                            <option >Khác</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Tỉnh/TP:</span>
                        <select onChange={(e) => onChangeTinh(e.target.value)}   className="appearance-none h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ">
                            <option defaultChecked value="">Tỉnh/Thành Phố</option>
                            {queryDataLocation?.data?.map((item: any, i: number) => (
                                <option key={i} value={item.name} >{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Quận/Huyện:</span>
                        <select onChange={(e) => onChangeHuyen(e.target.value)}  className=" h-12 w-full mb-5  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option defaultChecked value="">Quận/Huyện:</option>
                            {huyen?.map((item: any, i: number) => (
                                <option key={i} value={item.name} >{item.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* phường địa chỉ phần dưới */}
                </div>
                <div className="flex flex-col">
                    <span className="input-signup">Phường/Xã:</span>
                    <select {...register('ward', { required: true })} className="appearance-none h-12 w-full mb-5  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ">
                        <option defaultChecked value="">Phường/Xã:</option>
                        {xa?.map((item: any, i: number) => (
                            <option key={i} value={item.name} >{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <span className="input-signup">Địa chỉ:</span>
                    <textarea {...register('address', { required: true })} className="appearance-none h-20 w-full mb-5  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " defaultValue={""} />
                </div>
            </div>
            {/* ////////////////box bên phải////////////////i */}
            <div>
                <p className="text-[16px] mb-[10px] text-dark font-medium">Thông tin mật khẩu</p>
                <div className="flex flex-col">
                    <span className="input-signup">Mật khẩu:</span>
                    <input type="text" placeholder="Mật khẩu..." className=" h-12 w-full mb-5  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  " />
                </div>
                <div className="flex flex-col">
                    <span className="input-signup">Nhắc lại mật khẩu:</span>
                    <input type="text" placeholder="Nhắc lại mật khẩu..." className=" h-12 w-full mb-5   px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " />
                </div>
                <div className="flex flex-col">
                    <span className="input-signup">Nhập lại kí tự vào ô sau:</span>
                    <input type="text" className=" h-12 w-full mb-5   px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " />
                </div>
                <div className="h-16 w-24 border flex justify-center items-center">
                    <p>Mã ở đây</p>
                </div>
                <div className=" flex justify-between items-center mt-4 mb-4 ">
                    <div>
                        <input type="checkbox" className="accent-slate-950" /> <span>Đồng ý với các <a className="text-red" href="http://">điều khoản
                        </a>của chúng tôi</span>
                    </div>
                    <Link to={"/signin"} className='hover:text-red' >Đã có tài khoản ?</Link>
                </div>
                <div>
                    <button className="h-12 w-full bg-[#221f20] text-[#f7f8f9] font-semibold rounded-tl-2xl rounded-br-2xl hover:bg-[#f7f8f9] hover:text-[#221f20] hover:border hover:border-[#221f20] transition ease-in-out ">ĐĂNG
                        KÝ</button>
                </div>
            </div>
        </form>
    )
}

export default FormSignup