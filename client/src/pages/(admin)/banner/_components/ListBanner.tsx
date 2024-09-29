import { useState } from "react";
import { Table, Space, Button, Switch } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import useBannerQuery from "../../../../common/hooks/banners/useBannerQuery";
import useBannerMutation from "../../../../common/hooks/banners/useBannerMutation";
import EditBanner from "./EditBanner";
import DeleteBanner from "./DeleteBanner";
import AddBanner from "./AddBanner";

import { IBanner } from "./../../../../common/interfaces/banner";

const ListBanner = () => {
  const { data: banners, isLoading } = useBannerQuery();
  const bannerMutation = useBannerMutation();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<IBanner | null>(null);

  const handleSwitchChange = (banner: IBanner) => {
    bannerMutation.mutate({
      action: "update",
      banner: { ...banner, active: !banner.active },
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
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string, record: IBanner) => (
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
      render: (active: boolean, banner: IBanner) => (
        <Switch checked={active} onChange={() => handleSwitchChange(banner)} />
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
        icon={<PlusOutlined />}
        className="mb-3"
        onClick={() => setIsAddOpen(true)}
      >
        Thêm Banner
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