import React from "react";
import { Form, Input, Button, Modal, Switch } from "antd";
import useGalleryMutation from "../../../../common/hooks/gallerys/useGalleryMutation";
import { IGallery } from './../../../../common/interfaces/gallery';

interface EditGalleryProps {
  gallery: IGallery;
  onClose: () => void;
}

const EditGallery: React.FC<EditGalleryProps> = ({ gallery, onClose }) => {
  const [form] = Form.useForm();
  const galleryMutation = useGalleryMutation();

  const onFinish = (values: IGallery) => {
    galleryMutation.mutate({
      action: "update",
      gallery: { ...gallery, ...values },
    });
    form.resetFields();
    onClose();
  };

  return (
    <Modal title="Chỉnh sửa Gallery" visible onCancel={onClose} footer={null}>
      <Form
        form={form}
        layout="vertical"
        initialValues={gallery}
        onFinish={onFinish}
      >
        <Form.Item
          label="Chủ đề gallery"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
        >
          <Input placeholder="Nhập chủ đề gallery" />
        </Form.Item>
        <Form.Item
          label="URL hình ảnh"
          name="imageUrl"
          rules={[
            { required: true, message: "Vui lòng nhập URL hình ảnh!" },
            { type: "url", message: "Vui lòng nhập một URL hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập URL hình ảnh" />
        </Form.Item>
        <Form.Item
          label="Link sản phẩm"
          name="linkPrd"
          rules={[
            { required: true, message: "Vui lòng nhập link sản phẩm!" },
            { type: "url", message: "Vui lòng nhập một URL hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập link sản phẩm hoặc chương trình khuyến mãi" />
        </Form.Item>
        <Form.Item label="Hoạt động" name="active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGallery;