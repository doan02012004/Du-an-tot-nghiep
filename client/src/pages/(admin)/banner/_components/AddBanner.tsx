import React from "react";
import { Form, Input, Button, Modal, Switch } from "antd";
import useBannerMutation from "../../../../common/hooks/banner/useBannerMutation";
import { IBanner } from "../../../../common/interfaces/Banner";

interface AddBannerProps {
  onClose: () => void;
}

const AddBanner: React.FC<AddBannerProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const bannerMutation = useBannerMutation();

  const onFinish = (values: IBanner) => {
    bannerMutation.mutate({ action: "add", banner: values });
    onClose();
  };

  return (
    <Modal
      className="text-center"
      title="Thêm Banner Mới"
      visible
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
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
        <Form.Item label="Hoạt động" name="active">
          <Switch />
        </Form.Item>
        <Form.Item className="flex items-center justify-center">
          <Button type="primary" htmlType="submit">
            Thêm Banner
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBanner;
