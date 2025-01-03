import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import  { useContext } from 'react'
import { AppContext } from '../../../common/contexts/AppContextProvider'
import { Link } from 'react-router-dom'

const HeaderAdmin = () => {
    const {collapsed, setCollapsed,colorBgContainer} = useContext(AppContext);
  return (
      <Header style={{ padding: 0, background: colorBgContainer }} className=' sticky top-0 z-50'>
       
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
             <Link className='float-right mx-2' to={'/'} ><Button type='primary'>Quay lại trang chủ</Button></Link>
          </Header>
    )
  }

export default HeaderAdmin