/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsProps } from 'antd';
import { Iproduct } from '../../../../../common/interfaces/product';
import Tab1 from './Tab1';
import AddProperties from './AddProperties';


type PropertiesUpdate = {
    product:Iproduct
}
const PropertiesUpdate = ({product}:PropertiesUpdate) => {
    const items: TabsProps['items'] = [
        {
          key: '1',
          label:'Danh sách thuộc tính',
          children:(<Tab1 product={product} />),
        },
      {
        key: '2',
        label:'Thêm & xóa thuộc tính',
        children:(<AddProperties product={product} />),
      }
      ];
    
    return (
       <Tabs tabPosition='left' items={items} />
    );
};

export default PropertiesUpdate