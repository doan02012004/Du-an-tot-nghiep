import { Button, Card, Descriptions, Input, Select, Spin, message } from 'antd';
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
  const mutations = useOrderMutation();
  // State để lưu thông tin chỉnh sửa
  const [status, setStatus] = useState<'new' | 'in_progress' | 'resolved' | 'cancelled' | ''>(''); 
  const [statusOrder, setStatusOrder] = useState<'Complaints' | 'received' | 'Returngoods' | 'Exchanged' | ''>(''); 
  const [response, setResponse] = useState<string>('');
  const [note, setnote] = useState<string>('');
  console.log(query)

  // Cập nhật giá trị status và response khi query thay đổi
  useEffect(() => {
    if (query) {
      setStatus(query.status || '');  // Cập nhật trạng thái
      setResponse(query.response || '');  // Cập nhật phản hồi
      setnote(query?.note || '')  // cập nhật ghi chú
      setStatusOrder(query?.orderId?.status || '')
    }
  }, [query]);

  const handleUpdate = () => {
    if (status === query?.status && response === query?.response && note === query?.note && statusOrder === query?.orderId?.status) {
      message.info('Không có thay đổi để cập nhật.');
      return;
    }
    console.log(note)
    // Cập nhật trạng thái khiếu nại
    mutation.mutate({
      action: 'update',
      complaintData: {
        complaintId: id!,
        status,
        response,
        note,
      },
    });

    if (status === 'cancelled') {
      // Nếu trạng thái khiếu nại là huỷ, cập nhật lại trạng thái đơn hàng về "Đã nhận hàng"
      mutations.mutate({
        action: 'updateStatus',
        orderId: query.orderId._id,
        status: 'received', // hoặc trạng thái khác mà bạn muốn
      });
    }

    if (status === 'resolved') {
      mutations.mutate({
            action: 'updateStatus',
            orderId: query?.orderId?._id,
            status: statusOrder,
          });
      // // Kiểm tra phản hồi từ admin để cập nhật trạng thái đơn hàng
      // if (response.includes('Trả hàng')) {
      //   mutations.mutate({
      //     action: 'updateStatus',
      //     orderId: query.orderId._id,
      //     status: 'Returngoods',
      //   });
      // } else if (response.includes('Hoàn tiền')) {
      //   mutations.mutate({
      //     action: 'updateStatus',
      //     orderId: query.orderId._id,
      //     status: 'Returngoods',
      //   });
      // } else if (response.includes('Đổi trả hàng')) {
      //   mutations.mutate({
      //     action: 'updateStatus',
      //     orderId: query.orderId._id,
      //     status: 'Exchanged',
      //   });
      // }else if (response.includes('Đơn hàng đã hoàn tất')) {
      //   mutations.mutate({
      //     action: 'updateStatus',
      //     orderId: query.orderId._id,
      //     status: 'received',
      //   });
      // }
      //  else {
      //   // Nếu không có yêu cầu thay đổi trạng thái đơn hàng
      //   message.success('Khiếu nại đã được giải quyết!');
      // }
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
            <Descriptions.Item label="Phone khách hàng">
              {query?.userId?.phone || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Lý do khiếu nại">
              {query?.complaintReason}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái đơn khiếu nại">
              <Select
                value={status}
                onChange={setStatus}
                style={{ width: 200 }}
                placeholder="Chọn trạng thái"
              >
                <Select.Option value="new" disabled={status !== "new"}>Mới</Select.Option>
                <Select.Option value="in_progress" disabled={status !== "new"}>Đang xử lý</Select.Option>
                <Select.Option value="resolved" disabled={status !== "in_progress"}>Đã giải quyết</Select.Option>
                <Select.Option value="cancelled" disabled={status !== "resolved"}>Huỷ khiếu nại</Select.Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú">
            <Input.TextArea
                value={note}
                onChange={(e) => setnote(e.target.value)}
                placeholder="Nhập phản hồi"
                rows={1}
              />
            </Descriptions.Item>
            {status === "resolved" && (
              <Descriptions.Item label="Trạng thái đơn hàng">
              <Select
                value={statusOrder}
                onChange={setStatusOrder}
                style={{ width: 200 }}
                placeholder="Chọn trạng thái"
              >
                <Select.Option value="Complaints" disabled={statusOrder !== "Complaints"}>Khiếu nại</Select.Option>
                <Select.Option value="received" disabled={statusOrder !== "Complaints"}>Đơn hoàn thành</Select.Option>
                <Select.Option value="Returngoods" disabled={statusOrder !== "Complaints"}>Trả hàng</Select.Option>
                <Select.Option value="Exchanged" disabled={statusOrder !== "Complaints"}>Đổi trả hàng</Select.Option>
              </Select>
            </Descriptions.Item>
            )}
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
            <Button onClick={handleUpdate} type="primary" disabled={mutation.isPending} icon={mutation.isPending && <Spin size="small" />}>
              Cập nhật
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ComplaintEdit;
