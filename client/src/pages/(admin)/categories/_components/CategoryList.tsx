import type { TableColumnsType, TableProps } from 'antd';
import { Button, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import useCategoryQuery from '../../../../common/hooks/categories/useCategoryQuery';
import { Icategories } from '../../../../interface/categories';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import instance from '../../../../common/config/axios';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Icategories[]>([]);

  const query = useCategoryQuery();
  useEffect(() => {
    if (query.data) {
      const newCategories = query.data.map((category: Icategories, index: number) => ({
        ...category,
        key: index + 1, // Đảm bảo `key` là duy nhất
      }));
      setCategories(newCategories);
    }
  }, [query.data]);

  if (query.isLoading) return <p>Loading...</p>;
  if (query.isError) return <p>Error fetching categories.</p>;

  const handleStatusChange = async (checked: boolean, record: Icategories) => {
    const newStatus = checked ? 'Hoạt động' : 'Không hoạt động';
    try {
      await instance.put(`/categories/${record._id}`, {
        ...record,
        status: newStatus,
      });
      setCategories(categories.map((item: Icategories) =>
        item._id === record._id ? { ...item, status: newStatus } : item
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumnsType<Icategories> = [
    {
      title: "#",
      dataIndex: "key", // Thay đổi từ `id` sang `key` nếu cần
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filterSearch:true,
      filters: Array.from(new Set(categories.map(category => category.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text, record) => (
        <Switch
          size="small"
          checked={record.status === 'Hoạt động'}
          onChange={(checked) => handleStatusChange(checked, record)}
        />
      ),
    },
  ];

  
  const rowClassName = (record: Icategories) => {
    return record.status === 'Không hoạt động' ? 'bg-gray-200' : '';
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className='font-semibold text-[20px]'>DANH MỤC</h1>
        <Link to={`/admin/categories/add`}><Button type='primary'><PlusOutlined />Danh mục</Button></Link>
      </div>
      <div className='h-[550px] overflow-y-scroll mt-2'>
        <Table columns={columns} dataSource={categories} rowClassName={rowClassName}  />
      </div>
    </>
  );
};

export default CategoryList;
