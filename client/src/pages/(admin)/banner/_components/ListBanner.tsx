import { useState } from "react";
import { Table, Space, Button } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import useBannerQuery from "../../../../common/hooks/banner/useBannerQuery";
import EditBanner from "./EditBanner";
import DeleteBanner from "./DeleteBanner";
import { IBanner } from "../../../../common/interfaces/Banner";
import AddBanner from "./AddBanner";

const ListBanner = () => {
  const { data: banners, isLoading } = useBannerQuery();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<IBanner | null>(null);

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
      render: (imageUrl: string) => (
        <img src={imageUrl} alt="Banner" style={{ width: "100px" }} />
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
