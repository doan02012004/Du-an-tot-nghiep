import { BarChartOutlined, MessageOutlined, OrderedListOutlined, ProductOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useContext } from 'react'
import { AppContext } from '../../../common/contexts/AppContextProvider'
import { Link } from 'react-router-dom'

const SidebarAdmin = () => {
    const {collapsed} = useContext(AppContext);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
    <div className="demo-logo-vertical" />
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          icon: <BarChartOutlined />,
          label: 'Thống kê',
        },
        {
          key: '2',
          icon: <OrderedListOutlined />,
          label: 'Danh mục',
          children:[
            {
              key:"2.1",
              label:"Danh sách"
            }
          ]
        },
        {
          key: '3',
          icon: <ProductOutlined />,
          label: 'Sản phẩm',
          children:[
            {
              key:"3.1",
              label:<Link to={'/'}>Danh sách</Link>
            }
          ]
        },
        {
          key: '4',
          icon:<UserOutlined />,
          label: 'Người dùng',
          children:[
            {
              key:"4.1",
              label:<Link to={'/'}>Danh sách</Link>
            }
          ]
        },
        {
          key: '5',
          icon:<ShoppingCartOutlined />,
          label: 'Đơn hàng',
          children:[
            {
              key:"4.1",
              label:<Link to={'/'}>Danh sách</Link>
            }
          ]
        },
        {
          key: '6',
          icon:<MessageOutlined />,
          label: 'Tin Nhắn',
        },
      ]}
    />
  </Sider>
  )
}

export default SidebarAdmin