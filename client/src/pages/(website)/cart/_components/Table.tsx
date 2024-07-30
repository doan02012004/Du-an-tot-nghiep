import bin from '../../../../assets/icons/image 8.png'

const Table = () => {
    return (
        <div>
            <div className="hidden lg:block">
                <table className="lg:w-full">
                    <thead>
                        <tr className="*:pb-5">
                            <th className="text-left text-[12px] ">TÊN SẢN PHẨM</th>
                            <th className="text-[12px] text-left">CHIẾT KHẤU</th>
                            <th className="text-[12px] text-left">SỐ LƯỢNG</th>
                            <th className="text-[12px] text-left pl-4">TỔNG GIÁ</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-t *:py-5">
                            <td className="w-[27rem]">
                                <div className="flex mt-0 pt-0 w-[27rem]">
                                    <div className="max-w-40 flex-none ">
                                        <a href='' className=''>
                                            <img src="./assets/images/products/ao1.jpg" className='' />
                                        </a>
                                    </div>
                                    <div className="flex-grow ml-4 p-0 m-0">
                                        <span> Elegance Dress - Đầm xòe cổ kiểu</span>
                                        <div className="flex gap-4 pt-5">
                                            <span className="text-[14px]">Màu sắc: Ghi</span>
                                            <span className="text-[14px]">Size: S</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="align-top">
                                <div className="text-left">
                                    <span className=''>-1.194.000đ</span>
                                    <p className="text-red text-[12px] font-bold">( -60% )</p>
                                </div>
                            </td>
                            <td className="align-top">
                                <div className="border grid grid-cols-3 items-center rounded-tl-[20px] rounded-br-[20px]">
                                    <button className=" border border-t-0 border-l-0 border-b-0 rounded-tl-[20px] rounded-br-[20px] py-[2px] px-2 text-[30px]">-</button>
                                    <span className="text-center">1</span>
                                    <button className=" border border-t-0 border-r-0 border-b-0 rounded-tl-[20px] rounded-br-[20px] py-[2px] px-2 text-[30px]">+</button>
                                </div>
                            </td>
                            <td className="align-top">
                                <div className=''>
                                    <span className="text-black font-bold text-[18px] pl-4">796.000đ</span>
                                </div>
                            </td>
                            <td className="align-top">
                                <img src={bin} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="lg:hidden flex justify-between">
                <div className="flex gap-2 w-2/3">
                    <div className="w-1/4"><img src="./assets/images/products/ao1.jpg" /></div>
                    <div className="flex flex-col gap-[6px]">
                        <span className="text-sm">Áo thun dino saurs</span>
                        <div className="text-sm">
                            <span>Màu sắc: Trắng</span>
                            <span>Size: S</span>
                        </div>
                        <div className="flex flex-col">
                            <span>89.00đ</span>
                            <span className="text-sm text-red font-semibold">( -30% )</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-10">
                    <span><i className="fa-solid fa-trash-can" /></span>
                    <div className="border grid grid-cols-3 items-center rounded-tl-[10px] rounded-br-[10px]">
                        <button className=" border border-t-0 border-l-0 border-b-0 rounded-tl-[10px] rounded-br-[10px] px-2 text-xl">-</button>
                        <span className="text-center">1</span>
                        <button className=" border border-t-0 border-r-0 border-b-0 rounded-tl-[10px] rounded-br-[10px]  px-2 text-xl">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table