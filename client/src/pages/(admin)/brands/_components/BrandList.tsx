import { PlusOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Button, Popconfirm, Space, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../../../common/config/axios';
import { IBrands } from '../../../../common/interfaces/brands';
import useBrandQuery from '../../../../common/hooks/brands/useBrandQuery';
import useBrandMutation from '../../../../common/hooks/brands/useBrandMutation';

const BrandList: React.FC = () => {
  const [brands, setBrands] = useState<IBrands[]>([]);

  const query = useBrandQuery();
  const mutation = useBrandMutation()
  useEffect(() => {
    if (query.data) {
      const newBrands = query.data.map((brand: IBrands, index: number) => ({
        ...brand,
        key: index + 1, // Đảm bảo `key` là duy nhất
      }));
      setBrands(newBrands);
    }
  }, [query.data]);

  // if (query.isLoading) return <p>Loading...</p>;
  // if (query.isError) return <p>Error fetching categories.</p>;

  const handleStatusChange = async (checked: boolean, record: IBrands) => {
    const newStatus = checked ? 'Hoạt động' : 'Không hoạt động';
    try {
      await instance.put(`/brands/${record._id}`, {
        ...record,
        status: newStatus,
      });
      setBrands(brands.map((item: IBrands) =>
        item._id === record._id ? { ...item, status: newStatus } : item
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumnsType<IBrands> = [
    {
      title: "#",
      dataIndex: "key", // Thay đổi từ `id` sang `key` nếu cần
      sorter: (a : any, b : any) => a.key - b.key,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filterSearch:true,
      filters: Array.from(new Set(brands.map(brand => brand.name))).map(name => ({
        text: name,
        value: name,
      })),
      onFilter: (value : any, record : IBrands) => record.name.includes(value),
    },
    {
      title: "Slug",
      dataIndex: "slug",
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
                  title="Delete the brand"
                  description="Are you sure to delete this brand?"
                  onConfirm={() => mutation.mutate({action : "delete", brand : record})}
                  okText="Yes"
                  cancelText="No"
              >
                  <Button danger>Delete</Button>
              </Popconfirm>
              <Link to={`edit/${record._id}`}><Button type='primary'>Update</Button></Link>
          </Space>
      ),
  }
];


  
  const rowClassName = (record: IBrands) => {
    return record.status === 'Không hoạt động' ? 'bg-gray-200' : '';
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className='font-semibold text-[20px]'>THƯƠNG HIỆU</h1>
        <Link to={`/admin/brands/add`}><Button type='primary'><PlusOutlined />Thương Hiệu</Button></Link>
      </div>
      <div className='h-[550px] overflow-y-scroll mt-2'>
        <Table loading={query.isLoading ? query.isLoading : mutation.isPending} columns={columns} dataSource={brands} rowClassName={rowClassName}  />
      </div>
    </>
  );
};

export default BrandList;
