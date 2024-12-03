import { Button, Card, Descriptions, Input, Select, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import useContactQuery from '../../../../common/hooks/contact/useContactQuery';
import useContactMutation from '../../../../common/hooks/contact/useContactMutation';
import { useState, useEffect } from 'react';

type Props = {};

const ContactEdit = (props: Props) => {
  const { id } = useParams();
  const query = useContactQuery(id);
  const mutation = useContactMutation();
  
  // State để lưu thông tin chỉnh sửa
  const [status, setStatus] = useState<'new' | 'in_progress' | 'resolved' | ''>(''); 
  const [response, setResponse] = useState<string>('');

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

    // Cập nhật trạng thái liên hệ
    mutation.mutate({
      action: 'update',
      contactData: {
        contactId: id!,
        status,
        response,
      },
    });

    if (status === 'resolved') {
      message.success('Liên hệ đã được giải quyết!');
    }
  };

  return (
    <div className='overflow-y-auto h-[600px]'>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[20px]">CHI TIẾT LIÊN HỆ</h1>
        <Link to={`/admin/contacts`}>
          <Button type="primary">DANH SÁCH LIÊN HỆ</Button>
        </Link>
      </div>
      {query && (
        <Card style={{ maxWidth: 600, margin: 'auto' }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Email khách hàng">
              {query?.userId?.email || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Tiêu đề">
              {query?.title}
            </Descriptions.Item>
            <Descriptions.Item label="Lý do liên hệ">
              {query?.message}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái liên hệ">
              <Select
                value={status}
                onChange={setStatus}
                style={{ width: 200 }}
                placeholder="Chọn trạng thái"
              >
                <Select.Option value="new" disabled={status !== "new"}>Mới</Select.Option>
                <Select.Option value="in_progress" disabled={status === "in_progress"}>Đang xử lý</Select.Option>
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

export default ContactEdit;