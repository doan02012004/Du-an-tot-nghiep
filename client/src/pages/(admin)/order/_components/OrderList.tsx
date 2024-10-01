import { DeleteFilled, EyeOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select, Table, TableColumnsType, Modal, message } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';
import { useOrderQuery } from '../../../../common/hooks/orders/useOrderQuery';
import { IOrder } from '../../../../common/interfaces/orderInterfaces';
import useOrderMutation from '../../../../common/hooks/orders/useOrderMutation';
import { Link } from 'react-router-dom';
const { RangePicker } = DatePicker;
const { Option } = Select;

type Props = {}

const OrderList = (props: Props) => {
    const [Orders, SetOrders] = useState<IOrder[]>([]);
    const query = useOrderQuery();
    const mutation = useOrderMutation();

    // Trạng thái tìm kiếm
    const [searchParams, setSearchParams] = useState({
        orderId: '',
        customerName: '',
        status: '',
        dateRange: null,
    });

    // Tải dữ liệu từ query
    useEffect(() => {
        if (query.data) {
            const newOrders = query.data.map((order: IOrder, index: number) => ({
                ...order,
                key: index + 1, // Đảm bảo `key` là duy nhất
            }));
            SetOrders(newOrders);
        }
    }, [query.data]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<IOrder> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleAction = (key: React.Key) => {
        console.log(`Chi tiết đơn hàng ${key}`);
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return { label: 'Đang xử lý', color: 'orange' };
            case 'unpaid': return { label: 'Chưa thanh toán', color: 'red' };
            case 'confirmed': return { label: 'Đã xác nhận', color: 'blue' };
            case 'shipped': return { label: 'Đang giao', color: 'purple' };
            case 'delivered': return { label: 'Đã giao hàng', color: 'green' };
            case 'received': return { label: 'Đã nhận', color: 'green' };
            case 'cancelled': return { label: 'Đã hủy', color: 'red' };
            default: return { label: 'Không xác định', color: 'gray' };
        }
    };

    const handleSearch = () => {
        const filteredOrders = query.data.filter((order: IOrder) => {
            const isMatchId = order._id.includes(searchParams.orderId);
            const isMatchCustomer = order.customerInfor.fullname.toLowerCase().includes(searchParams.customerName.toLowerCase());
            const isMatchStatus = !searchParams.status || order.status === searchParams.status;
            const isMatchDate = !searchParams.dateRange || (
                new Date(order.createdAt) >= searchParams.dateRange[0].toDate() &&
                new Date(order.createdAt) <= searchParams.dateRange[1].toDate()
            );
            return isMatchId && isMatchCustomer && isMatchStatus && isMatchDate;
        });

        SetOrders(filteredOrders);
    };

    const handleReset = () => {
        setSearchParams({
            orderId: '',
            customerName: '',
            status: '',
            dateRange: null,
        });
        SetOrders(query.data);
    };

    const handleDelete = () => {
        if (selectedRowKeys.length === 0) {
            message.warning("Bạn chưa chọn đơn hàng nào để xoá.");
            return;
        }

        Modal.confirm({
            title: "Xác nhận xoá",
            content: "Bạn có chắc chắn muốn xoá các đơn hàng đã chọn không?",
            okText: "Xoá",
            cancelText: "Huỷ",
            onOk: () => {
                // Gọi API xóa các đơn hàng đã chọn
                selectedRowKeys.forEach((key) => {
                    const orderId = Orders.find(order => order.key === key)?._id;
                    if (orderId) {
                        mutation.mutate({ action: "deleteOrder", orderId });
                    }
                });

                // Sau khi xoá, cập nhật lại danh sách đơn hàng
                const remainingOrders = Orders.filter(order => !selectedRowKeys.includes(order.key));
                SetOrders(remainingOrders);
                setSelectedRowKeys([]);  // Reset lựa chọn sau khi xoá
            }
        });
    };

    const columns: TableColumnsType<IOrder> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            render: (createdAt: string) => {
                const date = new Date(createdAt);
                return date.toLocaleDateString('vi-VN');
            }
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerInfor',
            render: (customerInfor: { fullname: string }) => customerInfor.fullname,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => {
                const { label, color } = getStatusLabel(status);
                return <span style={{ color }}>{label}</span>;
            }
        },
        {
            title: 'Số lượng sản phẩm',
            dataIndex: 'totalOrder',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            render: (total: number) => `${total.toLocaleString()}₫`,
        },
        {
            title: 'Thao tác',
            render: (_, record) => (
                <Link to={`/admin/orders/details/${record._id}`}>
                    <Button 
                        type="link" 
                        icon={<EyeOutlined />} 
                    />
                </Link>
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className='font-semibold text-[20px]'>DANH SÁCH ĐƠN HÀNG</h1>
                <Button 
                    type='primary' 
                    onClick={handleDelete} 
                    disabled={selectedRowKeys.length === 0}  // Vô hiệu hóa nút nếu không có đơn hàng nào được chọn
                >
                    <DeleteFilled /> XOÁ ĐƠN HÀNG
                </Button>
            </div>
            <div className="flex justify-between items-center my-3">
                <Input 
                    placeholder='Mã đơn hàng' 
                    value={searchParams.orderId} 
                    onChange={(e) => setSearchParams({ ...searchParams, orderId: e.target.value })} 
                    style={{ width: 200, marginRight: 10 }}
                />
                <Input 
                    placeholder='Tên khách hàng' 
                    value={searchParams.customerName} 
                    onChange={(e) => setSearchParams({ ...searchParams, customerName: e.target.value })} 
                    style={{ width: 200, marginRight: 10 }}
                />
                <Select 
                    placeholder="Trạng thái" 
                    value={searchParams.status} 
                    onChange={(value) => setSearchParams({ ...searchParams, status: value })} 
                    style={{ width: 200, marginRight: 10 }}
                >
                    <Option value="">Tất cả</Option>
                    <Option value="pending">Đang xử lý</Option>
                    <Option value="unpaid">Chưa thanh toán</Option>
                    <Option value="confirmed">Đã xác nhận</Option>
                    <Option value="shipped">Đang giao</Option>
                    <Option value="delivered">Đã giao hàng</Option>
                    <Option value="received">Đã nhận</Option>
                    <Option value="cancelled">Đã hủy</Option>
                </Select>
                <RangePicker 
                    onChange={(dates) => setSearchParams({ ...searchParams, dateRange: dates })} 
                    style={{ marginRight: 10 }} 
                />
                <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
                <Button onClick={handleReset} style={{ marginLeft: 10 }}>Đặt lại</Button>
            </div>
            <Table<IOrder> rowSelection={rowSelection} columns={columns} dataSource={Orders} />
        </>
    );
}

export default OrderList;