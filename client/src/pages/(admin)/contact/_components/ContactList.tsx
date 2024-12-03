import { useEffect, useState } from "react";
import useContactQuery from "../../../../common/hooks/contact/useContactQuery";
import { IContact } from "../../../../common/interfaces/contact";
import { Button, Input, Popconfirm, Select, Space, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import useContactMutation from "../../../../common/hooks/contact/useContactMutation";

type Props = {}

const ContactList = (props: Props) => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [searchUserId, setSearchUserId] = useState<string>("");  // Tìm theo email người dùng
  const [statusFilter, setStatusFilter] = useState<'new' | 'in_progress' | 'resolved' | ''>(''); // Lọc theo trạng thái

  const query = useContactQuery();
  const mutation = useContactMutation();
  useEffect(() => {
    if (query) {
      const newContacts = query.map((contact: IContact, index: number) => ({
        ...contact,
        key: index + 1, // Đảm bảo `key` là duy nhất
      }));
      setContacts(newContacts);
    }
  }, [query]);

  // Hàm lọc các liên hệ
  const handleSearch = () => {
    let filteredContacts = query || [];

    if (searchUserId) {
      filteredContacts = filteredContacts.filter(item => item.userId?.email.includes(searchUserId));
    }

    if (statusFilter) {
      filteredContacts = filteredContacts.filter(item => item.status === statusFilter);
    }

    setContacts(filteredContacts);
  };

  // Định nghĩa các cột của bảng
  const columns: TableColumnsType<IContact> = [
    {
      title: "#",
      dataIndex: "key",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      render: (userId: any) => userId?.email || userId,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: 'new' | 'in_progress' | 'resolved') => {
        switch (status) {
          case 'new': return <span style={{ color: 'blue' }}>Mới</span>;
          case 'in_progress': return <span style={{ color: 'orange' }}>Đang xử lý</span>;
          case 'resolved': return <span style={{ color: 'green' }}>Đã giải quyết</span>;
          default: return status;
        }
      },    
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: Date) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt: Date) => new Date(updatedAt).toLocaleString(),
    },
    {
        title: "Thao tác", 
        dataIndex: "actions", 
        render: (_, record) => (
          <>
            <Link to={`admin/contacts/${record._id}`}><Button >Phản hồi</Button></Link>
            <Space>
                <Popconfirm title="Bạn có chắc chắn muốn xóa danh mục này?"
                        onConfirm={() => mutation.mutate({ action: "delete", contactId: record._id })}
                        okText="Có"
                        cancelText="Không">
                <Button type="primary" danger className="ml-2"><DeleteOutlined/></Button>
                </Popconfirm>
            </Space>
          </>
        ), 
      }
  ];

  return (
    <div className="overflow-y-auto h-[600px]">
        <div className="flex justify-between items-center mb-4">
                <h6 className='font-semibold text-[20px]'>DANH SÁCH LIÊN HỆ:</h6>
        </div>
        <div style={{ marginBottom: 16 }}>
        {/* Tìm kiếm theo email khách hàng */}
        <Input
          placeholder="Tìm kiếm theo email khách hàng"
          value={searchUserId}
          onChange={e => setSearchUserId(e.target.value)}
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
        </Select>

        {/* Nút tìm kiếm */}
        <Button onClick={handleSearch} type="primary">Tìm kiếm</Button>
      </div>
        <Table
        columns={columns}
        dataSource={contacts}
      />
    </div>
  )
}

export default ContactList;