import { useState } from "react"
import logo from '../../../assets/logos/logo.png'

const Header = () => {
    const [actionSupport, setActionSupport] = useState(false)
    const [actionUser, setActionUser] = useState(false)
    const [isOpenCart, setIsOpenCart] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const onHandeActionSupport = () => {
        setActionSupport(!actionSupport)
        setActionUser(false)
    }
    const onHandeActionUser = () => {
        setActionUser(!actionUser)
        setActionSupport(false)
    }
    const onMiniCart = () => {
        const miniCart = document.querySelector<HTMLElement>('.mini-cart');
        if (isOpenCart == true) {
            if (miniCart) {
                miniCart.style.right = '-100%';
                miniCart.style.opacity = '0';
            }
        }
        else {
            if (miniCart) {
                miniCart.style.right = '0';
                miniCart.style.opacity = '1';
            }
        }
        setIsOpenCart(!isOpenCart)
    }
    const onMenuMobile = () => {
        const menu = document.querySelector<HTMLElement>('.menu');
        if (isOpenMenu == true) {
            if (menu) {
                menu.classList.add('hidden');
                menu.style.opacity = '0';
            }
        } else {
            if (menu) {
                menu.classList.remove('hidden');
                menu.style.opacity = '1';
            }
        }
        setIsOpenMenu(!isOpenMenu)
    }
    const onHandleNavbarMenu = (index:number)=>{
        const content_menu_bottom = document.querySelectorAll<HTMLElement>('.content-menu-bottom');
            content_menu_bottom.forEach((item, i) => {
              if (index !== i) {
                item.classList.add('hidden');
                item.classList.remove('block');
              }
            });
            content_menu_bottom[index].classList.toggle('hidden');
            content_menu_bottom[index].classList.toggle('block');
    }
    return (
        <header className=" h-16 lg:h-20">
            <div className="fixed top-0 left-0 w-full py-5 z-50 bg-white h-16 lg:h-20 lg:py-0">
                <div className="container relative">
                    <nav className="flex items-center justify-between w-full lg:border-b lg:border-gray-200">
                        <span onClick={onMenuMobile} className=" open-menu block cursor-pointer text-xl lg:hidden">
                            <i className="fa-solid fa-bars" />
                        </span>
                        <div className="menu fixed px-[15px] pt-6 top-0 left-0 w-full transition-all duration-500 ease-in-out bg-white z-10 h-screen hidden lg:block lg:static lg:w-auto lg:h-auto lg:pt-0">
                            <span onClick={ onMenuMobile} className="close-menu block cursor-pointer text-2xl mb-8 lg:hidden">
                                <i className="fa-solid fa-xmark" />
                            </span>
                            <ul className="menu-item flex flex-col gap-8 lg:py-7 lg:flex-row lg:items-center lg:gap-x-3">
                                <li><a href="#" className="text-[12px]/[150%] text-[#221F20] font-semibold transition duration-300 ease-in-out uppercase hover:text-[#AC2F33]">Home</a>
                                </li>
                                <li><a href="#" className="text-[12px]/[150%] text-[#221F20] font-semibold transition duration-300 ease-in-out uppercase hover:text-[#AC2F33]">Shop</a>
                                </li>
                                <li><a href="#" className="text-[12px]/[150%] text-[#221F20] font-semibold transition duration-300 ease-in-out uppercase hover:text-[#AC2F33]">Blogs</a>
                                </li>
                                <li><a href="#" className="text-[12px]/[150%] text-[#221F20] font-semibold transition duration-300 ease-in-out uppercase hover:text-[#AC2F33]">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <a href="#" className="block">
                                <img src={logo} className="w-[140px] h-auto object-contain" />
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="search-wrapper content-menu-bottom fixed z-[13]  top-0 left-0 w-full h-screen hidden bg-white lg:w-auto lg:block lg:h-auto lg:px-0 lg:static lg:z-auto">
                                <div className=" mt-3 relative mx-[15px] lg:mr-5 lg:block group lg:mx-0 lg:mt-0 ">
                                    <form className=" z-[11] w-full lg:w-60 h-10 border border-gray rounded-md overflow-hidden">
                                        <button className="size-10 border-0 outline-0 font-thin absolute left-0 top-0 text-dark">
                                            <i className="fa-solid fa-magnifying-glass" />
                                        </button>
                                        <input type="text" className="pl-10 py-[15px] text-sm pr-[15px] w-full h-10 border-0 outline-0 font-light" placeholder="Tìm kiếm sản phẩm" />
                                    </form>
                                    {/* quicksearch menu  */}
                                    <div className="quicksearch absolute top-8 left-0 z-10 w-full lg:hidden lg:group-hover:block lg:w-[440px]">
                                        <div className="mt-[15px] border border-gray-200 rounded-md p-6   bg-white">
                                            <h1 className="mb-4 text-sm text-[#221F20] font-semibold">Tìm kiếm nhiều nhất</h1>
                                            <div className="flex items-center flex-wrap gap-3 mb-4">
                                                <a href="#" className="block px-2 py-2 border border-gray-200 text-[12px]/[150%] rounded-tl-lg rounded-br-lg transition duration-300 ease-in-out hover:text-white hover:bg-black">Áo
                                                    polo</a>
                                                <a href="#" className="block px-2 py-2 border border-gray-200 text-[12px]/[150%] rounded-tl-lg rounded-br-lg transition duration-300 ease-in-out hover:text-white hover:bg-black">Đầm</a>
                                                <a href="#" className="block px-2 py-2 border border-gray-200 text-[12px]/[150%] rounded-tl-lg rounded-br-lg transition duration-300 ease-in-out hover:text-white hover:bg-black">Trễ
                                                    Vai</a>
                                                <a href="#" className="block px-2 py-2 border border-gray-200 text-[12px]/[150%] rounded-tl-lg rounded-br-lg transition duration-300 ease-in-out hover:text-white hover:bg-black">Quần
                                                    Jean</a>
                                                <a href="#" className="block px-2 py-2 border border-gray-200 text-[12px]/[150%] rounded-tl-lg rounded-br-lg transition duration-300 ease-in-out hover:text-white hover:bg-black">Váy
                                                    học sinh</a>
                                                <a href="#" className="block px-2 py-2 border border-gray-200 text-[12px]/[150%] rounded-tl-lg rounded-br-lg transition duration-300 ease-in-out hover:text-white hover:bg-black">Croptop</a>
                                                <a href="#" className="block px-2 py-2 border border-gray-200 text-[12px]/[150%] rounded-tl-lg rounded-br-lg transition duration-300 ease-in-out hover:text-white hover:bg-black">Áo
                                                    thun</a>
                                            </div>
                                            <h1 className="mb-4 text-sm text-[#221F20] font-semibold">Vừa tìm kiếm</h1>
                                            <div className="flex items-center flex-wrap gap-3 ">
                                                <a href="#" className="block px-2 py-2 border border-gray-200 text-[12px]/[150%] rounded-tl-lg rounded-br-lg transition duration-300 ease-in-out hover:text-white hover:bg-black">Áo
                                                    polo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
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
                                <div className="relative hidden lg:block">
                                    <span onClick={onHandeActionUser} className="sub-top block cursor-pointer text-base hover:text-gray-800 ">
                                        <i className="fa-regular fa-user" />
                                    </span>
                                    {actionUser && (
                                        <div className="sub-menu transition-all duration-500 ease-in-out  absolute min-w-[255px] top-10 right-0 bg-white border border-gray rounded-md z-[3]">
                                            <div className="border-b border-gray">
                                                <h3 className="text-sm font-semibold px-6 pt-6 pb-5 text-[#221F20]">Tài khoản của tôi</h3>
                                            </div>
                                            <ul className="p-6">
                                                <li className="group mb-6">
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                                        <span className="mr-3 "><i className="fa-regular fa-user" /></span>
                                                        Thông tin tài khoản
                                                    </a>
                                                </li>
                                                <li className="group mb-6">
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                                        <span className="mr-3 "><i className="fa-solid fa-arrows-rotate" /></span>
                                                        Quản lý đơn hàng
                                                    </a>
                                                </li>
                                                <li className="group mb-6">
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
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
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                                        <span className="mr-3 "><i className="fa-solid fa-arrow-right-from-bracket" /></span>
                                                        Đăng xuất
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="relative pr-5">
                                    <span onClick={onMiniCart} className="block open-mini-cart cursor-pointer text-base hover:text-gray-800 ">
                                        <i className="fa-solid fa-cart-shopping" />
                                    </span>
                                    <span className="absolute -top-1 right-0 flex justify-center items-center text-sm size-4 rounded-full bg-black text-white">2</span>
                                    {/* Mini cart  */}
                                    <div className="mini-cart fixed top-0 -right-full opacity-0 h-screen min-w-full lg:min-w-[390px] bg-white border border-gray-200 z-[15] transition-all duration-500 ease-in-out">
                                        <div className="flex items-center justify-between px-[15px]  pt-6 pb-5 border-b border-gray-200 mb-6 lg:px-6">
                                            <h1 className="text-xl font-semibold flex items-center">Giỏ hàng
                                                <span className="ml-[10px] size-6 bg-black text-white text-sm rounded-full flex justify-center items-center">5</span>
                                            </h1>
                                            <span onClick={onMiniCart} className="close-mini-cart cursor-pointer text-2xl">
                                                <i className="fa-solid fa-xmark" />
                                            </span>
                                        </div>
                                        <div className="px-6 h-main_mini_cart overflow-y-auto scrollbar mb-6 lg:mb-12">
                                            {/* cart item  */}
                                            <div className="w-full h-[94px] flex gap-3 pb-4 border-b border-gray-200  mb-4  ">
                                                <div className="w-16 h-full flex-shrink-0">
                                                    <img src="./assets/images/products/aonam2.jpg" className="w-full h-full object-cover"  />
                                                </div>
                                                <div className="w-full flex flex-col justify-between ">
                                                    <h3 className="text-base"><a href="#" className="text-[#373737]">Áo sơ mi nam</a></h3>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm ">Màu sắc:
                                                            <span className="text-[#373737]">Xanh tím than</span>
                                                        </span>
                                                        <span className="text-sm ">Size:
                                                            <span>Xl</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="relative w-[74px] h-6 border border-gray-200 overflow-hidden rounded-tl-lg rounded-br-lg">
                                                            <span className="absolute z-[5] cursor-pointer left-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-minus" />
                                                            </span>
                                                            <input type="number" className="absolute left-[50%] translate-x-[-50%] w-12 px-3 z-[3] text-center outline-0 border-0" defaultValue={1} />
                                                            <span className="absolute z-[5] cursor-pointer right-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-plus" />
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-[#AC2F33] font-semibold ">299.000 <span className="underline">đ</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-[94px] flex gap-3 pb-4 border-b border-gray-200  mb-4  ">
                                                <div className="w-16 h-full flex-shrink-0">
                                                    <img src="./assets/images/products/aonam2.jpg" className="w-full h-full object-cover"  />
                                                </div>
                                                <div className="w-full flex flex-col justify-between ">
                                                    <h3 className="text-base"><a href="#" className="text-[#373737]">Áo sơ mi nam</a></h3>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm ">Màu sắc:
                                                            <span className="text-[#373737]">Xanh tím than</span>
                                                        </span>
                                                        <span className="text-sm ">Size:
                                                            <span>Xl</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="relative w-[74px] h-6 border border-gray-200 overflow-hidden rounded-tl-lg rounded-br-lg">
                                                            <span className="absolute z-[5] cursor-pointer left-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-minus" />
                                                            </span>
                                                            <input type="number" className="absolute left-[50%] translate-x-[-50%] w-12 px-3 z-[3] text-center outline-0 border-0" defaultValue={1} />
                                                            <span className="absolute z-[5] cursor-pointer right-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-plus" />
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-[#AC2F33] font-semibold ">299.000 <span className="underline">đ</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-[94px] flex gap-3 pb-4 border-b border-gray-200  mb-4  ">
                                                <div className="w-16 h-full flex-shrink-0">
                                                    <img src="./assets/images/products/aonam2.jpg" className="w-full h-full object-cover"  />
                                                </div>
                                                <div className="w-full flex flex-col justify-between ">
                                                    <h3 className="text-base"><a href="#" className="text-[#373737]">Áo sơ mi nam</a></h3>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm ">Màu sắc:
                                                            <span className="text-[#373737]">Xanh tím than</span>
                                                        </span>
                                                        <span className="text-sm ">Size:
                                                            <span>Xl</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="relative w-[74px] h-6 border border-gray-200 overflow-hidden rounded-tl-lg rounded-br-lg">
                                                            <span className="absolute z-[5] cursor-pointer left-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-minus" />
                                                            </span>
                                                            <input type="number" className="absolute left-[50%] translate-x-[-50%] w-12 px-3 z-[3] text-center outline-0 border-0" defaultValue={1} />
                                                            <span className="absolute z-[5] cursor-pointer right-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-plus" />
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-[#AC2F33] font-semibold ">299.000 <span className="underline">đ</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-[94px] flex gap-3 pb-4 border-b border-gray-200  mb-4  ">
                                                <div className="w-16 h-full flex-shrink-0">
                                                    <img src="./assets/images/products/aonam2.jpg" className="w-full h-full object-cover"  />
                                                </div>
                                                <div className="w-full flex flex-col justify-between ">
                                                    <h3 className="text-base"><a href="#" className="text-[#373737]">Áo sơ mi nam</a></h3>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm ">Màu sắc:
                                                            <span className="text-[#373737]">Xanh tím than</span>
                                                        </span>
                                                        <span className="text-sm ">Size:
                                                            <span>Xl</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="relative w-[74px] h-6 border border-gray-200 overflow-hidden rounded-tl-lg rounded-br-lg">
                                                            <span className="absolute z-[5] cursor-pointer left-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-minus" />
                                                            </span>
                                                            <input type="number" className="absolute left-[50%] translate-x-[-50%] w-12 px-3 z-[3] text-center outline-0 border-0" defaultValue={1} />
                                                            <span className="absolute z-[5] cursor-pointer right-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-plus" />
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-[#AC2F33] font-semibold ">299.000 <span className="underline">đ</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-[94px] flex gap-3 pb-4 border-b border-gray-200  mb-4  ">
                                                <div className="w-16 h-full flex-shrink-0">
                                                    <img src="./assets/images/products/aonam2.jpg" className="w-full h-full object-cover"  />
                                                </div>
                                                <div className="w-full flex flex-col justify-between ">
                                                    <h3 className="text-base"><a href="#" className="text-[#373737]">Áo sơ mi nam</a></h3>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm ">Màu sắc:
                                                            <span className="text-[#373737]">Xanh tím than</span>
                                                        </span>
                                                        <span className="text-sm ">Size:
                                                            <span>Xl</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="relative w-[74px] h-6 border border-gray-200 overflow-hidden rounded-tl-lg rounded-br-lg">
                                                            <span className="absolute z-[5] cursor-pointer left-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-minus" />
                                                            </span>
                                                            <input type="number" className="absolute left-[50%] translate-x-[-50%] w-12 px-3 z-[3] text-center outline-0 border-0" defaultValue={1} />
                                                            <span className="absolute z-[5] cursor-pointer right-0 top-0 w-6 h-full flex justify-center items-center border border-gray-200 rounded-tl-lg rounded-br-lg active:bg-black active:text-white ">
                                                                <i className="fa-solid fa-plus" />
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-[#AC2F33] font-semibold ">299.000 <span className="underline">đ</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                            <p className="text-right px-6 pb-3 mb-3 border-b border-gray-200">Tổng cộng: <span className="text-lg font-semibold text-[#0A0A0B]">1.000.000 đ</span></p>
                                            <div className="px-6">
                                                <a href='' className="block w-full py-4 bg-black border border-black uppercase font-semibold text-lg  text-center text-white transition duration-300 ease-in-out hover:bg-white hover:text-black ">Xem
                                                    giỏ hàng</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* navbar-bottom  */}
                        <div className="fixed bottom-0 left-0 w-full z-40 pt-1 bg-white border-t border-gray-200 lg:hidden">
                            <div className="px-[15px] w-full ">
                                <div className="flex items-center w-max mx-auto">
                                    <div onClick={()=>onHandleNavbarMenu(0)} className="menu-bottom-item cursor-pointer text-center  px-4">
                                        <span className="mb-1">
                                            <i className="fa-solid fa-magnifying-glass" />
                                        </span>
                                        <p className="text-[12px]/[150%]">Tìm kiếm</p>
                                    </div>
                                    <div  onClick={()=>onHandleNavbarMenu(1)} className="menu-bottom-item cursor-pointer text-center  px-4">
                                        <span className="mb-1">
                                            <i className="fa-solid fa-headphones" />
                                        </span>
                                        <p className="text-[12px]/[150%]">Trợ giúp</p>
                                        <div className="content-menu-bottom menu-animation-top fixed bottom-[50px] left-0 w-full bg-white hidden  transition-all duration-500 ease-in-out z-20">
                                            <div className="border-b border-gray-200">
                                                <h3 className="text-sm font-semibold pt-6 pb-5 text-[#221F20] text-left px-[15px]">Trợ giúp</h3>
                                            </div>
                                            <ul className="px-[15px] py-4">
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
                                                <li className="group mb-6 ">
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                                        <span className="mr-3 "><i className="fa-solid fa-paw" /></span>
                                                        Tra cứu đơn hàng
                                                    </a>
                                                </li>
                                                <li className="group ">
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                                        <span className="mr-3 "><i className="fa-regular fa-comments" /></span>
                                                        Liên hệ
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div  onClick={()=>onHandleNavbarMenu(2)} className=" menu-bottom-item cursor-pointer text-center px-4">
                                        <span className="mb-1">
                                            <i className="fa-regular fa-user" />
                                        </span>
                                        <p className="text-[12px]/[150%]">Tài khoản</p>
                                        <div className="content-menu-bottom menu-animation-top fixed bottom-[50px] left-0 w-full bg-white hidden  transition-all duration-500 ease-in-out rounded-md z-20">
                                            <div className="border-b border-gray-200">
                                                <h3 className="text-sm font-semibold pt-6 pb-5 text-[#221F20] text-left px-[15px]">Tài khoản của tôi
                                                </h3>
                                            </div>
                                            <ul className="px-[15px] py-4">
                                                <li className="group mb-6">
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                                        <span className="mr-3 "><i className="fa-regular fa-user" /></span>
                                                        Thông tin tài khoản
                                                    </a>
                                                </li>
                                                <li className="group mb-6">
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                                        <span className="mr-3 "><i className="fa-solid fa-arrows-rotate" /></span>
                                                        Quản lý đơn hàng
                                                    </a>
                                                </li>
                                                <li className="group mb-6">
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
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
                                                    <a href="#" className="flex items-center text-sm font-semibold group-hover:text-gray-800 ">
                                                        <span className="mr-3 "><i className="fa-solid fa-arrow-right-from-bracket" /></span>
                                                        Đăng xuất
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>

    )
}

export default Header