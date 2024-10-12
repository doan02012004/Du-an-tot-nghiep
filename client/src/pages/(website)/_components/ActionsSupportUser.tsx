import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../common/contexts/AppContextProvider'
import { Modal, message } from 'antd'
import { logoutUser } from '../../../services/auth'
import { useDispatch } from 'react-redux'
import { logoutFailed, logoutStart, logoutSuccess } from '../../../common/redux/features/authSlice'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const ActionsSupportUser = () => {
    const [actionSupport, setActionSupport] = useState(false)
    const [actionUser, setActionUser] = useState(false)
    const { accessToken, setAccesToken, setCurrentUser, setIsLogin, currentUser } = useContext(AppContext)
    console.log(currentUser)
    const { confirm } = Modal;
    const dispatch = useDispatch()
    const onHandeActionSupport = () => {
        setActionSupport(!actionSupport)
        setActionUser(false)
    }
    const onHandeActionUser = () => {
        setActionUser(!actionUser)
        setActionSupport(false)
    }
    const onHandleLogout = async () => {
        confirm({
            title: 'Bạn có chắc chắn muốn đăng xuất không?',
            content: 'Thao tác này sẽ đăng xuất khỏi tài khoản hiện tại.',
            okText: 'Đăng xuất',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                dispatch(logoutStart());

                try {
                    const data = await logoutUser();

                    if (data.SC == 1) {
                        setCurrentUser({});
                        setIsLogin(false);
                        setAccesToken(null);
                        window.location.reload();
                    }

                    dispatch(logoutSuccess());
                } catch (error) {
                    message.error('Đăng xuất thất bại');
                    dispatch(logoutFailed());
                }
            },
            onCancel() {
                message.success('Người dùng đã hủy thao tác đăng xuất');
            },
        });
    };

    return (
        <>
            <div className="relative hidden lg:block">
                <span onClick={onHandeActionSupport} className="sub-top cursor-pointer text-base hover:text-gray-800 block">
                    <i className="fa-solid fa-headphones" />
                </span>
                {actionSupport && (
                    <div className="sub-menu transition-all duration-500 ease-in-out  absolute min-w-[255px] top-10 right-0 bg-white border border-gray rounded-md z-[3]">
                        <div className="border-b border-gray">
                            <h3 className="text-sm font-semibold px-6 pt-6 pb-5 text-[#221F20]">Trợ giúp</h3>
                        </div>
                        <ul className="p-6">
                            <li className="group mb-6">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-solid fa-phone-volume" /></span>
                                    Hotline
                                </a>
                            </li>
                            <li className="group mb-6">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-brands fa-rocketchat" /></span>
                                    Live Chat
                                </a>
                            </li>
                            <li className="group mb-6">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-solid fa-arrows-rotate" /></span>
                                    Messenger
                                </a>
                            </li>
                            <li className="group mb-6">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-regular fa-envelope" /></span>
                                    Email
                                </a>
                            </li>
                            <li className="group ">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-solid fa-paw" /></span>
                                    Tra cứu đơn hàng
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            {/* .------------------------------------------------------------. */}
            <div className="relative hidden lg:block">
                {accessToken ? (
                    <span onClick={onHandeActionUser} className="sub-top cursor-pointer text-base hover:text-gray-800 block">
                        <i className="fa-regular fa-user" />
                    </span>
                ) : (
                    <a href="/signin" className="sub-top cursor-pointer text-base hover:text-gray-800 block">
                        <i className="fa-regular fa-user" />
                    </a>
                )}

                {actionUser && (
                    <div className="sub-menu transition-all duration-500 ease-in-out  absolute min-w-[255px] top-10 right-0 bg-white border border-gray rounded-md z-[3]">
                        <div className="border-b border-gray">
                            <h3 className="text-sm font-semibold px-6 pt-6 pb-5 text-[#221F20]">Tài khoản của tôi</h3>
                        </div>
                        <ul className="p-6">
                            <li className="group mb-6">
                                <a href="/customer/infor" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-regular fa-user" /></span>
                                    Thông tin tài khoản
                                </a>
                            </li>
                            {currentUser && currentUser.role === 'admin' && (
                                <li className="group mb-6">
                                    <a href="/admin" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                        <span className="mr-3">
                                            <i className="fa-solid fa-user-pen"></i>
                                        </span>
                                        Admin
                                    </a>
                                </li>
                                ) 
                            }
                            <li className="group mb-6">
                                <Link to={"customer/order-manager"} className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-solid fa-arrows-rotate" /></span>
                                    Quản lý đơn hàng
                                </Link>
                            </li>
                            <li className="group mb-6">
                                <a href="/customer/address_list" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-solid fa-location-dot" /></span>
                                    Sổ địa chỉ
                                </a>
                            </li>
                            <li className="group mb-6">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-solid fa-glasses" /></span>
                                    Sản phẩm đã xem
                                </a>
                            </li>
                            <li className="group mb-6">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-regular fa-heart" /></span>
                                    Sản phẩm yêu thích
                                </a>
                            </li>
                            <li className="group mb-6">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-solid fa-headphones" /></span>
                                    Hỏi đáp sản phẩm
                                </a>
                            </li>
                            <li className="group mb-6">
                                <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-regular fa-hand-point-right" /></span>
                                    Hỗ trợ - Mail Shop
                                </a>
                            </li>
                            <li className="group ">
                                <button onClick={onHandleLogout} className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                    <span className="mr-3 "><i className="fa-solid fa-arrow-right-from-bracket" /></span>
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default ActionsSupportUser