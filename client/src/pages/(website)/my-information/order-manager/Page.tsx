import { useContext } from 'react';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import useOrderMutation from '../../../../common/hooks/orders/useOrderMutation';
import { useOrderQuery } from '../../../../common/hooks/orders/useOrderQuery';
import { formatPrice } from '../../../../common/utils/product';


const OrderManager = () => {

  const {currentUser} = useContext(AppContext)
  // const storedUser = localStorage.getItem('tt_user');
  // const infoUser = storedUser ? JSON.parse(storedUser) : null;

  const mutation = useOrderMutation();

  const orders = useOrderQuery({userId:currentUser?._id})

  const renderOrderStatus = (status : string) => {
    switch (status) {
      case 'pending':
        return 'Đơn chờ xử lý'
      case 'unpaid':
        return 'Chưa thanh toán';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipped':
        return 'Đã giao';
      case 'delivered':
        return 'Đã giao thành công';
      case 'cancelled':
        return 'Đã hủy';
      case 'received':
        return 'Đã nhận hàng';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center gap-8">
        <h1 className="uppercase font-semibold text-lg mb-4 lg:text-2xl text-dark lg:mb-8">QUẢN LÝ ĐƠN HÀNG</h1>
        <div className="flex flex-col relative select-information">
          <span className=" color:['#6C6D70'] ">Trạng thái đơn hàng:</span>
          {/* Update select to Ant design */}
          <select name="" id="" className="text-sm border rounded-md px-4 py-3 w-[210px] appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base text-black ">
            <option value="">Tất cả</option>
            <option value="">Đặt hàng thành công</option>
            <option value="">Đang xử lý</option>
            <option value="">Đang xử lý</option>
            <option value="">Chờ giao vận</option>
            <option value="">Đã gửi</option>
            <option value="">Đã nhận hàng</option>
            <option value="">Đã hủy</option>
            <option value="">Trả hàng</option>
          </select>
          <span className="select-icon absolute right-5 bottom-0 -translate-y-1/2"><i className="fa-solid fa-chevron-right rotate-90" /></span>
        </div>
      </div>
      {/* oder */}
      <section className="mt-10">
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
            {orders && orders?.data?.map((order: any, index: number) => {
              console.log(order);
              const date = new Date(order.createdAt);
              const formattedDate = date.toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              });
              return (
                <tr className="flex flex-wrap lg:table-row ">
                  <td className="flex-[50%] lg:table-cell pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']  underline lg:no-underline">{order.orderNumber}</td>
                  <td className="lg:table-cell  pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']">{formattedDate}</td>
                  <td className="order-4 pt-5 py-3 lg:border-t-[1px] border-b-[1px] lg:border-['#f7f8f9']">
                    <div className="flex items-center gap-2">
                      <img className="w-4 h-4" src="public/icons/loading.svg" alt="" srcSet="" />
                      <span>{renderOrderStatus(order.status)}</span>
                    </div>
                    {order.status === "pending" && (
                      <div onClick={() => mutation.mutate({ action: "updateStatus", orderId: order._id, status: "cancelled" })} className="flex justify-center text-[14px] mt-1 cursor-pointer italic underline">
                        Hủy đơn
                      </div>
                    )}
                  </td>
                  <td className="order-2 flex-[100%] lg:table-cell pt-5 py-3 lg:border-t-[1px] lg:border-b-[1px] lg:border-['#f7f8f9']">{
                    order.items.map((item: any) => (
                      <div className="">{item.quantity}x {item.name}</div>
                    ))
                  }</td>
                  <td className="order-3 flex-[50%] pt-5 py-3 lg:border-t-[1px] border-b-[1px] font-bold border-['#f7f8f9']"> {formatPrice(order.totalPrice)}₫</td>
                </tr>
              )
            })}

          </tbody>
        </table>
        <div className="flex justify-center mt-8">
          <button className="border mr-4 border-dark rounded-tl-lg bg-dark rounded-br-lg text-white px-3 py-1 pointer-events-none transition duration-300 ease-in-out">
            1
          </button>
        </div>
      </section>
    </div>

  )
}

export default OrderManager