import { Button, Dropdown, Menu } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import useOrderMutation from "../../../../common/hooks/orders/useOrderMutation";
import { useOrderQuery } from "../../../../common/hooks/orders/useOrderQuery";

type Props = {}

const OrderDetails = (props: Props) => {
    const { id } = useParams();
    const query = useOrderQuery(id);
    const mutation = useOrderMutation();
    
    if (query.isLoading) return <div>Đang tải...</div>;
    if (query.isError) return <div>Lỗi khi tải chi tiết đơn hàng</div>;

    const order = query.data;
    const customer = order.customerInfor;

    // Map trạng thái đơn hàng sang tiếng Việt
    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Đang chờ xử lý';
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

    const handleStatusChange = (status: string) => {
        mutation.mutate({
            action: "updateStatus",
            orderId: order._id,
            status,
        });
    };

    const statusMenu = (
        <Menu>
            <Menu.Item onClick={() => handleStatusChange('pending')}>Đang chờ xử lý</Menu.Item>
            <Menu.Item onClick={() => handleStatusChange('unpaid')}>Chưa thanh toán</Menu.Item>
            <Menu.Item onClick={() => handleStatusChange('confirmed')}>Đã xác nhận</Menu.Item>
            <Menu.Item onClick={() => handleStatusChange('shipped')}>Đã giao</Menu.Item>
            <Menu.Item onClick={() => handleStatusChange('delivered')}>Đã giao thành công</Menu.Item>
            <Menu.Item onClick={() => handleStatusChange('cancelled')}>Đã hủy</Menu.Item>
            <Menu.Item onClick={() => handleStatusChange('received')}>Đã nhận hàng</Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h6 className='font-semibold text-[20px]'>CHI TIẾT ĐƠN HÀNG #{order._id}</h6>
                <Link to={`/admin/orders`}>
                    <Button type="primary">DANH SÁCH ĐƠN HÀNG</Button>
                </Link>
            </div>
            <hr />
            <div className="grid grid-cols-2 gap-4 mt-4">
                
                {/* Thông tin đơn hàng */}
                <div className="rounded bg-yellow-100 p-4 shadow-md">
                    <h3 className="font-bold text-lg mb-2">Thông tin đơn hàng</h3>
                    <hr />
                    <div className="pt-3">
                        <div className="grid grid-cols-2">
                            <p>Mã đơn hàng:</p>
                            <p>{order._id}</p>
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
                        <div className="grid grid-cols-2">
                            <p>Tổng giá:</p>
                            <p>{order.totalPrice.toLocaleString()} VND</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Phương thức thanh toán:</p>
                            <p>
                                {order.paymentMethod === 'cash' ? 'Tiền mặt' : 
                                order.paymentMethod === 'momo' ? 'Momo' : 
                                order.paymentMethod === 'atm' ? 'ATM' : 
                                'Thẻ tín dụng'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Thông tin người mua */}
                <div className="rounded bg-green-100 p-4 shadow-md">
                    <h3 className="font-bold text-lg mb-2">Thông tin người mua</h3>
                    <hr />
                    <div className="pt-3">
                        <div className="grid grid-cols-2">
                            <p>Tên:</p>
                            <p>{customer.fullname}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Địa chỉ:</p>
                            <p>{customer.address}, {customer.ward}, {customer.district}, {customer.city}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Số điện thoại:</p>
                            <p>{customer.phone}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Email:</p>
                            <p>{order.userId.email}</p>
                        </div>
                    </div>
                </div>

                {/* Thông tin thanh toán */}
                <div className="rounded bg-red-100 p-4 shadow-md">
                    <h3 className="font-bold text-lg mb-2">Thanh toán</h3>
                    <hr />
                    <div className="pt-3">
                        <div className="grid grid-cols-2">
                            <p>Phương thức thanh toán:</p>
                            <p>{order.paymentMethod === 'cash' ? 'Thanh toán khi nhận hàng' : order.paymentMethod}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Trạng thái thanh toán:</p>
                            <p>{order.status === 'unpaid' ? 'Chưa thanh toán' : 'Đã thanh toán'}</p>
                        </div>
                    </div>
                </div>

                {/* Thông tin giao hàng */}
                <div className="rounded bg-blue-100 p-4 shadow-md">
                    <h3 className="font-bold text-lg mb-2">Giao hàng</h3>
                    <hr />
                    <div className="pt-3">
                        <div className="grid grid-cols-2">
                            <p>Trạng thái giao hàng:</p>
                            <p>{order.status === 'shipped' ? 'Đã giao' : 'Chưa giao'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;
