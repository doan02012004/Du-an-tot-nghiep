import type { TableColumnsType, TableProps } from 'antd';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import useCategoryQuery from '../../../../common/hooks/categories/useCategoryQuery';
import { Icategories } from '../../../../interface/categories';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Icategories[]>([]);

  const query = useCategoryQuery()
  useEffect(() => {
    if (query.data) {
      const newCategories = query.data.map((category: Icategories,index : number) => ({
        ...category,
        key: index + 1, // Đảm bảo `key` là duy nhất
      }));
      setCategories(newCategories);
    }
  }, [query.data]);

  if (query.isLoading) return <p>Loading...</p>;
  if (query.isError) return <p>Error fetching categories.</p>;

  const columns: TableColumnsType<Icategories> = [
    {
      title: "#",
      dataIndex: "key", // Thay đổi từ `id` sang `key` nếu cần
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Nam',
          value: 'Nam',
        },
        {
          text: 'Nữ',
          value: 'Nữ',
        },
        {
          text: 'Unisex',
          value: 'Unisex',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        console.log('Filter value:', value);
        console.log('Record:', record);
        return record.name.includes(value as string);
      },
    },
    {
      title: "Slug",
      dataIndex: "slug", // Thay đổi từ `id` sang `key` nếu cần
    },
  ];

  const onChange: TableProps<Icategories>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
    <div className="flex justify-between items-center">
      <h1 className='font-semibold text-[20px]'>DANH MUC</h1>
      <Link to={`/admin/categories/add`}><Button type='primary'><PlusOutlined />Danh mục</Button></Link>
    </div>
      <div className='h-[550px] overflow-y-scroll mt-2  '>
      <Table columns={columns} dataSource={categories} onChange={onChange} pagination={false} />
    </div>
    </>
  );
};

export default CategoryList;
