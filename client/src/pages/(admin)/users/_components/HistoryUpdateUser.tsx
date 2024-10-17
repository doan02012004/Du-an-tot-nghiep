import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { getHistoryUpdateUser } from '../../../../services/auth';

interface DataType {
    key: React.Key;
    name: string;
    time: string;
    updatedDetails: Record<string, any>; // Chi tiết các trường đã thay đổi dưới dạng object
}

const columns: TableColumnsType<DataType> = [
    { title: 'Tài khoản', dataIndex: 'name', key: 'name' },
    { title: 'Thời gian', dataIndex: 'time', key: 'time' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];

const HistoryUpdateUser: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const historyData = await getHistoryUpdateUser();
                
                const formattedData = historyData.map((item) => ({
                    key: item._id,
                    name: `${item.originalUser?.firstname || ''} ${item.originalUser?.lastname || ''}`,
                    time: new Date(item.updateTime).toLocaleString(),
                    updatedDetails: item.changes,
                }));
                setData(formattedData);
            } catch (error) {
                message.error('Không tải được danh sách cập nhật.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const renderUpdatedDetails = (updatedDetails: Record<string, any>) => {
        return (
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <ul>
                    {Object.entries(updatedDetails).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value.toString()}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <>
            <h1 className='text-2xl text-red'>Danh sách tài khoản được cập nhật</h1>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Table<DataType>
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                    expandable={{
                        expandedRowRender: (record) => (
                            renderUpdatedDetails(record.updatedDetails)
                        ),
                        rowExpandable: (record) => Object.keys(record.updatedDetails).length > 0,
                    }}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </>
    );
};

export default HistoryUpdateUser;
