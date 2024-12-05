/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Tabs } from 'antd'
import { useSelector } from 'react-redux';
import ColorItem from '../../_components/ColorItem';
import { Igallery } from '../../../../../common/interfaces/product';
import { CheckOutlined } from '@ant-design/icons';

const TabImage = () => {
    const gallerys = useSelector((state: any) => state.product.gallerys) as Igallery[]
  return (
    <Tabs
    tabPosition='left'
     items={new Array(gallerys.length).fill(null).map((_, i) => {
        const id = String(i);
        return {
          label: (<Button className={`${gallerys[i].check && 'bg-green-500 text-white'}`} icon={(gallerys[i].check&&<CheckOutlined />)}>{gallerys[i].name}</Button>),
          key: id,
          children: (<ColorItem data={gallerys[i]}/>),
        };
      })}
     />
  )
}

export default TabImage