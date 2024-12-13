import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Menu, Radio, Table, TableProps } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useOrderMutation from "../../../../common/hooks/orders/useOrderMutation";
import { useOrderQuery } from "../../../../common/hooks/orders/useOrderQuery";
import { IOrder } from "../../../../common/interfaces/orderInterfaces";
import { formatPrice } from "../../../../common/utils/product";
import { AppContext } from "../../../../common/contexts/AppContextProvider";


const OrderDetails = () => {
    const { id } = useParams();
    const query = useOrderQuery({ orderId: id });
    const [order,setorder] = useState({} as IOrder)
    const {currentUser,socket} = useContext(AppContext)
    useEffect(()=>{
        if(query?.data){
            setorder(query?.data)
        }
    },[query?.data])
    const mutation = useOrderMutation();
    const [check,setcheck] = useState(false)
    const [selectedReason, setSelectedReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [status,setstatus] = useState('');
    const [form] = Form.useForm()
    useEffect(()=>{
        if(socket?.current){
          socket.current?.on('onUpdateOrderStatus',(data:any) =>{
            if(data?._id == order?._id){
              if(data?.status == 'cancelled' || data?.status == 'received'|| data?.status == 'Complaints'|| data?.status == 'Returngoods'|| data?.status == 'Exchanged'){
                setorder(data)
              }
            }
          })
        }
      },[socket,order,currentUser])

    if (query.isLoading) return <div>Đang tải...</div>;
    if (query.isError) return <div>Lỗi khi tải chi tiết đơn hàng</div>;

    const customer = order.customerInfor;
    const items = order?.items;
    const ship = order?.ship;
    const voucher = order?.voucher
    const totalCartOrder = items?.reduce((sum:number,item:any)=>sum+item?.total,0)
    // Map trạng thái đơn hàng sang tiếng Việt
    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Đang chờ xác nhận';
            case 'unpaid':
                return 'Chưa thanh toán';
            case 'confirmed':
                return 'Đã xác nhận';
            case 'shipped':
                return 'Đang giao hàng';
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
            //     return 'Hoàn tiền';
            case 'Exchanged':
                return 'Đổi trả hàng';
            default:
                return 'Không xác định';
        }
    };

    const reasons = [
        'Sản phẩm không như mong đợi',
        'Chất lượng sản phẩm không tốt',
        'Giá sản phẩm quá cao',
        'Giao hàng quá chậm',
        'Khác'
    ];

    const onSubmit = (values) => {
        console.log("Submitting with status:", status); // Kiểm tra status trước khi gửi
        if (status === '') {
          alert('Vui lòng chọn trạng thái đơn hàng');
          return;
        }
      
        const cancelReason = values.reason === "Khác" ? values.otherReason : values.reason;
        
        mutation.mutate({
          action: "updateStatus",
          orderId: order._id,
          status: status,  // Kiểm tra giá trị này
          cancelReason: cancelReason,
        });
      
        setcheck(!check);
      };
           

    // Hàm kiểm tra tính hợp lệ của việc chuyển đổi trạng thái
    const validateStatusChange = (currentStatus: string, newStatus: string) => {
        const invalidTransitions: Record<string, string[]> = {
            pending: ["pending", "unpaid", "shipped", "delivered", "received", "Returngoods", "Complaints","Refunded","Exchanged"],
            unpaid: ["pending", "unpaid", "confirmed", "shipped", "delivered", "received", "Returngoods", "Complaints","Refunded","Exchanged"],
            confirmed: ["pending", "unpaid", "confirmed", "delivered", "cancelled", "received", "Returngoods", "Complaints","Refunded","Exchanged"],
            shipped: ["pending", "unpaid", "confirmed", "shipped", "cancelled", "received", "Returngoods", "Complaints","Refunded","Exchanged"],
            delivered: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "Returngoods","Complaints","Refunded","Exchanged"],
            cancelled: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received","Returngoods","Complaints","Refunded","Exchanged"],
            received: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received","Returngoods","Complaints","Refunded","Exchanged"],
            Complaints: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received","Returngoods","Complaints","Refunded","Exchanged"],
            Returngoods: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received","Returngoods","Complaints","Refunded","Exchanged"],
            Refunded: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received","Returngoods","Complaints","Refunded","Exchanged"],
            Exchanged: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received","Returngoods","Complaints","Refunded","Exchanged"]
        };
        return !(invalidTransitions[currentStatus]?.includes(newStatus));
    };



    const handleStatusChange = (newStatus: string) => {
        if(newStatus === "cancelled"){
            setstatus(newStatus)
            return;
        }
        // Nếu hợp lệ, thực hiện cập nhật trạng thái
        mutation.mutate({
            action: "updateStatus",
            orderId: order._id,
            status: newStatus,
        });
    };

    const statusMenu = (
        <Menu>
            <Menu.Item
                onClick={() => handleStatusChange('pending')}
                disabled={!validateStatusChange(order.status, 'pending')}
            >
                Đang chờ xác nhận
            </Menu.Item>
            <Menu.Item
                onClick={() => handleStatusChange('unpaid')}
                disabled={!validateStatusChange(order.status, 'unpaid')}
            >
                Chưa thanh toán
            </Menu.Item>
            <Menu.Item
                onClick={() => handleStatusChange('confirmed')}
                disabled={!validateStatusChange(order.status, 'confirmed')}
            >
                Đã xác nhận
            </Menu.Item>
            <Menu.Item
                onClick={() => handleStatusChange('shipped')}
                disabled={!validateStatusChange(order.status, 'shipped')}
            >
                Đang giao hàng
            </Menu.Item>
            <Menu.Item
                onClick={() => handleStatusChange('delivered')}
                disabled={!validateStatusChange(order.status, 'delivered')}
            >
                Đã giao thành công
            </Menu.Item>
            <Menu.Item
                onClick={() => {handleStatusChange('cancelled');setcheck(!check)}}
                disabled={!validateStatusChange(order.status, 'cancelled')}
            >
                Đã hủy
            </Menu.Item>
            <Menu.Item
                onClick={() => handleStatusChange('received')}
                disabled={!validateStatusChange(order.status, 'received')}
            >
                Đã nhận hàng
            </Menu.Item>
            <Menu.Item
                onClick={() => handleStatusChange('Returngoods')}
                disabled={!validateStatusChange(order.status, 'Returngoods')}
            >
                Trả hàng
            </Menu.Item>
            <Menu.Item
                onClick={() => handleStatusChange('Complaints')}
                disabled={!validateStatusChange(order.status, 'Complaints')}
            >
                Khiếu nại
            </Menu.Item>
            {/* <Menu.Item
                onClick={() => handleStatusChange('Refunded')}
                disabled={!validateStatusChange(order.status, 'Refunded')}
            >
                Hoàn tiền
            </Menu.Item> */}
            <Menu.Item
                onClick={() => handleStatusChange('Exchanged')}
                disabled={!validateStatusChange(order.status, 'Exchanged')}
            >
                Đổi trả hàng
            </Menu.Item>
        </Menu>
    );

    // Cột cho bảng sản phẩm
    const columns: TableProps<any>['columns'] = [
        {
            title: 'Ảnh',
            dataIndex: ['gallery', 'avatar'],
            render: (avatar: string) => <img src={avatar} alt="product" width="50" />,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a className="text-black">{text}</a>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Màu sắc',
            dataIndex: ['attribute', 'color'],
        },
        {
            title: 'Size',
            dataIndex: ['attribute', 'size'],
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${price.toLocaleString()} VND`,
        },
    ];
    
    return (
        <div className="overflow-y-auto h-[600px]">
            <div className="flex justify-between items-center mb-4">
                <h6 className='font-semibold text-[20px]'>CHI TIẾT ĐƠN HÀNG:</h6>
                <Link to={`/admin/orders`}>
                    <Button type="primary">DANH SÁCH ĐƠN HÀNG</Button>
                </Link>
            </div>
            <hr />
            <div className="grid grid-cols-2 gap-4 mt-4">

                {/* Thông tin đơn hàng */}
                <div className="rounded bg-yellow-100 p-4 shadow-md border border-black ">
                    <h3 className="font-bold text-lg mb-2">Thông tin đơn hàng</h3>
                    <hr />
                    <div className="pt-3">
                        <div className="grid grid-cols-2">
                            <p>Mã đơn hàng:</p>
                            <p>{order.orderNumber}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Ngày tạo:</p>
                            <p>{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="grid grid-cols-2 items-center">
                            <p>Trạng thái đơn hàng:</p>
                            <div className="flex items-center">
                                <p className="mr-2">{getStatusText(order.status)}</p>
                                <Dropdown overlay={statusMenu} trigger={['click']}>
                                    <EditOutlined className="text-blue-500 cursor-pointer" />
                                </Dropdown>
                            </div>
                        </div>
                        {order.status === "cancelled" && (
                            <div className="grid grid-cols-2">
                            <p>Lý do huỷ hàng:</p>
                            <p>{order?.cancelReason}</p>
                        </div>
                        )}
                        <div className="grid grid-cols-2">
                            <p>Tổng tiền hàng:</p>
                            <p>{formatPrice(totalCartOrder?totalCartOrder:0)} VND</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Phí vận chuyển:</p>
                            <p>{ship?.value?.price?.toLocaleString()} VND</p>
                        </div>
                        {voucher && (
                            <div className="grid grid-cols-2">
                                <p>Giảm giá:</p>
                                <p>-{voucher?.discountValue?.toLocaleString()} VND</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2">
                            <p>Tổng giá trị đơn hàng:</p>
                            <p>{formatPrice(order?.totalPrice?order.totalPrice:0)} VND</p>
                        </div>
                    </div>
                </div>

                {/* Thông tin người mua */}
                <div className="rounded  p-4 shadow-md border border-black ">
                    <h3 className="font-bold text-lg mb-2">Thông tin người mua</h3>
                    <hr />
                    <div className="pt-3">
                        <div className="grid grid-cols-2">
                            <p>Tên:</p>
                            <p>{customer?.fullname}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Địa chỉ:</p>
                            <p>{customer?.address}, {customer?.ward}, {customer?.district}, {customer?.city}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Số điện thoại:</p>
                            <p>{customer?.phone}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Email:</p>
                            <p>{order?.userId?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Thông tin thanh toán */}
                <div className="rounded p-4 shadow-md border border-black ">
                    <h3 className="font-bold text-lg mb-2">Thanh toán</h3>
                    <hr />
                    <div className="pt-3">
                        <div className="grid grid-cols-2">
                            <p>Phương thức thanh toán:</p>
                            <p>{order?.paymentMethod === 'credit' ? 'Thẻ tín dụng' :
                                order?.paymentMethod === 'atm' ? 'Thẻ ATM' :
                                    order?.paymentMethod === 'vnPay' ? 'VN Pay' :
                                        'Tiền mặt'}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Trạng thái thanh toán:</p>
                            <p>
                                {order?.paymentMethod === "vnPay" ? (order?.paymentStatus === "Đã thanh toán" ? "Đã thanh toán" : "Chưa thanh toán") : (order.status === "pending" || order.status === "unpaid" || order.status === "confirmed" || order.status === "shipped" || order.status === "cancelled" ? "Chưa thanh toán" : "Đã thanh toán")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Thông tin giao hàng */}
                <div className="rounded p-4 shadow-md border border-black ">
                    <h3 className="font-bold text-lg mb-2">Giao hàng</h3>
                    <hr />
                    <div className="mt-3">
                        <div className="grid grid-cols-2">
                            <p>Hình thức giao hàng:</p>
                            <p>
                                {ship?.nameBrand}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div className="grid grid-cols-2">
                            <p>Trạng thái giao hàng:</p>
                            <p>
                                {(order?.status === 'Complaints' ||
                                    order?.status === 'received' ||
                                    order?.status === 'delivered')
                                    ? 'Đã giao'
                                    : 'Chưa giao'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Chi tiết sản phẩm */}
            <div className="rounded p-4 shadow-md">
                <h3 className="font-bold text-lg mb-2">Chi tiết sản phẩm</h3>
                <hr />
                <Table columns={columns} dataSource={items} rowKey="_id" />
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
}

export default OrderDetails;