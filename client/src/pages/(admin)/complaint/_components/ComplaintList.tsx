import { useEffect, useState } from "react";
import useComplaintQuery from "../../../../common/hooks/complaint/useComplaintQuery";
import { IComplaint } from "../../../../common/interfaces/complaint";
import { Button, Input, Select, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";

type Props = {}

const ComplaintList = (props: Props) => {
  const [complaint, setcomplaint] = useState<IComplaint[]>([]);
  const [searchOrderId, setSearchOrderId] = useState<string>("");  // Mã đơn hàng
  const [searchEmail, setSearchEmail] = useState<string>("");      // Email khách hàng
  const [statusFilter, setStatusFilter] = useState<'new' | 'in_progress' | 'resolved' |'cancelled' | ''>(''); // Lọc theo trạng thái

  const query = useComplaintQuery();
  useEffect(() => {
    if (query) {
      const newComplaint = query.map((complaint: IComplaint, index: number) => ({
        ...complaint,
        key: index + 1, // Đảm bảo `key` là duy nhất
      }));
      setcomplaint(newComplaint);
    }
  }, [query]);
  console.log(complaint)

  // Hàm lọc các đơn khiếu nại
  const handleSearch = () => {
    let filteredComplaints = query || [];

    if (searchOrderId) {
      filteredComplaints = filteredComplaints.filter(item => item?.orderId?.orderNumber.includes(searchOrderId));
    }

    if (searchEmail) {
      filteredComplaints = filteredComplaints.filter(item => item.userId?.email.includes(searchEmail));
    }

    if (statusFilter) {
      filteredComplaints = filteredComplaints.filter(item => item.status === statusFilter);
    }

    setcomplaint(filteredComplaints);
  };


  // Định nghĩa các cột của bảng
  const columns: TableColumnsType<IComplaint> = [
    {
      title: "#",
      dataIndex: "key",
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      render: (orderId: any) => orderId?.orderNumber || orderId, 
    },
    {
      title: "User ID",
      dataIndex: "userId",
      render: (userId: any) => userId?.email || userId,
    },
    {
      title: "Complaint Reason",
      dataIndex: "complaintReason",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: 'new' | 'in_progress' | 'resolved' | 'cancelled') => {
        switch (status) {
          case 'new': return <span style={{ color: 'blue' }}>Mới</span>;
          case 'in_progress': return <span style={{ color: 'orange' }}>Đang xử lý</span>;
          case 'resolved': return <span style={{ color: 'green' }}>Đã giải quyết</span>;
          case 'cancelled': return <span style={{ color: 'red' }}>Huỷ khiếu nại</span>;
          default: return status;
        }
      },    
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: Date) => new Date(createdAt).toLocaleString(), // Định dạng ngày tháng
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt: Date) => new Date(updatedAt).toLocaleString(), // Định dạng ngày tháng
    },
    {
        title: "Thao tác",  // Thêm cột Thao tác
        dataIndex: "actions", // Cột này không cần dữ liệu, chỉ là cột thao tác
        render: (_, record) => (
          <Link to={`admin/complaint/${record._id}`}><Button >Phản hồi</Button></Link>
        ), 
      }
  ];
  return (
    <div className="overflow-y-auto h-[600px]">
        <div className="flex justify-between items-center mb-4">
                <h6 className='font-semibold text-[20px]'>DANH SÁCH KHIẾU NẠI:</h6>
        </div>
        <div style={{ marginBottom: 16 }}>
        {/* Tìm kiếm mã đơn hàng */}
        <Input
          placeholder="Tìm kiếm theo mã đơn hàng"
          value={searchOrderId}
          onChange={e => setSearchOrderId(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />

        {/* Tìm kiếm theo email khách hàng */}
        <Input
          placeholder="Tìm kiếm theo email khách hàng"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />

        {/* Lọc theo trạng thái */}
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 200, marginRight: 16 }}
          placeholder="Lọc theo trạng thái"
        >
          <Select.Option value="">Tất cả</Select.Option>
          <Select.Option value="new">Mới</Select.Option>
          <Select.Option value="in_progress">Đang xử lý</Select.Option>
          <Select.Option value="resolved">Đã giải quyết</Select.Option>
          <Select.Option value="cancelled">Huỷ khiếu nại</Select.Option>
        </Select>

        {/* Nút tìm kiếm */}
        <Button onClick={handleSearch} type="primary">Tìm kiếm</Button>
      </div>
        <Table
        columns={columns}
        dataSource={complaint}
      />
    </div>
  )
}

export default ComplaintList