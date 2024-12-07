import { useParams } from 'react-router-dom';
import { useOrderQuery } from '../../../../common/hooks/orders/useOrderQuery';
import { Button, Form, Input, Radio } from 'antd';
import { CheckCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import useOrderMutation from '../../../../common/hooks/orders/useOrderMutation';
import { useState } from 'react';
import instance from '../../../../common/config/axios';

type Props = {};

const OrderDetails = (props: Props) => {
  const { id } = useParams();
  const query = useOrderQuery({ orderId: id });
  const mutation = useOrderMutation();
  const [form] = Form.useForm();
  const [check,setcheck] = useState(false)
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const order = query?.data;
  const customer = order?.customerInfor;
  const items = order?.items;
  const ship = order?.ship;
  const voucher = order?.voucher
  const Goodsmoney = order?.totalPrice - ship?.value?.price || 0
  const Totalamount = voucher ? order?.totalPrice - voucher?.discountValue : order?.totalPrice
  console.log(order)
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
          orderId: id,
          status: "cancelled",  // Kiểm tra giá trị này
          cancelReason: cancelReason,
        });
      
        setcheck(!check);
  }

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

  // Hàm xác định màu sắc trạng thái
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'unpaid':
        return 'bg-red-200 text-red-800';
      case 'confirmed':
        return 'bg-blue-200 text-blue-800';
      case 'shipped':
        return 'bg-teal-200 text-teal-800';
      case 'delivered':
      case 'received':
        return 'bg-green-200 text-green-800';
      case 'cancelled':
      case 'Returngoods':
        return 'bg-gray-200 text-gray-800';
      case 'Complaints':
      case 'Refunded':
      case 'Exchanged':
        return 'bg-purple-200 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Hàm chuyển trạng thái sang tiếng Việt
  const translateStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Đang chờ xử lý';
      case 'unpaid':
        return 'Chưa thanh toán';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipped':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'received':
        return 'Đã nhận hàng';
      case 'cancelled':
        return 'Đã hủy';
      case 'Returngoods':
        return 'Trả hàng';
      case 'Complaints':
        return 'Khiếu nại';
      case 'Refunded':
        return 'Đã hoàn tiền';
      case 'Exchanged':
        return 'Đã đổi hàng';
      default:
        return 'Không xác định';
    }
  };
  // Hàm xử lý nhận hàng
  const onHandleReceived = (orderId:string) =>{
    mutation.mutate({ action: "updateStatus", orderId: orderId, status: "received" })
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Chi tiết đơn hàng</h1>

      {/* Trạng thái đơn hàng */}
      <div className="mb-6 flex">
        <span
          className={`px-4 py-2 rounded-full font-semibold ${getStatusStyle(order?.status || '')}`}
        >
          Trạng thái: {translateStatus(order?.status || '')}
        </span>
        {(order?.status === "delivered" || order?.status === "Exchanged") && (
                     <Button type='primary' onClick={() => onHandleReceived(order?._id) } className="flex justify-center text-[14px] mt-1 cursor-pointer italic underline ml-2">
                      <CheckCircleOutlined style={{ fontSize: '24px', color: 'white' }} />
                      Đã nhận hàng
                     </Button>
                    )}
        {(order?.paymentMethod === "cash" && order.status === "pending") && (
                     <Button type='primary' danger onClick={()=>{setcheck(!check)}} className="flex justify-center text-[14px] ml-1 mt-1 cursor-pointer italic underline">
                     <DeleteOutlined style={{ fontSize: '24px', color: 'white' }} />
                     Huỷ đơn 
                     </Button>
                    )}
        {order?.status === "unpaid" && (
                      <div className='flex'>
                        <Button onClick={() => handlePayAgain(order._id)} ><span>Tiếp tục thanh toán</span>
                        </Button>
                        <Button type='primary' danger onClick={()=>{setcheck(!check)}} className="flex justify-center text-[14px] mt-1 cursor-pointer italic underline">
                        <DeleteOutlined style={{ fontSize: '24px', color: 'white' }} /> Huỷ đơn hàng
                        </Button>
                      </div>
                    )}
      </div>

      {/* Thông tin đơn hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Địa chỉ nhận hàng */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Địa chỉ nhận hàng</h3>
          <p><strong>Tên:</strong> {customer?.fullname || 'N/A'}</p>
          <p>
            <strong>Địa chỉ:</strong> {customer?.address}, {customer?.ward}, {customer?.district}, {customer?.city}
          </p>
          <p><strong>Số điện thoại:</strong> {customer?.phone || 'N/A'}</p>
        </div>

        {/* Thông tin vận chuyển */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin vận chuyển</h3>
          <p><strong>Hình thức giao hàng:</strong> {ship?.nameBrand || 'N/A'}</p>
          <p>
            <strong>Trạng thái giao hàng:</strong>{' '}
            {(order?.status === 'delivered' || order?.status === 'received')
              ? 'Đã giao'
              : 'Chưa giao'}
          </p>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh sách sản phẩm</h3>
        <div className="divide-y divide-gray-200">
          {items?.map((item: any, index: number) => (
            <div key={index} className="flex items-center it py-4">
              <img src={item?.gallery?.avatar || 'https://via.placeholder.com/80'} alt={item.name} className="w-20 h-[84px] rounded-lg mr-4 object-cover" />
              <div className="flex-grow">
                <span className="font-medium text-gray-800">{item?.name}</span><br />
                <span>Màu:{item?.attribute?.color}</span><br /><span>Size:{item?.attribute?.size}</span>
                <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
              </div>
              <div className="">
              <p className="font-semibold text-gray-800">
                {(item.price * item.quantity).toLocaleString()}₫
              </p>
              <Button type='primary' >ĐÁNH GIÁ</Button>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Tổng chi phí */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tổng thanh toán</h3>
        <div className="flex justify-between mb-2">
          <span>Tổng tiền sản phẩm:</span>
          <span>{Goodsmoney?.toLocaleString() || '0'}₫</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Phí giao hàng:</span>
          <span>{ship?.value?.price?.toLocaleString() || '0'}₫</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Mã giảm giá:</span>
          <span>{voucher?.discountValue.toLocaleString() || '0'}₫</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Tổng thanh toán:</span>
          <span>{Totalamount?.toLocaleString() || '0'}₫</span>
        </div>
      </div>
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
  );
};

export default OrderDetails;