import {
  BarChartOutlined,
  BgColorsOutlined,
  CreditCardOutlined,
  ExclamationCircleOutlined,
  FileImageOutlined,
  MessageOutlined,
  OrderedListOutlined,
  PlusOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../../common/contexts/AppContextProvider";

const SidebarAdmin = () => {
  const { collapsed } = useContext(AppContext);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <BarChartOutlined />,
            label: "Thống kê",
          },
          {
            key: "2",
            icon: <OrderedListOutlined />,
            label: "Danh mục",
            children: [
              {
                key: "2.1",
                label: <NavLink to={`/admin/categories`}>Danh mục</NavLink>,
              },
              {
                key: "2.2",
                label: (
                  <NavLink to={`/admin/categories/add`}>Thêm danh mục</NavLink>
                ),
              },
            ],
          },
          {
            key: "3",
            icon: <BgColorsOutlined />,
            label: "Màu sắc",
            children: [
              {
                key: "3.1",
                label: <NavLink to={"/admin/colors"}>Danh sách</NavLink>,
              },
            ],
          },
          {
            key: "4",
            icon: <FileImageOutlined />,
            label: "Banner",
            children: [
              {
                key: "4.1",
                label: <NavLink to={"/admin/banners"}>Danh sách</NavLink>,
              },
            ],
          },
          {
            key: "5",
            icon: <FileImageOutlined />,
            label: "Gallery",
            children: [
              {
                key: "5.1",
                label: <NavLink to={"/admin/gallerys"}>Danh sách</NavLink>,
              },
            ],
          },
          {
            key: "6",
            icon: <ProductOutlined />,
            label: "Sản phẩm",
            children: [
              {
                key: "6.1",
                label: <NavLink to={"/admin/products"}>Danh sách</NavLink>,
              },
              {
                key: "6.2",
                icon: <PlusOutlined />,
                label: <NavLink to={"/admin/products/add"}>Sản phẩm</NavLink>,
              },
            ],
          },
          {
            key: "7",
            icon: <UserOutlined />,
            label: "Người dùng",
            children: [
              {
                key: "7.1",
                label: <Link to={'/admin/auth'}>Danh sách</Link>
              }
            ],
          },
          {
            key: "8",
            icon: <ShoppingCartOutlined />,
            label: "Đơn hàng",
            children: [
              {
                key: "8.1",
                label: <Link to={"/admin/orders"}>Danh sách</Link>,
              },
            ],
          },
          {
            key: "9",
            icon: <CreditCardOutlined />,
            label: 'Voucher & Ship',
            children: [
              {
                key: "9.1",
                label: <Link to={"/admin/vouchers"}>Mã Voucher</Link>,
              },
              {
                key: "9.2",
                label: <Link to={"/admin/ships"}>Phí Ship</Link>,
              }
            ],
          },

          {
            key: "10",
            icon: <MessageOutlined />,
            label: <Link to={"/admin/chat"}>Tin Nhắn</Link>,
          },
          {
            key: "11",
            icon: <ExclamationCircleOutlined />,
            label: <Link to={"/admin/complaint"}>Khiếu nại</Link>,
          },
          {
            key: "12",
            icon: <OrderedListOutlined />,
            label: "Thương Hiệu",
            children: [
              {
                key: "12.1",
                label: <NavLink to={`/admin/brands`}>Thương Hiệu</NavLink>,
              },
              {
                key: "12.2",
                label: (
                  <NavLink to={`/admin/brands/add`}>Thêm thương hiệu</NavLink>
                ),
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default SidebarAdmin;
