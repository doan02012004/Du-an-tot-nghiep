import { DeleteFilled, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Table, TableColumnsType, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../../../../common/interfaces/blog';
import useBlogQuery from '../../../../common/hooks/blog/useBlogQuery';
import useBlogMutation from '../../../../common/hooks/blog/useBlogMutation';

type Props = {};

const BlogList = (props: Props) => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const query = useBlogQuery();  // Fetch all blogs
    const mutation = useBlogMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchParams, setSearchParams] = useState({
        title: '',
        categories: '',
    });

    const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);
    useEffect(() => {
        if (query?.blogs) {
            const newBlogs = query.blogs.map((blog: IBlog, index: number) => ({
                ...blog,
                key: index + 1,
            }));
            setBlogs(newBlogs);
        }
    }, [query]);

    // Xử lý thay đổi lựa chọn hàng
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleDelete = () => {
        if (selectedRowKeys.length === 0) {
            message.warning("Bạn chưa chọn bài viết nào để xoá.");
            return;
        }

        Modal.confirm({
            title: "Xác nhận xoá",
            content: "Bạn có chắc chắn muốn xoá các bài viết đã chọn không?",
            okText: "Xoá",
            cancelText: "Huỷ",
            onOk: () => {
                // Xoá các bài viết đã chọn
                selectedRowKeys.forEach((key) => {
                    const blogId = blogs.find(blog => blog.key === key)?._id;
                    if (blogId) {
                        mutation.mutate({action: "delete", blogId:blogId });
                    }
                });

                // Cập nhật lại danh sách bài viết còn lại sau khi xoá
                const remainingBlogs = blogs.filter(blog => !selectedRowKeys.includes(blog.key));
                setBlogs(remainingBlogs);
                setSelectedRowKeys([]);  // Reset lại trạng thái lựa chọn
            }
        });
    };

    const handleSearch = () => {
        const filteredBlogs = query?.blogs?.filter((blog: IBlog) => {
            const isMatchTitle = blog.title.toLowerCase().includes(searchParams.title.toLowerCase());

            // Kiểm tra danh mục
            const isMatchCategories = !searchParams.categories || blog.categories.some((cat: string | { name: string }) =>
                (typeof cat === 'string' ? cat : cat.name).toLowerCase().includes(searchParams.categories.toLowerCase())
            );

            return isMatchTitle && isMatchCategories;
        });

        setBlogs(filteredBlogs || []);
    };

    const handleReset = () => {
        setSearchParams({
            title: '',
            categories: '',
        });
        if (query?.blogs) {
            setBlogs(query.blogs);
        }
    };

    // Lấy danh sách tất cả danh mục từ tất cả các bài viết
    const allCategories = [...new Set(blogs.flatMap(blog => blog.categories.map(cat => typeof cat === 'string' ? cat : cat.name)))];

    const handleSortChange = (pagination: any, filters: any, sorter: any) => {
        if (sorter.order) {
            setSortOrder(sorter.order);
            const sortedBlogs = [...blogs].sort((a, b) => {
                if (sorter.order === 'ascend') {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                } else {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                }
            });
            setBlogs(sortedBlogs);
        }
    };

    const columns: TableColumnsType<IBlog> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
        },
        {
            title: 'Ảnh',
            dataIndex: 'thumbnail',
            render: (thumbnail) => <img src={thumbnail} alt="Thumbnail" style={{ width: 50, height: 50, objectFit: 'cover' }} />,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            sorter: true,
            render: (createdAt: string) => {
                const date = new Date(createdAt);
                return date.toLocaleDateString('vi-VN');
            },
        },
        {
            title: 'Danh mục',
            dataIndex: 'categories',
            render: (categories: string[]) => categories.map(cat => (typeof cat === 'string' ? cat : cat.name)).join(', ') || 'Không có danh mục',
        },
        {
            title: 'Lượt xem',
            dataIndex: 'views',
            sorter: true,
        },
        {
            title: 'Thao tác',
            render: (_, record) => (
                <div>
                    <Link to={`admin/blog/${record._id}`}>
                        <Button type='primary' icon={<EditOutlined />} />
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className='font-semibold text-[20px]'>DANH SÁCH BÀI VIẾT</h1>
                <Button
                    type="primary"
                    onClick={handleDelete}
                    disabled={selectedRowKeys.length === 0}
                >
                    <DeleteFilled /> XOÁ BÀI VIẾT
                </Button>
            </div>

            <div className="flex justify-between items-center my-3">
                <Input
                    placeholder="Tiêu đề bài viết"
                    value={searchParams.title}
                    onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
                    style={{ width: 200, marginRight: 10 }}
                />
                <Select
                    placeholder="Chọn danh mục"
                    value={searchParams.categories}
                    onChange={(value) => setSearchParams({ ...searchParams, categories: value })}
                    style={{ width: 200, marginRight: 10 }}
                >
                    <Select.Option value="">Tất cả</Select.Option>
                    {allCategories.map((category, index) => (
                        <Select.Option key={index} value={category}>{category}</Select.Option>
                    ))}
                </Select>
                <Button type="primary" onClick={handleSearch}>Tìm kiếm</Button>
                <Button onClick={handleReset} style={{ marginLeft: 10 }}>Đặt lại</Button>
                <Link to={`/admin/blog/add`}><Button type='primary'><PlusOutlined />Thêm bài viết</Button></Link>
            </div>

            <Table<IBlog> rowSelection={rowSelection} columns={columns} dataSource={blogs} onChange={handleSortChange} />
        </div>
    );
};

export default BlogList;
