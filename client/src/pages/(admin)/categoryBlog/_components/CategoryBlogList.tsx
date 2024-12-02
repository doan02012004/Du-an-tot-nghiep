import { PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Switch, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCategoryBlogMutation from "../../../../common/hooks/categoryBlog/useCategoryBlogMutation";
import useCategoryBlogQuery from "../../../../common/hooks/categoryBlog/useCategoryBlogQuery";
import { ICategoryBlog } from "../../../../common/interfaces/categoryBlog";

type Props = {}

const CategoryBlogList = (props: Props) => {
    const [categories, setCategories] = useState<ICategoryBlog[]>([]);
    const [searchText, setSearchText] = useState(''); // State để lưu giá trị tìm kiếm

    const query = useCategoryBlogQuery();
    const mutation = useCategoryBlogMutation();

    useEffect(() => {
        if (query?.categories) {
            const newCategories = query.categories.map((category: ICategoryBlog, index: number) => ({
                ...category,
                key: index + 1, // Đảm bảo key là duy nhất
            }));
            setCategories(newCategories);
        }
    }, [query]);

    // Hàm thay đổi trạng thái của danh mục
    const handleStatusChange = async (checked: boolean, record: ICategoryBlog) => {
        const newStatus = checked ? true : false;
        try {
            await mutation.mutate({
                action: 'update',
                categoryData: { ...record, status: newStatus },
                categoryId: record._id,
            });
            setCategories(categories.map((item: ICategoryBlog) =>
                item._id === record._id ? { ...item, status: newStatus } : item
            ));
        } catch (error) {
            console.log(error);
        }
    };

    // Hàm xử lý tìm kiếm
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    // Cấu hình các cột cho bảng
    const columns = [
        {
            title: "#",
            dataIndex: "key",
            sorter: (a: any, b: any) => a.key - b.key,
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
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
                    checked={record.status === true}
                    onChange={(checked) => handleStatusChange(checked, record)}
                />
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này?"
                        onConfirm={() => mutation.mutate({ action: "delete", categoryId: record._id })}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                    <Link to={`admin/categoryBlog/${record._id}`}>
                        <Button type='primary'>Cập nhật</Button>
                    </Link>
                </Space>
            ),
        },
    ];

    // Lọc các danh mục theo tên khi có giá trị tìm kiếm
    const filteredCategories = categories.filter((category: ICategoryBlog) =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[20px]">DANH MỤC BLOG</h1>
                <Link to="/admin/categoryBlog/add">
                    <Button type='primary'>
                        <PlusOutlined /> Thêm danh mục
                    </Button>
                </Link>
            </div>
            
            {/* Form tìm kiếm */}
            <div className="mt-2">
                <Input
                    type="text"
                    placeholder='Tìm kiếm tên danh mục'
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: '300px' }}
                />
            </div>

            <div className="h-[550px] overflow-y-scroll mt-2">
                <Table 
                    columns={columns} 
                    dataSource={filteredCategories} // Sử dụng danh sách đã được lọc
                    rowClassName={(record) => (record.status === false ? 'bg-gray-200' : '')}
                />
            </div>
        </div>
    );
};

export default CategoryBlogList;
