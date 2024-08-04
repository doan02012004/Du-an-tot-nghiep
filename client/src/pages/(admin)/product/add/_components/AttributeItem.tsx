import { InputNumber } from 'antd'
const AttributeItem = () => {
  return (
    <div className='flex items-center justify-between p-3 border rounded-lg shadow-sm shadow-gray-600 mb-4'>
        <div className='flex items-center gap-x-3'>
            <h1>XANH</h1>
            <h1>M</h1>
        </div>
        <div>
            <InputNumber placeholder='Số lượng kho hàng' />
        </div>
    </div>
  )
}

export default AttributeItem