
import { BackwardOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Select, Upload } from "antd";
import ReactQuill from "react-quill";
import { Link, useNavigate } from "react-router-dom";
import useBlogMutation from "../../../../common/hooks/blog/useBlogMutation";
import useCategoryBlogQuery from "../../../../common/hooks/categoryBlog/useCategoryBlogQuery";
import { useState } from "react";


type Props = {}
const Clound_name = import.meta.env.VITE_CLOUND_NAME;
const preset = import.meta.env.VITE_PRESET;
const BlogAdd = (props: Props) => {
    const query = useCategoryBlogQuery();
    const mutation = useBlogMutation();
    const [featured, setFeatured] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const handleSubmit = async (values:any)=>{
      console.log(values)
      try {
        mutation.mutate({action:"add",blogData:{...values,featured:featured}})
        navigate(`/admin/blog`)
      } catch (error) {
        console.log(error)
      }
    }

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
            <h1 className="font-semibold text-[20px]">THÊM BÀI VIẾT</h1>
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
                     rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]} >
                     <Upload
                         name="file"
                         listType="picture"
                         action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
                          data={{
                            upload_preset: preset,
                          }}
                         onChange={handleUploadChange}
                         maxCount={1}  //Chỉ cho phép chọn 1 file
                         showUploadList={{ showPreviewIcon: true }}
                     >
                         <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                     </Upload>
            </Form.Item>
            <Form.Item label="Nổi bật" name="featured" valuePropName="checked" initialValue={featured}>
                     <Checkbox checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            </Form.Item>
            <Form.Item>
                     <Button type="primary" htmlType="submit" block>
                         Thêm bài viết
                     </Button>
            </Form.Item>
          </Form>
        </div>
    </>
  )
}

export default BlogAdd  