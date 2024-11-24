import { useEffect, useState } from 'react'
import { Iproduct } from '../../../../common/interfaces/product'
import Product from '../../_components/Product'
import Pagination from './Pagination'
import { Spin } from 'antd'

type Props = {
  data: {
    products: Iproduct[]
  }
}

const Sub_main_prod = ({ data }: Props) => {
  const [loading, setLoading] = useState(true)

  // Giả sử bạn tải dữ liệu ở đây, ví dụ từ API hoặc từ props
  useEffect(() => {
    // Mô phỏng quá trình tải dữ liệu từ API
    if (data?.products) {
      setLoading(false)  // Đặt loading = false khi dữ liệu đã được tải
    }
  }, [data?.products])

  return (
    <div className="sub-main-prod mt-3 lg:mt-[26px]">
      <div className="list-products">
        {/* Hiển thị Spinner khi đang tải */}
        {loading ? (
          <div className="w-full flex justify-center py-6">
            <Spin size="large" />
          </div>
        ) : (
          <div className="item-cat-product grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-9">
            {data?.products?.length === 0 ? (
              <div className="w-full text-center py-6">
                <p>Không tồn tại sản phẩm</p>
              </div>
            ) : (
              data?.products?.map((product: Iproduct) => (
                <Product key={product._id} product={product} />
              ))
            )}
          </div>
        )}
        {/* -----------------end products ---------------------------------------------*/}
        <Pagination dataPage={data} />
      </div>
    </div>
  )
}

export default Sub_main_prod
