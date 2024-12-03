import { BackwardOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom";
import useBlogMutation from "../../../../common/hooks/blog/useBlogMutation";
import useBlogQuery from "../../../../common/hooks/blog/useBlogQuery";
import useCategoryBlogQuery from "../../../../common/hooks/categoryBlog/useCategoryBlogQuery";

type Props = {};

const Clound_name = import.meta.env.VITE_CLOUND_NAME;
const preset = import.meta.env.VITE_PRESET;

const BlogEdit = (props: Props) => {
    const { id } = useParams(); // Lấy blogId từ URL
    const query = useCategoryBlogQuery();
    const blogData = useBlogQuery(id); // Lấy dữ liệu bài viết từ query
    const mutation = useBlogMutation();
    const [featured, setFeatured] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
      if (blogData) {
          form.setFieldsValue({
              title: blogData.title,
              description: blogData.description,
              content: blogData.content,
              categories: blogData.categories.map((category: any) => category._id),  // Đảm bảo là mảng các _id
              tags: blogData.tags || [],
              thumbnail: blogData.thumbnail,
              featured: blogData.featured,
          });
          setFeatured(blogData);
      }
  }, [blogData, form]);

    const handleSubmit = async (values: any) => {
        console.log(values)
        try {
            mutation.mutate({
                action: "update",
                blogId: id,
                blogData: values
            });
            message.success("Bài viết đã được cập nhật thành công!");
            navigate(`/admin/blog`);
        } catch (error) {
            message.error("Cập nhật bài viết thất bại.");
        }
    };

    const categoriesOptions = query?.categories?.map((category: any) => ({
        label: category.name,
        value: category._id,
    })) || [];

    const handleUploadChange = (info: any) => {
        console.log("File information:", info.file); // Log the file info

      // Check status and response of the uploaded file
      if (info.file && info.file.status === 'done') {
          console.log("File uploaded successfully:", info.file);
          const fileUrl = info.file.response?.secure_url;
          if (fileUrl) {
              // Update form field with the image URL
              form.setFieldsValue({ thumbnail: fileUrl });
              message.success("Ảnh đã được tải lên thành công.");
          } else {
              message.error("Không tìm thấy URL ảnh.");
          }
      } else if (info.file.status === 'error') {
          console.log("File upload failed:", info.file);
          form.setFieldsValue({ thumbnail: '' });
          message.error("Tải ảnh thất bại.");
      }
    };

    return (
      <>
          <div className="overflow-y-auto h-[600px]">
            <div className="flex justify-between">
              <h1 className="font-semibold text-[20px]">CẬP NHẬT BÀI VIẾT</h1>
              <Link to={`/admin/blog`}>
                        <Button type="primary">
                            <BackwardOutlined /> Quay lại
                        </Button>
              </Link>
            </div>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                      label="Tiêu đề"
                      name="title"
                      rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]} >
                      <Input />
              </Form.Item>
              <Form.Item
                      label="Mô tả"
                      name="description"
                      rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]} >
                      <ReactQuill/>
              </Form.Item>
              <Form.Item
                      label="Nội dung"
                      name="content"
                      rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]} >
                      <ReactQuill />
              </Form.Item>
              <Form.Item
                      label="Danh mục"
                      name="categories"
                      rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]} >
                      <Select
                          mode="multiple"
                          allowClear
                          showSearch={false}
                          placeholder="Chọn danh mục"
                          options={categoriesOptions}
                      />
              </Form.Item>
              <Form.Item label="Thẻ" name="tags">
                      <Select mode="tags" placeholder="Thêm thẻ" />
              </Form.Item>
              <Form.Item
                label="Ảnh đại diện"
                name="thumbnail"
                rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}>
                <Upload
                    name="file"
                    listType="picture"
                    action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
                    data={{
                    upload_preset: preset,
                    }}
                    onChange={handleUploadChange}
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}>
                    <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                </Upload>
                {form.getFieldValue('thumbnail') && (
                    <img src={form.getFieldValue('thumbnail')} alt="Thumbnail" style={{ width: 100, marginTop: 10 }} />
                )}
              </Form.Item>
              <Form.Item label="Nổi bật" name="featured" valuePropName="checked" initialValue={featured}>
                      <Checkbox checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
              </Form.Item>
              <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                          Cập nhật bài viết
                      </Button>
              </Form.Item>
            </Form>
          </div>
      </>
    );
};

export default BlogEdit;
  