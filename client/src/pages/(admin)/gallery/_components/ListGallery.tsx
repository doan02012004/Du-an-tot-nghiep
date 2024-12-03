import { useState } from "react";
import { Table, Space, Button, Switch, Input } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import useGalleryMutation from "../../../../common/hooks/gallerys/useGalleryMutation";
import useGalleryQuery from "../../../../common/hooks/gallerys/useGalleryQuery";
import { IGallery } from "./../../../../common/interfaces/gallery";
import DeleteGallery from "./DeleteGallery";
import AddGallery from "./AddGallery";
import EditGallery from "./EditGallery";

const ListGallery = () => {
  const { data: gallerys, isLoading } = useGalleryQuery();
  console.log('Gallery data:', gallerys);
  const galleryMutation = useGalleryMutation();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editGallery, setEditGallery] = useState<IGallery | null>(null);
  const [searchText, setSearchText] = useState<string>(''); // State tìm kiếm

  // Xử lý thay đổi tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Lọc gallery theo tên chủ đề
  const filteredGallerys = gallerys?.filter((gallery:any) =>
    gallery.title.toLowerCase().includes(searchText.toLowerCase()) // Lọc theo tên gallery
  );

  const handleSwitchChange = (gallery: IGallery) => {
    galleryMutation.mutate({
      action: "update",
      gallery: { ...gallery, active: !gallery.active },
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (_text: number, _record: IGallery, index: number) => index + 1,
    },
    {
      title: "Chủ đề gallery",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string, record: IGallery) => (
        <a href={record.linkPrd} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt={record.title} style={{ width: "100px" }} />
        </a>
      ),
    },
    {
      title: "Link sản phẩm",
      dataIndex: "linkPrd",
      key: "linkPrd",
      render: (linkPrd: string) => (
        <a href={linkPrd} target="_blank" rel="noopener noreferrer">
          {linkPrd}
        </a>
      ),
    },
    {
      title: "Hoạt động",
      dataIndex: "active",
      key: "active",
      render: (active: boolean, gallery: IGallery) => (
        <Switch checked={active} onChange={() => handleSwitchChange(gallery)} />
      ),
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (gallery: IGallery) => (
        <Space>
          <Button
            className="text-white bg-yellow"
            onClick={() => setEditGallery(gallery)}
          >
            <EditOutlined />
          </Button>
          <DeleteGallery gallery={gallery} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        {/* Form tìm kiếm */}
        <div className="mb-3">
          <Input
            type="text"
            placeholder="Tìm kiếm chủ đề gallery"
            style={{ width: "300px" }}
            value={searchText}
            onChange={handleSearch} // Lắng nghe sự kiện thay đổi
          />
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="mb-3"
          onClick={() => setIsAddOpen(true)}
        >
          Thêm Gallery
        </Button>
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={filteredGallerys || []} // Sử dụng danh sách gallery đã lọc
        rowKey="_id"
      />
      {isAddOpen && <AddGallery onClose={() => setIsAddOpen(false)} />}
      {editGallery && (
        <EditGallery
          gallery={editGallery}
          onClose={() => setEditGallery(null)}
        />
      )}
    </div>
  );
};

export default ListGallery;