/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleOutlined, CloseOutlined, DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import useOrderMutation from '../../../../common/hooks/orders/useOrderMutation';
import { useOrderQuery } from '../../../../common/hooks/orders/useOrderQuery';
import { formatPrice } from '../../../../common/utils/product';
import TextArea from 'antd/es/input/TextArea';
import useComplaintMutation from '../../../../common/hooks/complaint/useComplaintMutation';
import instance from '../../../../common/config/axios';


const OrderManager = () => {
  const {currentUser,socket} = useContext(AppContext)
  const [open,setopen] = useState(false)
  const [order,setorder] = useState([])
  const [items,setitems] = useState('')
  const [id,setid] = useState('')
  const [totalOrder,settotalOrder] = useState('')
  const [totalPrice,settotalPrice] = useState('')
  const [voucher,settvoucher] = useState('')
  const [ship,setship] = useState('')
  const mutation = useOrderMutation();
  const orders = useOrderQuery({userId:currentUser?._id})
  useEffect(()=>{
    if(orders?.data){
      setorder(orders?.data)
    }
  },[orders?.data])
  const mutations = useComplaintMutation();
  const [form] = Form.useForm();
  const [check,setcheck] = useState(false)
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [orderId,setorderId] = useState("")

  useEffect(()=>{
    if(socket?.current){
      socket.current?.on('onUpdateOrderStatus',(data:any) =>{
        if(currentUser?._id == data?.userId?._id){
          if(order?.length>0){
            const findOrder = order.findIndex((item:any) => item?._id == data?._id)
            if(findOrder>=0) {
              const newOrder = order.map((item:any) => item._id == data?._id ? {...item,status:data.status} : item ) as any
              setorder(newOrder)
            }
          }
        }
      })
    }
  },[socket,order])

  const reasons = [
    'Sản phẩm không như mong đợi',
    'Chất lượng sản phẩm không tốt',
    'Giá sản phẩm quá cao',
    'Giao hàng quá chậm',
    'Khác'
  ];

  const onSubmit = (values) => {
    const cancelReason = values.reason === "Khác" ? values.otherReason : values.reason;
        
        mutation.mutate({
          action: "updateStatus",
          orderId: orderId,
          status: "cancelled",  // Kiểm tra giá trị này
          cancelReason: cancelReason,
        });
      
        setcheck(!check);
  }

  
  const handleSubmit = (values:any) => {
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
    form.resetFields(); // Reset lại form sau khi submit
    setopen(!open);
  };

  const renderOrderStatus = (status : string) => {
    switch (status) {
      case 'pending':
        return 'Đơn chờ xử lý';
      case 'unpaid':
        return 'Chưa thanh toán';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipped':
        return 'Đang giao';
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
      // case 'Refunded':
      //   return 'Hoàn tiền';
      case 'Exchanged':
        return 'Đổi trả hàng';
      default:
        return 'Không xác định';
    }
  };
  // Xử lý logic thanh toán lại đơn hàng
  const handlePayAgain = async (orderId:string) => {
    try {
      // Gửi yêu cầu tới API backend để tạo liên kết thanh toán
      const response = await instance.post(`/orders/pay-again/${orderId}`);

      if (response.status === 200) {
        const { paymentLink } = response.data;
        window.location.href = paymentLink; // Điều hướng tới cổng thanh toán VNPay
      } else {
        // message.error('Không thể tạo yêu cầu thanh toán lại.');
        console.log("Không thể tạo yêu cầu thanh toán lại.");
      }
    } catch (error) {
      // message.error('Lỗi khi tạo yêu cầu thanh toán lại.');
      console.log("Lỗi khi tạo yêu cầu thanh toán lại.");
    }
  };

  // Hàm xử lý nhận hàng
  const onHandleReceived = (orderId:string) =>{
    mutation.mutate({ action: "updateStatus", orderId: orderId, status: "received" })
  }
  // const sortedOrders = orders?.data?.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const [filterStatus, setFilterStatus] = useState(""); // Trạng thái được chọn để lọc

  // Lọc và sắp xếp danh sách đơn hàng
  const filteredOrders = order
    ?.filter((order: any) => (filterStatus ? order.status === filterStatus : true)) // Lọc theo trạng thái
    ?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sắp xếp



  
  return (
   <>
    <div className="w-full">
      <div className="w-full flex justify-between items-center gap-8">
        <h1 className="uppercase font-semibold text-lg mb-4 lg:text-2xl text-dark lg:mb-8">QUẢN LÝ ĐƠN HÀNG</h1>
        <div className="flex flex-col relative select-information">
          <span className=" color:['#6C6D70'] ">Trạng thái đơn hàng:</span>
          {/* Update select to Ant design */}
          <select 
            name="filter" 
            id="filter" 
            className="text-sm border rounded-md px-4 py-3 w-[210px] appearance-none select-content focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:text-base text-black" 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="pending">Đang chờ xử lý</option>
            <option value="unpaid">Chưa thanh toán</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="shipped">Đang giao hàng</option>
            <option value="delivered">Đã giao hàng</option>
            <option value="received">Đã nhận hàng</option>
            <option value="cancelled">Đã hủy</option>
            <option value="Returngoods">Trả hàng</option>
            <option value="Complaints">Khiếu nại</option>
            <option value="Exchanged">Đổi trả hàng</option>
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
            {filteredOrders?.map((order: any) => {
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
                <tr className="flex flex-wrap lg:table-row" key={order?._id}> 
                  <td className="flex-[50%] lg:table-cell pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']  underline lg:no-underline"><a href={`/customer/orderdetails/${order?._id}`}>{order.orderNumber}</a></td>
                  <td className="lg:table-cell  pt-5 py-3 border-t-[1px] lg:border-b-[1px] border-['#f7f8f9']">{formattedDate}</td>


                  <td className="order-4 pt-5 py-3 lg:border-t-[1px] border-b-[1px] lg:border-['#f7f8f9']">
                    <div className="flex items-center gap-2">
                      {/* <img className="w-4 h-4" src="public/icons/loading.svg" alt="" srcSet="" /> */}
                      <span>{renderOrderStatus(order.status)}</span>
                    </div>
          
                    {(order.paymentMethod === "cash" && order.status === "pending") && (
                     <Button type='primary' danger onClick={()=>{setorderId(order._id),setcheck(!check)}} className="flex justify-center text-[14px] mt-1 cursor-pointer italic underline">
                     <DeleteOutlined style={{ fontSize: '24px', color: 'white' }} />
                     Huỷ đơn 
                     </Button>
                    )}
                    {(order.status === "delivered") && (
                      <Button onClick={()=>{setopen(!open);setitems(order.items);setid(order._id);settotalOrder(order.totalOrder);settotalPrice(order.totalPrice);settvoucher(order.voucher.discountValue),setship(order.ship.value.price)}}>
                        <RollbackOutlined style={{ fontSize: '18px', marginRight: '8px' }} />
                        Trả hàng
                      </Button>
                    ) }
                    {(order.status === "delivered" || order.status === "Exchanged") && (
                     <Button type='primary' onClick={() => onHandleReceived(order?._id) } className="flex justify-center text-[14px] mt-1 cursor-pointer italic underline">
                      <CheckCircleOutlined style={{ fontSize: '24px', color: 'white' }} />
                      Đã nhận hàng
                     </Button>
                    )}
                    {order.status === "unpaid" && (
                      <div className=''>
                        <Button onClick={() => handlePayAgain(order._id)} ><span>Tiếp tục thanh toán</span>
                        </Button>
                        <Button type='primary' danger onClick={()=>{setorderId(order._id),setcheck(!check)}} className="flex justify-center text-[14px] mt-1 cursor-pointer italic underline">
                        <DeleteOutlined style={{ fontSize: '24px', color: 'white' }} /> Huỷ đơn hàng
                        </Button>
                      </div>
                    )}

                    {/* {(order.status === "delivered" || order.status === "received") && (
                      <Button onClick={() => { setopen(!open); setitems(order.items); setid(order._id); settotalOrder(order.totalOrder); settotalPrice(order.totalPrice); settvoucher(order.voucher.discountValue), setship(order.ship.value.price) }}>Trả hàng</Button>
                    )} */}

                    {/* {order.status === "unpaid" && (
                      <Button onClick={() => handlePayAgain(order._id)} ><span>Tiếp tục thanh toán</span>
                      </Button>
                    )} */}
                  </td>
                  <td className="order-2 flex-[100%] lg:table-cell pt-5 py-3 lg:border-t-[1px] lg:border-b-[1px] lg:border-['#f7f8f9']">
                    {
                    order.items.map((item: any) => (
                      <div className="" key={item?._id}>{item.quantity}x {item.name}</div>
                    ))
                  }</td>
                  <td className="order-3 flex-[50%] pt-5 py-3 lg:border-t-[1px] border-b-[1px] font-bold border-['#f7f8f9']"> {formatPrice(order.totalPrice)}₫</td>
                </tr>
              )
            })}

          </tbody>
        </table>
        {/* <div className="flex justify-center mt-8">
          <button className="border mr-4 border-dark rounded-tl-lg bg-dark rounded-br-lg text-white px-3 py-1 pointer-events-none transition duration-300 ease-in-out">
            1
          </button>
        </div> */}
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

      {/* lý do huỷ đơn */}
      {check === true && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <div className="relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-red">LÝ DO HUỶ ĐƠN HÀNG</h2>
                        <CloseOutlined
                        style={{ fontSize: '24px', color: 'red' }}
                        className="absolute top-1 right-1"
                        onClick={() => setcheck(!check)}
                        />
                    </div>
                    <Form form={form} layout="vertical" onFinish={onSubmit}>
                    <Form.Item name="reason" initialValue={selectedReason}>
                        <Radio.Group
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-full"
                        >
                        {reasons?.length > 0 &&
                            reasons.map((reason, index) => (
                            <div key={index} className="flex items-center">
                                <Radio value={reason} className="mr-2">
                                {reason}
                                </Radio>
                            </div>
                            ))}
                        </Radio.Group>
                    </Form.Item>

                    {selectedReason === 'Khác' && (
                        <Form.Item name="otherReason" initialValue={otherReason}>
                        <div className="mt-4">
                            <label htmlFor="otherReason" className="block text-lg mb-2">
                            Lý do khác:
                            </label>
                            <Input.TextArea
                            id="otherReason"
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            placeholder="Nhập lý do khác..."
                            required
                            className="w-full"
                            rows={4} // Số dòng của TextArea
                            />
                        </div>
                        </Form.Item>
                    )}
                    <Button className="mt-2" type="primary" danger htmlType="submit">
                        Xác nhận huỷ
                    </Button>
                    </Form>

                    </div>
                </div>
                )}
    </div>
   </>

  )
}

export default OrderManager