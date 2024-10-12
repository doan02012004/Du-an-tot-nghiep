import React from "react";
import { Button, Popconfirm} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useGalleryMutation from "../../../../common/hooks/gallerys/useGalleryMutation";
import { IGallery } from './../../../../common/interfaces/gallery';

interface DeleteGalleryProps {
  gallery: IGallery;
}

const DeleteGallery: React.FC<DeleteGalleryProps> = ({ gallery }) => {
  const galleryMutation = useGalleryMutation();

  const handleDelete = () => {
    galleryMutation.mutate({ action: "delete", gallery: gallery });
  };

  return (
    <Popconfirm
      title="Bạn có chắc muốn xóa gallery này?"
      onConfirm={handleDelete}
      okText="Có"
      cancelText="Không"
    >
      <Button type="primary" danger icon={<DeleteOutlined />}></Button>
    </Popconfirm>
  );
};

export default DeleteGallery;