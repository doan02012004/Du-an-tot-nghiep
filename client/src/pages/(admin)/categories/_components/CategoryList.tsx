import { PlusOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Button, Input, message, Popconfirm, Space, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../../../common/config/axios';
import useCategoryMutation from '../../../../common/hooks/categories/useCategoryMutation';
import useCategoryQuery from '../../../../common/hooks/categories/useCategoryQuery';
import { ICategories } from '../../../../common/interfaces/categories';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [searchText, setSearchText] = useState<string>(''); // State lưu trữ từ khóa tìm kiếm

  const query = useCategoryQuery();
  const mutation = useCategoryMutation();

  console.log(categories)

  useEffect(() => {
    if (query.data) {
      const newCategories = query.data.map((category: ICategories, index: number) => ({
        ...category,
        key: index + 1, // Đảm bảo key là duy nhất
      }));
      setCategories(newCategories);
    }
  }, [query.data]);

  const handleStatusChange = async (checked: boolean, record: ICategories) => {
    const newStatus = checked ? 'Hoạt động' : 'Không hoạt động';
    try {
      await instance.put(`/categories/${record._id}`, {
        ...record,
        status: newStatus,
      });
      setCategories(categories.map((item: ICategories) =>
        item._id === record._id ? { ...item, status: newStatus } : item
      ));
      message.success("cập nhật thành công")
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumnsType<ICategories> = [
    {
      title: "#",
      dataIndex: "key",
      sorter: (a: any, b: any) => a.key - b.key,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "productCount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, record) => (
        <Switch
          size="small"
          checked={record.status === 'Hoạt động'}
          onChange={(checked) => handleStatusChange(checked, record)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={() => mutation.mutate({ action: "delete", category: record })}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Link to={`edit/${record._id}`}>
            <Button type='primary'>Update</Button>
          </Link>
        </Space>
      ),
    }
  ];

  const rowClassName = (record: ICategories) => {
    return record.status === 'Không hoạt động' ? 'bg-gray-200' : '';
  };

  // Xử lý tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filteredCategories = query.data.filter((category: ICategories) =>
      category.name.toLowerCase().includes(value)
    );
    setCategories(filteredCategories);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className='font-semibold text-[20px]'>DANH MỤC</h1>
        <Link to={`/admin/categories/add`}>
          <Button type='primary'>
            <PlusOutlined />Danh mục
          </Button>
        </Link>
      </div>
      {/* Form tìm kiếm */}
      <div className="mt-2">
        <Input
          type="text"
          placeholder='Tìm kiếm tên danh mục'
          style={{ width: '300px' }}
          value={searchText}
          onChange={handleSearch} // Lắng nghe sự kiện nhập liệu
        />
      </div>
      <div className='mt-2'>
        <Table
          loading={query.isLoading ? query.isLoading : mutation.isPending}
          columns={columns}
          dataSource={categories}
          rowClassName={rowClassName}
        />
      </div>
    </>
  );
};

export default CategoryList;