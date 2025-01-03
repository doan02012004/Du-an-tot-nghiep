import { Link } from 'react-router-dom'

const CanPayment = () => {
    return (
        <section>
            <div className="container mx-auto">
                <div className="flex flex-col items-center py-10 lg:px-72 gap-4">
                    <div className="flex flex-col items-center gap-4">
                        <span className="border border-red size-32 flex items-center justify-center text-3xl text-red rounded-full">
                            <i className="fa-solid fa-xmark" />
                        </span>
                        <span className="text-3xl text-black font-semibold">Bạn đã hủy đơn hàng</span>
                    </div>
                    <div className="flex flex-col items-center">
                        {/* <span className="text-center">
                            Chào Trọng, đơn hàng của bạn với mã{' '}
                            <a href="#" className=" text-green-500 underline">
                                Trọng đá
                            </a>{' '}
                            đã được hủy thành công.
                        </span> */}
                        <span className="text-center">
                            Hệ thống sẽ tự động lưu đơn hàng lại vào trong quản lý đơn hàng 7 ngày nếu bạn muốn tiếp tục mua chúng
                        </span>
                        <span>Cảm ơn trọng đã tin dùng sản phẩm của Đớ!</span>
                        <span className="text-center">
                            Chú ý: Miễn đổi trả với sản phẩm đồng giá / sale trên 50%
                        </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <a href="/" className="">
                            <button className="text-sm px-3 py-2 lg:text-base lg:w-[240px] border border-black bg-black text-white lg:px-5 lg:py-3 rounded-tl-[20px] rounded-br-[20px] hover:bg-white hover:text-black hover:border hover:border-black">
                                TRANG CHỦ
                            </button>
                        </a>
                        <Link to={'/customer/order-manager'}>
                            <button className="text-sm px-3 py-2 lg:text-base lg:w-[240px] border border-black bg-black text-white lg:px-5 lg:py-3 rounded-tl-[20px] rounded-br-[20px] hover:bg-white hover:text-black hover:border hover:border-black">
                                THEO DÕI ĐƠN HÀNG
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CanPayment
