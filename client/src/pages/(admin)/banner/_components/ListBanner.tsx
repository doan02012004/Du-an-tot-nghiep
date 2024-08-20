import { useState } from "react";
import { Table, Space, Button, Switch } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import useBannerQuery from "../../../../common/hooks/banner/useBannerQuery";
import useBannerMutation from "../../../../common/hooks/banner/useBannerMutation"; // Import hook mutation
import EditBanner from "./EditBanner";
import DeleteBanner from "./DeleteBanner";
import { IBanner } from "../../../../common/interfaces/Banner";
import AddBanner from "./AddBanner";

const ListBanner = () => {
  const { data: banners, isLoading } = useBannerQuery();
  const bannerMutation = useBannerMutation(); // Sử dụng hook mutation
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<IBanner | null>(null);

  const handleSwitchChange = (banner: IBanner, checked: boolean) => {
    // Cập nhật trạng thái active của banner mà không cần phải mở EditBanner
    bannerMutation.mutate({
      action: "update",
      banner: { ...banner, active: checked },
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (_text: number, _record: IBanner, index: number) => index + 1,
    },
    {
      title: "Chủ đề banner",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Banner",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string, banner: IBanner) =>
        banner.active ? (
          <img src={imageUrl} alt="Banner" style={{ width: "100px" }} />
        ) : (
          <span>Ảnh không hiển thị</span>
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
      title: "Trạng thái",
      key: "active",
      render: (banner: IBanner) => (
        <Switch
          checked={banner.active}
          onChange={(checked) => handleSwitchChange(banner, checked)}
        />
      ),
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (banner: IBanner) => (
        <Space>
          <Button
            className="text-white bg-yellow"
            onClick={() => setEditBanner(banner)}
          >
            <EditOutlined />
          </Button>
          <DeleteBanner banner={banner} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        className="mb-3"
        onClick={() => setIsAddOpen(true)}
      >
        <PlusOutlined /> Thêm Banner
      </Button>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={banners || []}
        rowKey="_id"
      />
      {isAddOpen && <AddBanner onClose={() => setIsAddOpen(false)} />}
      {editBanner && (
        <EditBanner banner={editBanner} onClose={() => setEditBanner(null)} />
      )}
    </div>
  );
};

export default ListBanner;
