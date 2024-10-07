/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, InputNumber, message } from 'antd'
import { Iattribute } from '../../../../common/interfaces/product'
import { useDispatch, useSelector } from 'react-redux'
import { setAttributes } from '../../../../common/redux/features/productSlice'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

type AttributeItemProps = {
  data: Iattribute,
  index: number
}
const AttributeItem = ({ data, index }: AttributeItemProps) => {
  const [form] = Form.useForm()
  const attributes = useSelector((state: any) => state.product.attributes)
  const dispath = useDispatch()
  useEffect(()=>{
    if(data){
      form.setFieldsValue(data)
    }
  },[data,form,index])
  const onSetInstock = async (event: any) => {
    if (parseInt(event.target.value) < 0 || isNaN(event.target.value) || event.target.value == null || event.target.value == '') {
      form.setFieldValue('instock', 0)
      return message.error("Vui lòng nhập số lượng hợp lệ")
    }
    if (parseInt(event.target.value) == data.instock) return
    const newAttribute = { ...data, instock: parseInt(event.target.value) }
    const newAttributes = attributes.map((item: Iattribute, i: number) => index == i ? newAttribute : item)
    dispath(setAttributes(newAttributes))
  }
  const onChangePriceNew: any = (priceNew: number) => {
    const priceOld = form.getFieldValue('price_old')
    console.log("Price old >", priceOld)
    if (priceNew > priceOld) {
      form.setFieldValue('price_new', 0)
      return message.error('Vui lòng không nhập cao hơn giá niêm yết')
    }
    if (priceOld) {
      const discount = Math.ceil((priceOld - priceNew) / priceOld * 100)
      form.setFieldValue('discount', discount)
    }
  }
const onOpenForm = () =>{
  const newData = {...data, isCheck:false}
    const newAttributes = attributes.map((item: Iattribute, i: number) => index == i ? newData : item)
    dispath(setAttributes(newAttributes))
}
  const onSubmit = (newAttribute:Iattribute) =>{
    const newData = {...newAttribute,size:data.size,color:data.color, isCheck:true}
    const newAttributes = attributes.map((item: Iattribute, i: number) => index == i ? newData : item)
    dispath(setAttributes(newAttributes))
  }
  return (
    <>
      {/* new componet */}
      <div className={`${ data?.isCheck && 'border-green-500' } p-3 border rounded-lg shadow-sm shadow-gray-600 mb-4 bg-white`}>
        <div className='flex items-center justify-between pb-3 border-b '>
          <h1>{data?.color}, {data?.size}</h1>
         {data?.isCheck && (
          <div className='flex items-center gap-x-2'>
            <Button onClick={onOpenForm} className='bg-yellow'><EditOutlined /></Button>
            <CheckOutlined className='text-green-600 text-2xl' />
          </div>
         )}
        </div>
        <div className=''>
          <Form
            layout='vertical'
            form={form}
            onFinish={onSubmit}
            disabled={data?.isCheck}
          >
            <div className='grid grid-cols-4 gap-4'>
              <Form.Item
                name="price_old"
                label="Giá niêm yết"
                rules={[{ required: true }, { type: "number", min: 1 }]}
              >
                <InputNumber className='w-full' />
              </Form.Item>
              <Form.Item
                name="price_new"
                label="Giá khuyến mãi"
                rules={[{ required: true }, { type: "number", min: 1 }]}
              >
                <InputNumber className='w-full' onChange={onChangePriceNew} />
              </Form.Item>
              <Form.Item
                name="discount"
                label="Giảm giá (%)"
                rules={[{ required: true }, { type: "number", min: 0 }]}
              >
                <InputNumber className='w-full' disabled />
              </Form.Item>
              <Form.Item
                name="instock"
                label="SL kho"
                rules={[{ required: true }, { type: "number", min: 0}]}
              >
                <InputNumber className='w-full' placeholder='số lượng kho' />
              </Form.Item>
            </div>
            <Form.Item>
                <Button type="primary" htmlType='submit' className=" float-end">Lưu</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* old component 
        <div className='flex items-center justify-between p-3 border rounded-lg shadow-sm shadow-gray-600 mb-4 bg-white'>
      <div className='flex items-center gap-x-3'>
        <h1>{data.color}</h1>
        <h1>{data.size}</h1>
      </div>
      <div>
        <Form form={form}>
          <Form.Item className='m-0 p-0' name='instock' rules={[{ type: 'number', min: 0 }]}>
            <InputNumber placeholder='Số lượng kho hàng' defaultValue={data.instock} onBlur={onSetInstock} />
          </Form.Item>
        </Form>
      </div>
    </div> */}
    </>

  )
}

export default AttributeItem