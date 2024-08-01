import React from 'react'
import loading from '../../../../assets/icons/loading.svg'


const OrderManager = () => {
  return (
      <section className="mt-10 w-full">
        <table className="w-full table-auto text-left ">
          <thead className="hidden lg:table-header-group">
            <tr>
              <th className="pt-5 py-3 border-t-[1px] border-b-[1px] border-['#f7f8f9']">Mã đơn hàng</th>
              <th className="pt-5 py-3 border-t-[1px] border-b-[1px] border-['#f7f8f9']">Ngày</th>
              <th className="pt-5 py-3 border-t-[1px] border-b-[1px] border-['#f7f8f9']">Trạng thái</th>
              <th className="pt-5 py-3 border-t-[1px] border-b-[1px] border-['#f7f8f9']">Sản phẩm</th>
              <th className="pt-5 py-3 border-t-[1px] border-b-[1px] border-['#f7f8f9']">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex flex-wrap lg:table-row ">
              <td className="flex-[50%] lg:table-cell pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']  underline lg:no-underline">IVM6338833</td>
              <td className="lg:table-cell  pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']">12/07/2024 11:33:17</td>
              <td className="order-4 pt-5 py-3 lg:border-t-[1px] border-b-[1px] lg:border-['#f7f8f9']">
                <div className="flex items-center gap-2">
                  <img className="w-4 h-4" src={loading} alt="" srcSet="" />
                  <span>Đã hủy đơn hàng</span>
                </div>
              </td>
              <td className="order-2 flex-[100%] lg:table-cell pt-5 py-3 lg:border-t-[1px] lg:border-b-[1px] lg:border-['#f7f8f9']">1x Áo thun Regular in hình, Trắng</td>
              <td className="order-3 flex-[50%] pt-5 py-3 lg:border-t-[1px] border-b-[1px] font-bold border-['#f7f8f9']">413,000 ₫</td>
            </tr>
            <tr className="flex flex-wrap lg:table-row ">
              <td className="flex-[50%] lg:table-cell pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']  underline lg:no-underline">IVM6338833</td>
              <td className="lg:table-cell  pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']">12/07/2024 11:33:17</td>
              <td className="order-4 pt-5 py-3 lg:border-t-[1px] border-b-[1px] lg:border-['#f7f8f9']">
                <div className="flex items-center gap-2">
                  <img className="w-4 h-4" src={loading} alt="" srcSet="" />
                  <span>Đã hủy đơn hàng</span>
                </div>
              </td>
              <td className="order-2 flex-[100%] lg:table-cell pt-5 py-3 lg:border-t-[1px] lg:border-b-[1px] lg:border-['#f7f8f9']">1x Áo thun Regular in hình, Trắng</td>
              <td className="order-3 flex-[50%] pt-5 py-3 lg:border-t-[1px] border-b-[1px] font-bold border-['#f7f8f9']">413,000 ₫</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center mt-8">
          <button className="border mr-4 border-dark rounded-tl-lg bg-dark rounded-br-lg text-white px-3 py-1 pointer-events-none transition duration-300 ease-in-out">
            1
          </button>
        </div>
      </section>
  )
}

export default OrderManager