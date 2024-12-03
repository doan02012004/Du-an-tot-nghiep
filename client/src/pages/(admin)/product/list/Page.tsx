/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EyeOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Pagination, Popconfirm, Select, Space, Table } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import { formatPrice } from '../../../../common/utils/product'
import { useEffect, useState } from 'react'
import { Igallery, Iproduct } from '../../../../common/interfaces/product'
import useProductQuery from '../../../../common/hooks/products/useProductQuery'
import useProductMutation from '../../../../common/hooks/products/useProductMutation'
import useColorQuery from '../../../../common/hooks/color/useColorQuery'
import { IColor } from '../../../../common/interfaces/Color'

const ListProduct = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [limit,] = useState(4)
    const [products, setProducts] = useState([] as Iproduct[])
    const [sizesFillter, setSizesFillter] = useState([] as string[])
    const [colorsFillter, setColorsFillter] = useState([] as string[])
    const categorySlug = searchParams.get("category"); // Ưu tiên lấy từ slug nếu có
    const sizesUrl = searchParams.get('sizes')
    const colorsUrl = searchParams.get('colors')
    const minPriceUrl = searchParams.get('min_price')
    const maxPriceUrl = searchParams.get('max_price')
    const search = searchParams.get("search")
    const sellOrder = searchParams.get("sell_order")
    const productQuery = useProductQuery({
        dataFilter: {
            limit: limit,
            page: searchParams.get('page') ?? null,
            categorySlug: categorySlug,
            sizes: sizesUrl,
            colors: colorsUrl,
            min_price: minPriceUrl ? Number(minPriceUrl) : null,
            max_price: maxPriceUrl ? Number(maxPriceUrl) : null,
            sell_order: sellOrder,
            search: search,
        }
    })
    const colorQuery = useColorQuery()
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
        console.log(productQuery.data)
    }, [productQuery.data])
    const columns = [
        {
            title: "Ảnh",
            dataIndex: "gallerys",
            key: "gallerys",
            render: (gallerys: Igallery[]) => (
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
                <p>{categoryId?.name}</p>
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
            dataIndex: "active",
            key: "active",
            render: (active: boolean) => (
                <p className={`${active == true ? ' text-green-500' : 'text-red'}`}>{active == true ? 'active' : 'disactive'}</p>
            )
        },
        {
            title: "Trạng thái",
            key: 'instock',
            render: (product: Iproduct) => {
                const sum = product.attributes.reduce((value, currentValue) => value + currentValue.instock, 0)
                if (sum > 0) {
                    return <p className='text-green-500 '>Còn hàng</p>
                } else {
                    return <p className=' text-red'>Hết hàng</p>
                }

            }
        },
        {
            title: "Chức năng",
            key: "actions",
            render: (product: Iproduct) => (
                <Space>
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có muốn xóa không ?"
                        cancelText="Không"
                        okText="Có"
                        onConfirm={() => mutation.mutate({ action: 'delete', product: product })}
                    >
                        <Button type='primary' danger><DeleteOutlined /></Button>
                    </Popconfirm>
                    <Link to={`/admin/products/view/${product.slug}`}><Button className='text-white bg-yellow'><EyeOutlined /></Button></Link>
                </Space>
            )
        }


    ]
    useEffect(() => {

    }, [searchParams])
    const onReset = () => {
        setSizesFillter([])
        setColorsFillter([])
        // setPrice([0,10000000])
        searchParams.delete('sizes')
        searchParams.delete('colors')
        // searchParams.delete('min_price')
        // searchParams.delete('max_price')
        setSearchParams(searchParams)
    }
    const onFilter = () => {
        searchParams.set('sizes', sizesFillter.join(','))
        searchParams.set('colors', colorsFillter.join(','))
        // searchParams.set('min_price',price[0].toString())
        // searchParams.set('max_price',price[1].toString())
        setSearchParams(searchParams)
    }
    return (
        <div>
            <div className='flex justify-between items-center mb-3'>
                <Link to={'/admin/products/add'} className='block w-max' ><Button type='primary'><PlusOutlined /> Sản phẩm</Button></Link>
                <div className='flex items-center gap-x-3'>
                    <Select
                        className='min-w-40'
                        placeholder='Lọc size'
                        mode='multiple'
                        value={sizesFillter}
                        onChange={setSizesFillter}
                        options={[
                            { value: 'S', label: 'S' },
                            { value: 'M', label: 'M' },
                            { value: 'L', label: 'L' },
                            { value: 'XL', label: 'XL' },
                            { value: 'XXL', label: 'XXL' },
                            { value: '3XL', label: '3XL' },
                            { value: '4XL', label: '4XL' },
                            { value: 'FREESIZE', label: 'FREESIZE' }
                        ]}
                    />
                    <Select
                        className='min-w-40'
                        mode='multiple'
                        value={colorsFillter}
                        onChange={setColorsFillter}
                        placeholder="Vui lòng chọn màu sắc"
                        options={colorQuery?.data?.map((item: IColor) => ({ label: item.name, value: item.name }))}
                    />
                    <Button onClick={onFilter} type='primary' icon={<FilterOutlined />} danger >Lọc</Button>
                    <Button onClick={onReset} type='primary' icon={<FilterOutlined />} className='bg-black text-white' >Bỏ lọc</Button>
                </div>
            </div>
            <Table loading={productQuery.isLoading} columns={columns} dataSource={products} pagination={false} />
            <Pagination className='w-max mx-auto mt-2' defaultCurrent={productQuery?.data?.currentPage} onChange={(page: any) => { searchParams.set('page', page); setSearchParams(searchParams) }} total={productQuery?.data?.total} pageSize={limit} />
        </div>
    )
}

export default ListProduct