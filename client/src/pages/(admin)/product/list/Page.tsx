/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, Table } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import { formatPrice } from '../../../../common/utils/product'
import { useEffect, useState } from 'react'
import { Igallery, Iproduct } from '../../../../common/interfaces/product'
import useProductQuery from '../../../../common/hooks/products/useProductQuery'
import useProductMutation from '../../../../common/hooks/products/useProductMutation'

const ListProduct = () => {
    const [products, setProducts] = useState([] as Iproduct[])
    const productQuery = useProductQuery(undefined)
    const mutation = useProductMutation()
  
   
    useEffect(() => {
        if (productQuery.data) {
            const newProducts = productQuery?.data?.products?.map((item: Iproduct, index: number) => (
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
            title: "Ảnh",
            dataIndex: "gallerys",
            key: "gallerys",
            render: (gallerys:Igallery[]) => (
                <div className='w-16 h-20 '>
                    <img src={gallerys[0]?.avatar} alt="" className='object-cover w-full h-full ' />
                </div>
            )
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (name: string) => (
                <p className='font-semibold '>{name}</p>
            )
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
            title: "Thương hiệu",
            dataIndex: "brandId",
            key: "brandId",
            render: (brandId: any) => (
                <p>{brandId?.name}</p>
            )
        },
        {
            title: "Giá",
            render: (product: any) => 
                <div className='relative'>
                    <p className='font-semibold text-red'>{formatPrice(product.attributes[0].price_new)}đ</p>
                    <p className=' text-[12px]/[150%] absolute -top-2 right-0 line-through text-gray-400 '>{formatPrice(product.attributes[0].price_old)}đ</p>
                </div>
            
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
            title: "Trạng thái",
            key:'instock',
            render: (product:Iproduct) => {
                const sum = product.attributes.reduce((value,currentValue)=> value + currentValue.instock,0)
               if(sum > 0){
                return  <p className='text-green-500 '>Còn hàng</p>
               }else{
                return  <p className=' text-red'>Hết hàng</p>
               } 
               
            }
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
                        onConfirm={()=>mutation.mutate({action:'delete',product:product})}
                    >
                        <Button type='primary' danger><DeleteOutlined /></Button>
                    </Popconfirm>
                    <Link to={`/admin/products/view/${product.slug}`}><Button className='text-white bg-yellow'><EyeOutlined /></Button></Link>
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