import { Button, Card, Descriptions, Input, Select, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import useComplaintQuery from '../../../../common/hooks/complaint/useComplaintQuery';
import useComplaintMutation from '../../../../common/hooks/complaint/useComplaintMutation';
import { useState, useEffect } from 'react';
import useOrderMutation from '../../../../common/hooks/orders/useOrderMutation';

type Props = {};

const ComplaintEdit = (props: Props) => {
  const { id } = useParams();
  const query = useComplaintQuery(id);
  const mutation = useComplaintMutation();
  
  // State để lưu thông tin chỉnh sửa
  const [status, setStatus] = useState<'new' | 'in_progress' | 'resolved' | ''>('');
  const [response, setResponse] = useState<string>('');
  const mutations = useOrderMutation();
  // console.log(query)

  // Cập nhật giá trị status và response khi query thay đổi
  useEffect(() => {
    if (query) {
      setStatus(query.status || '');  // Cập nhật trạng thái
      setResponse(query.response || '');  // Cập nhật phản hồi
    }
  }, [query]);

  const handleUpdate = () => {
    if (status === query?.status && response === query?.response) {
      message.info('Không có thay đổi để cập nhật.');
      return;
    }
    mutation.mutate({
      action: 'update',
      complaintData: {
        complaintId: id!,
        status,
        response,
      },
    });
    if(status === "resolved"){
       // Cập nhật trạng thái đơn hàng thành 'Returngoods'
    mutations.mutate({
      action: "updateStatus",
      orderId: query.orderId._id,
      status: "Returngoods",
    });
    }
  };

  return (
    <div className='overflow-y-auto h-[600px]'>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[20px]">CHI TIẾT KHIẾU NẠI</h1>
        <Link to={`/admin/complaint`}>
          <Button type="primary">DANH SÁCH KHIẾU NẠI</Button>
        </Link>
      </div>
      {query && (
        <Card style={{ maxWidth: 600, margin: 'auto' }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Mã đơn hàng">
              {query?.orderId?.orderNumber || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá đơn hàng">
              {query?.orderId?.totalPrice?.toLocaleString()} VND
            </Descriptions.Item>
            <Descriptions.Item label="Email khách hàng">
              {query?.userId?.email || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Lý do khiếu nại">
              {query?.complaintReason}
            </Descriptions.Item>
            <Descriptions.Item label="Cập nhật trạng thái">
              <Select
                value={status}
                onChange={setStatus}
                style={{ width: 200 }}
                placeholder="Chọn trạng thái"
              >
                <Select.Option value="new">Mới</Select.Option>
                <Select.Option value="in_progress">Đang xử lý</Select.Option>
                <Select.Option value="resolved">Đã giải quyết</Select.Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {new Date(query?.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {new Date(query?.updatedAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Phản hồi từ admin">
              <Input.TextArea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Nhập phản hồi"
                rows={4}
              />
            </Descriptions.Item>
          </Descriptions>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleUpdate} type="primary">
              Cập nhật
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ComplaintEdit;
