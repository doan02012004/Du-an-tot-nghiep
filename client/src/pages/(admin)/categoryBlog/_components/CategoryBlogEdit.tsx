import { BackwardOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useCategoryBlogMutation from '../../../../common/hooks/categoryBlog/useCategoryBlogMutation';
import useCategoryBlogQuery from '../../../../common/hooks/categoryBlog/useCategoryBlogQuery';
import { ICategoryBlog } from '../../../../common/interfaces/categoryBlog';

const CategoryBlogEdit = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const mutation = useCategoryBlogMutation();

    const query = useCategoryBlogQuery(id);
    useEffect(() => {
        if (!id) return;
        form.setFieldsValue(query?.categories);
    }, [query?.categories, form, id]);

    const onSubmit = async (category: ICategoryBlog) => {
        if (id) {
            // Cập nhật danh mục
            await mutation.mutate({ action: "update",categoryId: id, categoryData: category  });
        } else {
            // Thêm mới danh mục
            await mutation.mutate({ action: "add", categoryData: category });
            form.resetFields(); // Reset lại form sau khi thêm mới thành công
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-[20px]">
                    {id ? "CẬP NHẬT DANH MỤC" : "THÊM MỚI DANH MỤC"}
                </h1>
                <Link to={`/admin/categoryBlog`}>
                    <Button type="primary">
                        <BackwardOutlined /> Quay lại
                    </Button>
                </Link>
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                initialValues={{ status: true }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Không được bỏ trống" }]}
                >
                    <Input />
                </Form.Item>
                <FormItem label="Trạng thái" name="status" hidden>
                    <Input />
                </FormItem>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="reset" onClick={() => form.resetFields()}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CategoryBlogEdit;