import { Tabs } from 'antd';
import { Iproduct } from '../../../../../common/interfaces/product';
import ColorItemUpdate from './ColorItemUpdate';

type Props = {
    product:Iproduct
}

const TabImageUpdate = ({product}:Props) => {
  return (
    <Tabs
    tabPosition='left'
     items={new Array(product?.gallerys?.length).fill(null).map((_, i) => {
        const id = String(i);
        return {
          label: ` Màu ${product?.gallerys[i].name}`,
          key: id,
          children: (<ColorItemUpdate data={product?.gallerys[i]} product={product}/>),
        };
      })}
     />
  )
}

export default TabImageUpdate