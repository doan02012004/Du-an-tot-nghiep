import React from 'react'
import { Link } from 'react-router-dom'

const FormSignup = () => {
    return (
        <form className=" grid grid-cols-1 lg:grid-cols-2 gap-7" >
            {/* ////////////////box bên trá////////////////i */}
            <div>
                <p className="text-[16px] mb-[10px]  text-dark font-medium ">Thông tin khách hàng</p>
                <div className="w-full grid-cols-1 gap-5 grid lg:grid-cols-2 lg:gap-4  ">
                    <div className="flex flex-col">
                        <span className="input-signup">Họ:</span>
                        <input type="text" placeholder="Họ..." className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  " />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Tên:</span>
                        <input type="text" placeholder="Tên..." className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Email:</span>
                        <input type="text" placeholder="Email..." className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Điện thoại:</span>
                        <input type="text" placeholder="Điện thoại..." className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Ngày sinh:</span>
                        <input type="date" placeholder="Ngày sinh..." className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " />
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Giới tính:</span>
                        <select className=" h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option >Nữ</option>
                            <option >Nam</option>
                            <option >Khác</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Tỉnh/TP:</span>
                        <select className="appearance-none h-12 w-full  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ">
                            <option value={0}>Chọn Tỉnh/TP</option>
                            <option value={1}>Hà Nội</option>
                            <option value={2}>Hồ Chí Minh</option>
                            <option value={3}>Cần Thơ</option>
                            <option value={4}>Yên Bái</option>
                            <option value={5}>Nha trang</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <span className="input-signup">Quận/Huyện:</span>
                        <select className=" h-12 w-full mb-5  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value={0}>Chọn Quận/Huyện</option>
                            <option value={1}>Hà Nội</option>
                            <option value={2}>Hồ Chí Minh</option>
                            <option value={3}>Cần Thơ</option>
                            <option value={4}>Yên Bái</option>
                            <option value={5}>Nha trang</option>
                        </select>
                    </div>
                    {/* phường địa chỉ phần dưới */}
                </div>
                <div className="flex flex-col">
                    <span className="input-signup">Phường/Xã:</span>
                    <select className="appearance-none h-12 w-full mb-5  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ">
                        <option value={0}>Chọn Phường/Xã</option>
                        <option value={1}>Phường.,..</option>
                        <option value={2}>Xã....</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <span className="input-signup">Địa chỉ:</span>
                    <textarea className="appearance-none h-20 w-full mb-5  px-3 py-2  text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " defaultValue={""} />
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