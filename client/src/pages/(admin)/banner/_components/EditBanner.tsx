// EditBanner.tsx
import React from "react";
import { Form, Input, Button, Modal, Switch } from "antd";
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
    form.resetFields();
    onClose();
  };

  return (
    <Modal title="Chỉnh sửa Banner" visible onCancel={onClose} footer={null}>
      <Form
        form={form}
        layout="vertical"
        initialValues={banner}
        onFinish={onFinish}
      >
        <Form.Item
          label="Chủ đề banner"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
        >
          <Input placeholder="Nhập chủ đề banner" />
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

export default EditBanner;
