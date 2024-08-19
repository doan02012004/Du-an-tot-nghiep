import React from "react";
import { Form, Input, Button, Modal } from "antd";
import useBannerMutation from "../../../../common/hooks/banner/useBannerMutation";
import { IBanner } from "../../../../common/interfaces/Banner";

interface EditBannerProps {
  banner: IBanner;
  onClose: () => void;
}

const EditBanner: React.FC<EditBannerProps> = ({ banner, onClose }) => {
  const [form] = Form.useForm();
  const bannerMutation = useBannerMutation();

  const onFinish = (values: IBanner) => {
    bannerMutation.mutate({
      action: "update",
      banner: { ...banner, ...values },
    });
    onClose();
  };

  return (
    <Modal title="Chỉnh sửa banner" visible onCancel={onClose} footer={null}>
      <Form form={form} onFinish={onFinish} initialValues={banner}>
        <Form.Item
          label="Chủ đề banner"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="URL hình ảnh"
          name="imageUrl"
          rules={[{ required: true, message: "Vui lòng nhập URL hình ảnh!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="active" valuePropName="checked">
          <Input type="checkbox" /> Active
        </Form.Item>
        <Form.Item className="flex items-center justify-center">
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBanner;
