import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useColorMutation from './../../../../common/hooks/color/useColorMutation';
import { IColor } from "../../../../common/interfaces/Color";

interface DeleteColorProps {
  color: IColor;
}

const DeleteColor: React.FC<DeleteColorProps> = ({ color }) => {
  const colorMutation = useColorMutation();

  const handleDelete = () => {
    colorMutation.mutate({ action: "delete", color });
  };

  return (
    <Popconfirm
      title="Xóa màu sắc"
      description="Bạn có muốn xóa không?"
      cancelText="Không"
      okText="Có"
      onConfirm={handleDelete}
    >
      <Button type="primary" danger icon={<DeleteOutlined />} />
    </Popconfirm>
  );
};

export default DeleteColor;
