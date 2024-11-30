import { CarOutlined, DeleteFilled, DeleteOutlined, EditOutlined, MoreOutlined, SearchOutlined, TagOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, Popconfirm, Table, TableColumnsType } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';
import useVoucherMutation from '../../../../common/hooks/voucher/useVoucherMutation';
import useVoucherQuery from '../../../../common/hooks/voucher/useVoucherQuery';
import { IVoucher } from '../../../../common/interfaces/voucher';
import { Link } from 'react-router-dom';

type Props = {};

const VoucherList = (props: Props) => {
    const [Vouchers, SetVouchers] = useState<IVoucher[]>([]);
    const [filterType, setFilterType] = useState<'discount' | 'shipping'>('discount'); // Mặc định lọc voucher giảm giá
    const [filterStatus, setFilterStatus] = useState<'active' | 'inactive'>('active'); // Mặc định lọc voucher đang hoạt động
    const [searchTerm, setSearchTerm] = useState(''); // Dùng để tìm kiếm mã code hoặc tên voucher
    const query = useVoucherQuery({});
    const mutation = useVoucherMutation();

    useEffect(() => {
        if (query?.data) {
            const newVouchers = query?.data?.map((voucher: IVoucher, index: number) => ({
                ...voucher,
                key: index + 1, // Đảm bảo `key` là duy nhất
            }));
            SetVouchers(newVouchers);
        }
    }, [query?.data]);

    // Lọc danh sách voucher theo trạng thái và loại voucher
    const filteredVouchers = Vouchers.filter(voucher =>
        voucher.category === filterType &&
        voucher.status === (filterStatus === 'active') &&
        (voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            voucher.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Xử lý xóa tất cả các voucher được chọn
    const handleDeleteSelected = () => {
        selectedRowKeys.forEach((key) => {
            const voucher = Vouchers.find(voucher => voucher.key === key);
            if (voucher) {
                mutation.mutate({ action: "delete", voucher });
            }
        });
        // Sau khi xóa, bỏ chọn tất cả các hàng
        setSelectedRowKeys([]);
    };

    // Columns hiển thị trong bảng
    const columns: TableColumnsType<IVoucher> = [
        {
            title: 'Mã code',
            dataIndex: 'code',
        },
        {
            title: 'Tên voucher',
            dataIndex: 'name',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            render: (createdAt: string) => {
                const date = new Date(createdAt);
                return date.toLocaleDateString('vi-VN');
            },
            sorter: (a: IVoucher, b: IVoucher) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
            defaultSortOrder: 'descend', // Sắp xếp theo thứ tự giảm dần (từ mới đến cũ)
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            render: (createdAt: string) => {
                const date = new Date(createdAt);
                return date.toLocaleDateString('vi-VN');
            },
        },
        {
            title: 'Loại giảm giá',
            dataIndex: 'type',
        },
        {
            title: 'Giá trị giảm',
            dataIndex: 'value',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Giá trị đơn tối thiểu',
            dataIndex: 'minOrderValue',
        },
        {
            title: 'Lượt sử dụng',
            dataIndex: 'usedQuantity',
        },
        {
            title: 'Thao tác',
            render: (_, record) => {
                const actionMenu = (
                    <Menu>
                        <Menu.Item key="1" icon={<EditOutlined />}>
                            <Link to={`/admin/vouchers/${record._id}`}>Edit</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DeleteOutlined />}>
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xoá voucher này?"
                                onConfirm={() => mutation.mutate({ action: "delete", voucher: record })}
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                Delete
                            </Popconfirm>
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <Dropdown overlay={actionMenu} trigger={['click']}>
                        <Button icon={<MoreOutlined />} shape="circle" />
                    </Dropdown>
                );
            },
        },
    ];

    // Menu cho lọc voucher hoạt động hoặc không hoạt động
    const filterMenu = (
        <Menu>
            <Menu.Item key="1" onClick={() => setFilterStatus('active')}>
                Voucher hoạt động
            </Menu.Item>
            <Menu.Item key="2" onClick={() => setFilterStatus('inactive')}>
                Voucher không hoạt động
            </Menu.Item>
        </Menu>
    );

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<IVoucher> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className='font-semibold text-[20px]'>DANH SÁCH VOUCHER</h1>
                <Popconfirm
                    title="Bạn có chắc chắn muốn xoá tất cả các voucher đã chọn?"
                    onConfirm={handleDeleteSelected}
                    okText="Xóa"
                    cancelText="Hủy"
                    disabled={selectedRowKeys.length === 0}  // Vô hiệu hóa nếu không có dòng nào được chọn
                >
                    <Button
                        type='primary'
                        disabled={selectedRowKeys.length === 0}  // Vô hiệu hóa nút nếu không có dòng nào được chọn
                    >
                        <DeleteFilled /> XOÁ VOUCHER
                    </Button>
                </Popconfirm>
            </div>
            <div className="flex justify-between items-center my-3">
                <div className="">
                <Input
                    placeholder='Tìm kiếm voucher'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 300 }}
                    prefix={<SearchOutlined />}
                />
                <Button style={{ marginLeft: 10 }} onClick={() => setSearchTerm('')}>Đặt lại</Button>
                </div>
                <Link to={`/admin/vouchers/add`}><Button type="primary" style={{ marginLeft: 'auto' }}>Thêm voucher</Button></Link>
            </div>
            <div className="flex p-2 border rounded-lg bg-slate-100 mb-3">
                <div className="w-[50%] text-center">
                    <Dropdown overlay={filterMenu} trigger={['hover']}>
                        <Button style={{ width: "100%" }} icon={<TagOutlined />} onClick={() => setFilterType('discount')}>
                            Voucher giảm giá
                        </Button>
                    </Dropdown>
                </div>
                <div className="w-[50%] text-center">
                    <Dropdown overlay={filterMenu} trigger={['hover']}>
                        <Button style={{ width: "100%" }} icon={<CarOutlined />} onClick={() => setFilterType('shipping')}>
                            Voucher vận chuyển
                        </Button>
                    </Dropdown>
                </div>
            </div>
            <Table<IVoucher> rowSelection={rowSelection} columns={columns} dataSource={filteredVouchers} />
        </>
    );
};

export default VoucherList;