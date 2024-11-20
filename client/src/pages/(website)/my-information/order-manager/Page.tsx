import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import useOrderMutation from '../../../../common/hooks/orders/useOrderMutation';
import { useOrderQuery } from '../../../../common/hooks/orders/useOrderQuery';
import { formatPrice } from '../../../../common/utils/product';
import TextArea from 'antd/es/input/TextArea';
import useComplaintMutation from '../../../../common/hooks/complaint/useComplaintMutation';


const OrderManager = () => {

  const {currentUser} = useContext(AppContext)
  // const storedUser = localStorage.getItem('tt_user');
  // const infoUser = storedUser ? JSON.parse(storedUser) : null;
  const [open,setopen] = useState(false)
  const [items,setitems] = useState('')
  const [id,setid] = useState('')
  const [totalOrder,settotalOrder] = useState('')
  const [totalPrice,settotalPrice] = useState('')
  const [voucher,settvoucher] = useState('')
  const [ship,setship] = useState('')
  const [message,setmessage] = useState('')
  console.log(open)
  const mutation = useOrderMutation();
  const orders = useOrderQuery({userId:currentUser?._id})
  const mutations = useComplaintMutation();
  const itemsOder = orders.data
  console.log(itemsOder)
  console.log(items)
  console.log(id)
  console.log(totalOrder)
  console.log(totalPrice)
  console.log(voucher)
  console.log(ship)
  console.log(message)
  // const img = itemsOder[0].items[0].gallery.avatar
  // console.log(img)
  

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    mutations.mutate({
      action: 'add',
      complaintData: {
        orderId: values.orderId,
        userId: values.userId,
        complaintReason: values.complaintReason,
        status: values.status,
      },
    });
  
    // Cập nhật trạng thái đơn hàng thành 'Returngoods'
    mutation.mutate({
      action: "updateStatus",
      orderId: values.orderId,
      status: "Complaints",
    });
  
    const newMessage = "Đang chờ xử lý trả hàng";
    setmessage(newMessage);
    localStorage.setItem('complaintMessage', newMessage);  // Lưu dữ liệu vào localStorage
    form.resetFields(); // Reset lại form sau khi submit
    setopen(!open);
    console.log('Form Values:', values);
  };
  
  // Đọc dữ liệu từ localStorage khi component load lại
  useEffect(() => {
    const savedMessage = localStorage.getItem('complaintMessage');
    if (savedMessage) {
      setmessage(savedMessage);  // Đọc dữ liệu từ localStorage khi trang reload
    }
  }, []);
  

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
      case 'Returngoods':
        return 'Trả hàng';
      case 'Complaints':
        return 'Khiếu nại';
      default:
        return 'Không xác định';
    }
  };
  console.log(items[0])

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
            <option value="">Khiếu nại</option>
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
                <tr className="flex flex-wrap lg:table-row">
                  <td className="flex-[50%] lg:table-cell pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']  underline lg:no-underline">{order.orderNumber}</td>
                  <td className="lg:table-cell  pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']">{formattedDate}</td>
                  <td className="order-4 pt-5 py-3 lg:border-t-[1px] border-b-[1px] lg:border-['#f7f8f9']">
                    <div className="flex items-center gap-2">
                      {/* <img className="w-4 h-4" src="public/icons/loading.svg" alt="" srcSet="" /> */}
                      <span>{renderOrderStatus(order.status)}</span>
                    </div>
                    {order.status === "pending" && (
                      <div onClick={() => mutation.mutate({ action: "updateStatus", orderId: order._id, status: "cancelled" })} className="flex justify-center text-[14px] mt-1 cursor-pointer italic underline">
                        Hủy đơn
                      </div>
                    )}
                    {(order.status === "delivered" || order.status === "received") && (
                      <Button onClick={()=>{setopen(!open);setitems(order.items);setid(order._id);settotalOrder(order.totalOrder);settotalPrice(order.totalPrice);settvoucher(order.voucher.discountValue),setship(order.ship.value.price)}}>Trả hàng</Button>
                    ) }
                  </td>
                  <td className="order-2 flex-[100%] lg:table-cell pt-5 py-3 lg:border-t-[1px] lg:border-b-[1px] lg:border-['#f7f8f9']">{
                    order.items.map((item: any) => (
                      <div className="">{item.quantity}x {item.name}</div>
                    ))
                  }</td>
                  <td className="order-3 flex-[50%] pt-5 py-3 lg:border-t-[1px] border-b-[1px] font-bold border-['#f7f8f9']"> {formatPrice(order.totalPrice-order.voucher.discountValue)}₫</td>
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
      {open && (
        <div className="w-[50%] h-[80%] border border-black rounded-xl fixed top-20 p-5 shadow-2xl bg-white overflow-y-auto">
          <div className="">
            <h1 className='text-center text-red font-semibold'>KHIẾU NẠI ĐƠN HÀNG</h1>
            <CloseOutlined style={{ fontSize: 20, color: 'black' }} onClick={()=>setopen(!open)} className='absolute top-5 right-5' />
              <div className="mt-10">
                <div className="grid grid-cols-2 gap-4 mb-3 ">
                    <div className="">
                    {items.map((pro:any,index:number)=>(
                      <div key={index+1} className="mt-2 flex">
                        <img src={pro.gallery.avatar} alt="" width={100} height={20} className='object-cover' />
                        <div className="ml-[6%] w-[178.715px]">
                          <h3>{pro.name}</h3>
                          <p>Size: {pro.attribute.size}</p>
                          <p>Màu: {pro.attribute.color}</p>
                          <div className="flex justify-between">
                            <span>Giá : {pro.price}đ</span>
                            <span>X{pro.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ) )}
                    </div>
                    <div className="mt-4 border-dashed border-l-4 p-5">
                      <div className="flex">
                      <h4 className='w-[160px]'>Tống số tiền hàng :</h4>
                      <span>{totalPrice}đ</span> <span className='ml-4'>X{totalOrder}</span>
                      </div>
                      <div className="flex">
                      <h4 className='w-[160px]'>Phí vận chuyển:</h4>
                      <span>{ship}đ</span>
                      </div>
                      <div className="flex">
                      <h4 className='w-[160px]'>Mã giảm giá:</h4>
                      <span>{voucher}đ</span>
                      </div>
                      <div className="flex">
                      <h4 className='w-[160px]'>Tổng giá tri:</h4>
                      <span>{totalPrice-voucher}đ</span>
                      </div>
                    </div>
                </div>
                {/* from */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                      orderId: id, // Giá trị orderId tạm thời
                      userId: currentUser?._id, // Giá trị userId tạm thời
                      status: 'new', // Giá trị mặc định của status
                    }}
                  >
                    {/* Trường orderId (ẩn đi) */}
                    <Form.Item name="orderId" style={{ display: 'none' }}>
                      <Input type="hidden" />
                    </Form.Item>

                    {/* Trường userId (ẩn đi) */}
                    <Form.Item name="userId" style={{ display: 'none' }}>
                      <Input type="hidden" />
                    </Form.Item>

                    {/* Trường status (ẩn đi) */}
                    <Form.Item name="status" style={{ display: 'none' }}>
                      <Input type="hidden" />
                    </Form.Item>

                    {/* Trường complaintReason */}
                    <Form.Item
                      name="complaintReason"
                      label="Lý Do Khiếu Nại"
                      rules={[{ required: true, message: 'Vui lòng nhập lý do khiếu nại!' }]}
                    >
                      <TextArea rows={4} placeholder="Nhập lý do khiếu nại của bạn..." />
                    </Form.Item>

                    {/* Nút Submit */}
                    <Form.Item className="text-center">
                      <Button type="primary" htmlType="submit">Gửi Khiếu Nại</Button>
                    </Form.Item>
                  </Form>
              </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default OrderManager