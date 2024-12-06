/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { registerUser } from '../../../../../services/auth'
import { Isignup } from '../../../../../common/interfaces/auth'
import { AppContext } from '../../../../../common/contexts/AppContextProvider'
import { LoadingOutlined } from '@ant-design/icons'


const FormSignup = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { location } = useContext(AppContext)
    const [huyen, setHuyen] = useState([])
    const [xa, setXa] = useState<any>([])
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Isignup>()
    const navigate = useNavigate()

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

    const onSubmit = async (dataForm: any) => {
        setLoading(true)
        try {
            const data = await registerUser(dataForm);
            if (data?.status == 200) {
                message.success(data.message)
                setLoading(false)
                navigate('/signin')
            } else {
                setLoading(false)
                message.error("Đăng ký thất bại")
            }
        } catch (error) {
            setLoading(false)
            message.error("Đăng ký thất bại")
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-1 lg:grid-cols-2 gap-7" >
            {/* ////////////////box bên trá////////////////i */}
            <div>
                <p className="text-[16px] mb-[10px]  text-dark font-medium ">Thông tin khách hàng</p>
                <div className="w-full grid-cols-1 gap-5 grid lg:grid-cols-2 lg:gap-4  ">
                    {/* họ  */}
                    <div className="flex flex-col">
                        <span className="input-signup">Họ:</span>
                        <input
                            {...register('lastname', { required: 'Vui lòng nhập họ.' })}
                            type="text"
                            placeholder="Họ..."
                            className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.lastname && <p className="text-rose-600 text-sm mt-0">{errors.lastname.message}</p>} {/* Note: Thêm thông báo lỗi */}
                    </div>

                    {/* Tên */}
                    <div className="flex flex-col">
                        <span className="input-signup">Tên:</span>
                        <input
                            {...register('firstname', { required: 'Vui lòng nhập tên.' })}
                            type="text"
                            placeholder="Tên..."
                            className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.firstname && <p className="text-rose-600 text-sm ">{errors.firstname.message}</p>} {/* Note */}
                    </div>


                    {/* Email */}
                    <div className="flex flex-col">
                        <span className="input-signup">Email:</span>
                        <input
                            {...register('email', {
                                required: 'Vui lòng nhập email.',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Email không hợp lệ.',
                                },
                            })}
                            type="text"
                            placeholder="Email..."
                            className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && <p className="text-rose-600 text-sm">{errors.email.message}</p>} {/* Note */}
                    </div>
                    {/* Điện thoại */}
                    <div className="flex flex-col">
                        <span className="input-signup">Điện thoại:</span>
                        <input
                            {...register('phone', {
                                required: 'Vui lòng nhập số điện thoại.',
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: 'Số điện thoại không hợp lệ.',
                                },
                            })}
                            type="text"
                            placeholder="Điện thoại..."
                            className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.phone && <p className="text-rose-600 text-sm">{errors.phone.message}</p>} {/* Note */}
                    </div>

                    {/* Ngày sinh */}
                    <div className="flex flex-col">
                        <span className="input-signup">Ngày sinh:</span>
                        <input
                            {...register('date', { required: 'Vui lòng nhập ngày sinh.' })}
                            type="date"
                            placeholder="Ngày sinh..."
                            className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.date && <p className="text-rose-600 text-sm">{errors.date.message}</p>} {/* Note */}
                    </div>
                    {/* Giới tính */}
                    <div className="flex flex-col">
                        <span className="input-signup">Giới tính:</span>
                        <select
                            {...register('gender', { required: 'Vui lòng chọn giới tính.' })}
                            className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option defaultChecked value="">Giới tính</option>
                            <option value="female">Nữ</option>
                            <option value="male">Nam</option>
                            <option value="other">Khác</option>
                        </select>
                        {errors.gender && <p className="text-rose-600 text-sm">{errors.gender.message}</p>} {/* Note */}
                    </div>


                    {/* Tỉnh */}
                    <div className="flex flex-col">
                        <span className="input-signup">Tỉnh:</span>
                        <select
                            {...register('city', { required: 'Vui lòng chọn tỉnh.' })}
                            onChange={(e) => onChangeTinh(e.target.value)}
                            className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Chọn tỉnh</option>
                            {location?.map((tinh: any, index: number) => (
                                <option key={index} value={tinh.name}>
                                    {tinh.name}
                                </option>
                            ))}
                        </select>
                        {errors.city && <p className="text-rose-600 text-sm">{errors.city.message}</p>} {/* Thêm validation cho tỉnh */}
                    </div>

                    {/* Quận huyện */}
                    <div className="flex flex-col">
                        <span className="input-signup">Quận/Huyện:</span>
                        <select
                            {...register('district', { required: 'Vui lòng chọn quận/huyện.' })}
                            onChange={(e) => onChangeHuyen(e.target.value)}
                            className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Chọn quận/huyện</option>
                            {huyen.map((huyenItem: any, index: number) => (
                                <option key={index} value={huyenItem.name}>
                                    {huyenItem.name}
                                </option>
                            ))}
                        </select>
                        {errors.district && <p className="text-rose-600 text-sm">{errors.district.message}</p>} {/* Thêm validation cho quận huyện */}
                    </div>
                    {/* phường địa chỉ phần dưới */}
                </div>

                {/* Xã phường */}
                <div className="flex flex-col pt-4">
                    <span className="input-signup">Xã/Phường:</span>
                    <select
                        {...register('ward', { required: 'Vui lòng chọn xã/phường.' })}
                        className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Chọn xã/phường</option>
                        {xa.map((xaItem: any, index: number) => (
                            <option key={index} value={xaItem.name}>
                                {xaItem.name}
                            </option>
                        ))}
                    </select>
                    {errors.ward && <p className="text-rose-600 text-sm">{errors.ward.message}</p>} {/* Thêm validation cho xã phường */}
                </div>
                {/* Địa chỉ */}
                <div className="flex flex-col pt-4">
                    <span className="input-signup">Địa chỉ:</span>
                    <input
                        {...register('address', { required: 'Vui lòng nhập địa chỉ.' })}
                        type="text"
                        placeholder="Địa chỉ..."
                        className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.address && <p className="text-rose-600 text-sm">{errors.address.message}</p>}
                </div>
            </div>
            {/* ////////////////box bên phải////////////////i */}
            <div>
                <p className="text-[16px] mb-[10px] text-dark font-medium">Thông tin mật khẩu</p>
                {/* Mật khẩu */}
                <div className="flex flex-col mb-5">
                    <span className="input-signup">Mật khẩu:</span>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Vui lòng nhập mật khẩu.',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu phải có ít nhất 6 ký tự.',
                            },
                        })}
                        placeholder="Mật khẩu..."
                        className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.password && <p className="text-rose-600 text-sm ">{errors.password.message}</p>} {/* Note */}
                </div>

                {/* Nhắc lại mật khẩu */}
                <div className="flex flex-col">
                    <span className="input-signup">Nhắc lại mật khẩu:</span>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Vui lòng nhập lại mật khẩu.',
                            validate: value => value === watch('password') || 'Mật khẩu không khớp.',
                        })}
                        placeholder="Nhắc lại mật khẩu..."
                        className="h-12 w-full px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.confirmPassword && <p className="text-rose-600 text-sm">{errors.confirmPassword.message}</p>} {/* Note */}
                </div>
                {/* <div className="flex flex-col">
                    <span className="input-signup">Nhập lại kí tự vào ô sau:</span>
                    <input type="text" className=" h-12 w-full mb-5   px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " />
                </div>
                <div className="h-16 w-24 border flex justify-center items-center">
                    <p>Mã ở đây</p>
                </div> */}
                <div className=" flex justify-between items-center mt-4 mb-4 ">
                    <div>
                        <input type="checkbox" className="accent-slate-950" /> <span>Đồng ý với các <a className="text-red" href="http://">điều khoản
                        </a>của chúng tôi</span>
                    </div>
                    <Link to={"/signin"} className='hover:text-red' >Đã có tài khoản ?</Link>
                </div>
                <div>
                    <button
                        className="h-12  w-full bg-[#221f20] text-[#f7f8f9] font-semibold rounded-tl-2xl rounded-br-2xl hover:bg-[#f7f8f9] hover:text-[#221f20] hover:border hover:border-[#221f20] transition ease-in-out "
                    >
                        {loading ? <LoadingOutlined /> : 'ĐĂNG KÝ'}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FormSignup