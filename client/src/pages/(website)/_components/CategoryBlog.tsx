import React from 'react'

const CategoryBlog = () => {
  return (
    <div> <div className="border border-gray-200 rounded-tl-[32px] rounded-br-[32px] p-10 ">
    <div>
        <h1 className="mb-8 text-xl font-semibold text-dark">Danh Mục</h1>
        <div>
            <a href="#" className="block mb-8 ">
                <p className="flex items-center justify-between">
                    <span>Sự kiện thời trang</span>
                    <span><i className="fa-solid fa-arrow-right" /></span>
                </p>
            </a>
            <a href="#" className="block mb-8 ">
                <p className="flex items-center justify-between ">
                    <span>Blog chia sẻ</span>
                    <span><i className="fa-solid fa-arrow-right" /></span>
                </p>
            </a>
            <a href="#" className="block ">
                <p className="flex items-center justify-between ">
                    <span>Hoạt động cộng đồng</span>
                    <span><i className="fa-solid fa-arrow-right" /></span>
                </p>
            </a>
        </div>
    </div>
</div></div>
  )
}

export default CategoryBlog