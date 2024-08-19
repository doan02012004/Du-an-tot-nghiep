/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EyeOutlined, PlusOutlined  } from '@ant-design/icons'
import { Button, Popconfirm, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import { formatPrice, priceNew } from '../../../../common/utils/product'

const ListProduct = () => {

    const columns = [
        {
            title:"STT",
            dataIndex:"key",
            key:"key"
        },
        {
            title:"Tên sản phẩm",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"Danh mục",
            dataIndex:"categoryId",
            key:"categoryId",
            render: (categoryId:any)=>(
                <p>{categoryId.name}</p>
            )
        },
        {
            title:"Giá",
            render: (product:any)=>(
                <div className='relative'>
                     <p className='font-semibold text-red'>{formatPrice(priceNew(product.price_old, product.discount))}đ</p>
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
            title:"Số lượng",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"Trạng thái",
            dataIndex:"name",
            key:"name"
        },
        {
            title:"Chức năng",
            key:"actions",
            render:()=>(
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
    const data = [
        {
            key:1,
            name:"Sản phẩm A",
            categoryId:{
                name:"Danh mục"
            },
            price_old:150000,
            discount:10
        }
    ]
  return (
    <div>
        <Link to={'/admin/products/add'} className='block mb-3' ><Button type='primary'><PlusOutlined /> Sản phẩm</Button></Link>
        <Table columns={columns} dataSource={data}/>
    </div>
  )
}

export default ListProduct