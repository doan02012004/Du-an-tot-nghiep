import { Button, Space, Table } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AddColor from "./AddColor";
import EditColor from './EditColor';
import DeleteColor from './DeleteColor';
import { IColor } from "../../../../common/interfaces/Color";
import useColorQuery from "../../../../common/hooks/color/useColorQuery";

const ListColor = () => {
  const colorQuery = useColorQuery();
  const [colors, setColors] = useState<IColor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<IColor | null>(null);
  const [optionForm, setOptionForm] = useState("add");

  useEffect(() => {
    if (colorQuery.data) {
      const newColors = colorQuery.data.map((item: IColor, index: number) => ({
        ...item,
        key: index + 1,
      }));
      setColors(newColors);
    }
  }, [colorQuery.data]);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên màu sắc",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Background",
      dataIndex: "background",
      key: "background",
      render: (background: string) => (
        <div
          className="border rounded-full size-8"
          style={{ background: background }}
        ></div>
      ),
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (color: IColor) => (
        <Space>
          <Button
            className="text-white bg-yellow"
            onClick={() => {
              setCurrentColor(color);
              setOptionForm("update");
              setIsOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <DeleteColor color={color} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        className="mb-3"
        onClick={() => {
          setCurrentColor(null);
          setOptionForm("add");
          setIsOpen(true);
        }}
      >
        <PlusOutlined /> Thêm màu sắc
      </Button>
      <div className="h-[550px] overflow-y-scroll">
        <Table
          loading={colorQuery.isLoading}
          columns={columns}
          dataSource={colors}
        />
      </div>
      {isOpen && optionForm === "add" && (
        <AddColor onClose={() => setIsOpen(false)} />
      )}
      {isOpen && optionForm === "update" && currentColor && (
        <EditColor color={currentColor} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default ListColor;
