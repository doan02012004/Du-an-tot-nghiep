import React from "react";
import { Button, Popconfirm} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useBannerMutation from "../../../../common/hooks/banners/useBannerMutation";
import { IBanner } from "./../../../../common/interfaces/banner";

interface DeleteBannerProps {
  banner: IBanner;
}

const DeleteBanner: React.FC<DeleteBannerProps> = ({ banner }) => {
  const bannerMutation = useBannerMutation();

  const handleDelete = () => {
    bannerMutation.mutate({ action: "delete", banner: banner });
  };

  return (
    <Popconfirm
      title="Bạn có chắc muốn xóa banner này?"
      onConfirm={handleDelete}
      okText="Có"
      cancelText="Không"
    >
      <Button type="primary" danger icon={<DeleteOutlined />}></Button>
    </Popconfirm>
  );
};

export default DeleteBanner;