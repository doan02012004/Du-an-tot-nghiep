import React, { useState, useEffect } from 'react';
import { Button, Space, Table, message, Modal } from 'antd';
import { getHistoryUpdateUser, getHistoryUpdateUserById, deleteHistoryUpdateUser } from '../../../../services/auth';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import FormHistoryUpdate from './FormHistoryUpdate';

interface DataType {
    key: string;
    time: string;
    email: string;
    updatedDetails: Record<string, any>; // Chi tiết các trường đã thay đổi dưới dạng object
}

const HistoryUpdateUser: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getHistoryUpdateUser();
            setData(result.map((item: any) => {
                // Lọc các thay đổi thực sự trong 'changes'
                const updatedDetails = Object.keys(item.changes).reduce((acc: any, key: string) => {
                    if (item.changes[key] !== item.originalUser[key]) {
                        acc[key] = item.changes[key];
                    }
                    return acc;
                }, {});

                return {
                    key: item._id,
                    time: new Date(item.updateTime).toLocaleString(),
                    email: item.originalUser.email,
                    updatedDetails: updatedDetails, // Lưu các thay đổi thực sự
                };
            }));
        };
        fetchData();
    }, []);

    const handleViewDetails = async (id: string) => {
        const record = await getHistoryUpdateUserById(id);
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa lịch sử cập nhật này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                await deleteHistoryUpdateUser(id);
                setData(data.filter(item => item.key !== id));
                message.success('Xóa lịch sử cập nhật thành công');
            },
            onCancel() {
                message.info('Hủy xóa lịch sử cập nhật');
            },
        });
    };

    const columns = [
        {
            title: 'Thời gian sửa',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Email người dùng',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: DataType) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleViewDetails(record.key)}><EyeOutlined /></Button>
                    <Button type="primary" danger onClick={() => handleDelete(record.key)}><DeleteOutlined /></Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table<DataType> columns={columns} dataSource={data} />

            {isModalVisible && selectedRecord && (
                <FormHistoryUpdate
                    onClose={() => setIsModalVisible(false)}
                    record={selectedRecord}
                />
            )}
        </>
    );
};

export default HistoryUpdateUser;
