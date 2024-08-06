import { Tabs, TabsProps } from "antd";
import ViewInfor from "./_components/ViewInfor";
import ViewColor from "./_components/ViewColor";
import ViewProperties from "./_components/ViewProperties";


const UpdateProduct = () => {
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Thông tin sản phẩm',
          children: <ViewInfor />,
        },
        {
          key: '2',
          label: 'Màu sắc',
          children: <ViewColor />,
        },
        {
          key: '3',
          label: 'Các biến thể',
          children: <ViewProperties />,
        },
      ];
  return (
    <Tabs type="card" defaultActiveKey="1" items={items}  />
  )
}

export default UpdateProduct