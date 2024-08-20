import { Button, ColorPicker, Form, Input, Modal } from "antd";
import { IColor } from "../../../../common/interfaces/Color";
import useColorMutation from "../../../../common/hooks/color/useColorMutation";

interface EditColorProps {
  color: IColor;
  onClose: () => void;
}

const EditColor: React.FC<EditColorProps> = ({ color, onClose }) => {
  const [form] = Form.useForm();
  const colorMutation = useColorMutation();

  const onFinish = (values: { name: string; background: string }) => {
    const updatedColor = {
      ...color,
      name: values.name.toUpperCase(),
      background: `#${values.background}`,
    };
    colorMutation.mutate({ action: "update", color: updatedColor });
    onClose();
  };

  return (
    <Modal
      className="text-center"
      title="Cập Nhật Màu Sắc"
      visible
      onCancel={onClose}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={color}
      >
        <Form.Item
          label="Tên màu sắc"
          name="name"
          rules={[{ required: true, message: "Bắt buộc nhập tên màu sắc!" }]}
        >
          <Input />
        </Form.Item>
        <div className="flex items-center gap-x-2">
          <Form.Item
            label="Màu sắc"
            name="background"
            rules={[{ required: true, message: "Bắt buộc nhập màu sắc!" }]}
          >
            <Input className="w-32" placeholder="Mã màu sắc" />
          </Form.Item>
          <div className="mt-8">
            <Form.Item>
              <ColorPicker className="mx-5" />
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật màu sắc
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditColor;
