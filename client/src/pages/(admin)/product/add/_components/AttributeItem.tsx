/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputNumber } from 'antd'
import { Iattribute } from '../../../../../common/interfaces/product'
import { useDispatch, useSelector } from 'react-redux'
import { setAttributes } from '../../../../../common/redux/features/productSlice'

type AttributeItemProps = {
  data: Iattribute,
  index:number
}
const AttributeItem = ({data,index}:AttributeItemProps) => {
  const attributes = useSelector((state:any)=> state.product.attributes)
  const dispath = useDispatch()
  const onSetInstock = async(event:any) =>{
    const newAttribute = {...data,instock: parseInt(event.target.value)}
    const newAttributes = attributes.map((item:Iattribute,i:number)=> index == i ? newAttribute : item)
    dispath(setAttributes(newAttributes))
  }
  return (
    <div className='flex items-center justify-between p-3 border rounded-lg shadow-sm shadow-gray-600 mb-4'>
        <div className='flex items-center gap-x-3'>
            <h1>{data.color}</h1>
            <h1>{data.size}</h1>
        </div>
        <div>
            <InputNumber placeholder='Số lượng kho hàng' defaultValue={data.instock} onBlur={onSetInstock} />
        </div>
    </div>
  )
}

export default AttributeItem