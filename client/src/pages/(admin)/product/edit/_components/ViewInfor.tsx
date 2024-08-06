
import { Button } from 'antd'
import { formatPrice } from '../../../../../common/utils/product'
import {  StarFilled } from '@ant-design/icons'
import CommentItem from './CommentItem'

const ViewInfor = () => {
    return (
        <div>
            <h1 className='text-xl font-semibold text-center mb-3'>Thông tin sản phẩm</h1>
            <div className='flex'>
                {/* Thông tin sản phẩm  */}
                <div className='basis-1/2 px-5 border-r-2 border-r-gray-500 '>
                    <div className=' grid grid-cols-2 gap-x-1'>
                        <div className='flex items-center'>
                            <p className='pr-2 font-semibold'>Tên sản phẩm :</p>
                            <p>Áo sơ mi nam</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='pr-2 font-semibold'>Danh mục :</p>
                            <p>Áo sơ mi</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='pr-2 font-semibold'>Giá niêm yết :</p>
                            <p>{formatPrice(200000)}đ</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='pr-2 font-semibold'>Giá khuyến mãi :</p>
                            <p>{formatPrice(190000)}đ</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='pr-2 font-semibold'>Giảm giá :</p>
                            <p>20%</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='pr-2 font-semibold'>Dành cho :</p>
                            <p>Nam</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='pr-2 font-semibold'>Hoạt động :</p>
                            <p className='text-green-500'>active</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='pr-2 font-semibold'>Nổi bật:</p>
                            <p>Không</p>
                        </div>
                    </div>
                    <Button className='bg-black text-white'>Cập nhật</Button>
                </div>
                {/* Bình luận  */}
                <div className='basis-1/2 px-5'>
                    {/* Đánh giá  */}
                    <div className='flex items-center mb-3'>
                        <div className='flex justify-center items-center'>
                            <div className='flex items-center w-max'>
                                <h1 className='text-[30px] m-0 pr-2'>4.7</h1>
                                <StarFilled className='text-yellow text-[26px] p-0' />
                            </div>
                        </div>
                        <div className='px-5'>
                            <div className='flex items-center w-full mb-1'>
                                <p className='m-0 pr-2'>0</p>
                                <div className='border w-[300px] h-3  rounded-full overflow-hidden'>
                                    <div className='bg-yellow w-full h-full'></div>
                                </div>
                            </div>
                            <div className='flex items-center w-full mb-1'>
                                <p className='m-0 pr-2'>0</p>
                                <div className='border w-[300px] h-3  rounded-full overflow-hidden'>
                                    <div className='bg-yellow w-4/5 h-full rounded-full'></div>
                                </div>
                            </div>
                            <div className='flex items-center w-full mb-1'>
                                <p className='m-0 pr-2'>0</p>
                                <div className='border w-[300px] h-3  rounded-full overflow-hidden'>
                                    <div className='bg-yellow w-3/5 h-full rounded-full'></div>
                                </div>
                            </div>
                            <div className='flex items-center w-full mb-1'>
                                <p className='m-0 pr-2'>0</p>
                                <div className='border w-[300px] h-3  rounded-full overflow-hidden'>
                                    <div className='bg-yellow w-2/5 h-full rounded-full'></div>
                                </div>
                            </div>
                            <div className='flex items-center w-full'>
                                <p className='m-0 pr-2'>0</p>
                                <div className='border w-[300px] h-3  rounded-full overflow-hidden'>
                                    <div className='bg-yellow w-1/5 h-full rounded-full'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hộp bình luận  */}
                    <div className='w-full h-72 overflow-y-scroll p-4 rounded-lg border'>
                       <CommentItem />
                       <CommentItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewInfor