import { EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import { Link, useParams } from "react-router-dom";
import useOrderMutation from "../../../../common/hooks/orders/useOrderMutation";
import { useOrderQuery } from "../../../../common/hooks/orders/useOrderQuery";

type Props = {}

const OrderDetails = (props: Props) => {
    const { id } = useParams();
    const query = useOrderQuery({ orderId: id });
    const mutation = useOrderMutation();
    console.log(query.data);

    if (query.isLoading) return <div>Đang tải...</div>;
    if (query.isError) return <div>Lỗi khi tải chi tiết đơn hàng</div>;

    const order = query.data;
    const customer = order.customerInfor;
    const items = order.items;
    const ship = order.ship;
    const voucher = order.voucher
    const Goodsmoney = order.totalPrice - ship.value?.price
    const Totalamount = voucher ? order.totalPrice - voucher?.discountValue : order.totalPrice

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
            default:
                return 'Không xác định';
        }
    };

    // Hàm kiểm tra tính hợp lệ của việc chuyển đổi trạng thái
    const validateStatusChange = (currentStatus: string, newStatus: string) => {
        const invalidTransitions: Record<string, string[]> = {
            pending: ["pending", "unpaid", "shipped", "delivered", "received", "Returngoods", "Complaints"],
            unpaid: ["pending", "unpaid", "confirmed", "shipped", "delivered", "received", "Returngoods", "Complaints"],
            confirmed: ["pending", "unpaid", "confirmed", "delivered", "cancelled", "received", "Returngoods", "Complaints"],
            shipped: ["pending", "unpaid", "confirmed", "shipped", "cancelled", "received", "Returngoods", "Complaints"],
            delivered: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "Returngoods"],
            cancelled: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received", "Returngoods", "Complaints"],
            received: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received", "Returngoods"],
            Complaints: ["pending", "unpaid", "confirmed", "shipped", "delivered", "cancelled", "received", "Returngoods", "Complaints"]
        };
        return !(invalidTransitions[currentStatus]?.includes(newStatus));
    };



    const handleStatusChange = (newStatus: string) => {
        const currentStatus = order.status;

        // Kiểm tra tính hợp lệ của việc chuyển trạng thái
        if (!validateStatusChange(currentStatus, newStatus)) {
            // Hiển thị thông báo lỗi (có thể dùng notification hoặc alert)
            alert(`Không thể chuyển từ trạng thái "${getStatusText(currentStatus)}" sang "${getStatusText(newStatus)}"`);
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
                onClick={() => handleStatusChange('cancelled')}
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
                        <div className="grid grid-cols-2">
                            <p>Tổng tiền hàng:</p>
                            <p>{Goodsmoney.toLocaleString()} VND</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Phí vận chuyển:</p>
                            <p>{ship.value?.price.toLocaleString()} VND</p>
                        </div>
                        {voucher && (
                            <div className="grid grid-cols-2">
                                <p>Giảm giá:</p>
                                <p>{voucher?.discountValue.toLocaleString()} VND</p>
                            </div>
                        )}
                        <div className="grid grid-cols-2">
                            <p>Tổng giá trị đơn hàng:</p>
                            <p>{Totalamount.toLocaleString()} VND</p>
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
                <div className="rounded p-4 shadow-md border border-black ">
                    <h3 className="font-bold text-lg mb-2">Thanh toán</h3>
                    <hr />
                    <div className="pt-3">
                        <div className="grid grid-cols-2">
                            <p>Phương thức thanh toán:</p>
                            <p>{order.paymentMethod === 'credit' ? 'Thẻ tín dụng' :
                                order.paymentMethod === 'atm' ? 'Thẻ ATM' :
                                    order.paymentMethod === 'vnPay' ? 'VN Pay' :
                                        'Tiền mặt'}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p>Trạng thái thanh toán:</p>
                            <p>
                                {order.paymentMethod === "vnPay" ? (order.paymentStatus === "Đã thanh toán" ? "Đã thanh toán" : "Chưa thanh toán") : (order.status === "pending" || order.status === "unpaid" || order.status === "confirmed" || order.status === "shipped" || order.status === "cancelled" ? "Chưa thanh toán" : "Đã thanh toán")}
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
                                {ship.nameBrand}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div className="grid grid-cols-2">
                            <p>Trạng thái giao hàng:</p>
                            <p>
                                {(order.status === 'Complaints' ||
                                    order.status === 'received' ||
                                    order.status === 'delivered')
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
        </div>
    );
}

export default OrderDetails;