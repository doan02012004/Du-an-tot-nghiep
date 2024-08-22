/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../../../common/utils/product'
import { useEffect, useState } from 'react'
import { Iproduct } from '../../../../common/interfaces/product'
import useProductQuery from '../../../../common/hooks/products/useProductQuery'

const ListProduct = () => {
    const [products, setProducts] = useState([] as Iproduct[])
    const productQuery = useProductQuery()
    useEffect(() => {
        if (productQuery.data) {
            const newProducts = productQuery?.data?.map((item: Iproduct, index: number) => (
                {
                    ...item,
                    key: index + 1,
                }
            ))
            setProducts(newProducts)
        }
    }, [productQuery.data])
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (key:number) => (
                <p>{key}</p>
            )
        },
        {
            title:"Tên sản phẩm",
            dataIndex:"name",
            key:"name"
        },
        {
            title: "Danh mục",
            dataIndex: "categoryId",
            key: "categoryId",
            render: (categoryId: any) => (
                <p>{categoryId.name}</p>
            )
        },
        {
            title: "Giá",
            render: (product: any) => (
                <div className='relative'>
                    <p className='font-semibold text-red'>{formatPrice(product.price_new)}đ</p>
                    <p className=' text-[12px]/[150%] absolute -top-2 right-0 line-through text-gray-400 '>{formatPrice(product.price_old)}đ</p>
                </div>
            )
        },
        {
            title:"Giảm giá",
            dataIndex:"discount",
            key:"discount"
        },
        {
            title: "Hoạt động",
            dataIndex: "status",
            key: "status",
            render: (status: boolean) => (
                <p className={`${status == true ? ' text-green-500' : 'text-red'}`}>{status == true ? 'active' : 'disactive'}</p>
            )
        },
        {
            title:"Trạng thái",
            dataIndex:"name",
            key:"name"
        },
        {
            title: "Chức năng",
            key: "actions",
            render: (product:Iproduct) => (
                <Space>
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có muốn xóa không ?"
                        cancelText="Không"
                        okText="Có"
                    >
                        <Button type='primary' danger><DeleteOutlined /></Button>
                    </Popconfirm>
                    <Link to={'/admin/'}><Button className='text-white bg-yellow'><EyeOutlined /></Button></Link>
                </Space>
            )
        }


    ]
    return (
        <div>
            <Link to={'/admin/products/add'} className='block mb-3' ><Button type='primary'><PlusOutlined /> Sản phẩm</Button></Link>
            <Table loading={productQuery.isLoading} columns={columns} dataSource={products} />
        </div>
    )
}

export default ListProduct