import { ColorPicker, Button, Form, Input, Modal } from "antd";
import useColorMutation from "./../../../../common/hooks/color/useColorMutation";
import { IColor } from "../../../../common/interfaces/Color";

interface AddColorProps {
  onClose: () => void;
}

const AddColor: React.FC<AddColorProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const colorMutation = useColorMutation();

  const onFinish = (values: { name: string; background: string }) => {
    const newColor: IColor = {
      name: values.name.toUpperCase(),
      background: `#${values.background}`,
    };
    colorMutation.mutate({ action: "add", color: newColor });
    onClose();
  };

  return (
    <Modal
      className="text-center"
      title="Thêm Màu Sắc"
      visible
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Tên màu sắc"
          name="name"
          rules={[{ required: true, message: "Bắt buộc nhập tên màu sắc!" }]}
        >
          <Input placeholder="Nhập tên màu sắc" />
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
            Thêm màu sắc
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddColor;
