/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, InputNumber, message } from 'antd'
import { Iattribute, Iproduct } from '../../../../../common/interfaces/product'
import useAttributeMutation from '../../../../../common/hooks/products/useAttributeMutation'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

type AttributeItemProps = {
    data: Iattribute,
    product: Iproduct
}
const AttributeItemUpdate = ({ data, product }: AttributeItemProps) => {
    const [form] = Form.useForm()
    const attributeMutation = useAttributeMutation()
    useEffect(() => {
        if (data) {
            form.setFieldsValue(data)
        }
    }, [data, form])
    // const onSetInstock = (event: any) => {
    //     if (parseInt(event.target.value) < 0 || isNaN(event.target.value) || event.target.value == null || event.target.value == '') {
    //         form.setFieldValue('instock', data.instock)
    //         return message.error("Vui lòng nhập số lượng hợp lệ")
    //     }
    //     if (parseInt(event.target.value) == data.instock) return
    //     const newAttribute = { ...data, instock: parseInt(event.target.value) }
    //     attributeMutation.mutate({ action: 'updateAtb', productId: product._id, attribute: newAttribute })
    // }
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
    const onSubmit = (newAttribute: Iattribute) => {
        const newData = { ...newAttribute, size: data.size, color: data.color, _id: data._id }
        attributeMutation.mutate({ action: 'updateAtb', productId: product._id, attribute: newData })
    }
    return (
        <>
            {/* new componet */}
            <div className={`${data?.isCheck && 'border-green-500'} p-3 border rounded-lg shadow-sm shadow-gray-600 mb-4 bg-white`}>
                <div className='flex items-center justify-between pb-3 border-b '>
                    <h1>{data?.color}, {data?.size}</h1>
                </div>
                <div className=''>
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={onSubmit}
                        disabled={data?.isCheck}
                    >
                        <div className='grid grid-cols-2 gap-4'>
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
                                name="weight"
                                label="Khối lượng (gram)"
                                rules={[{ required: true }, { type: "number", min: 0 }]}
                            >
                                <InputNumber className='w-full' />
                            </Form.Item>
                            <Form.Item
                                name="instock"
                                label="SL kho"
                                rules={[{ required: true }, { type: "number", min: 0 }]}
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
            {/* old components  */}
            {/* <div className={`flex items-center justify-between bg-white p-3 border  rounded-lg shadow-sm shadow-gray-600 mb-4 ${data.instock == 0 ? ' border-red shadow-red' : 'shadow-gray-600'}`}>
                <div className='flex items-center gap-x-3'>
                    <h3 className='text-[12px]/[150%] font-semibold'>{data.color}</h3>
                    <h3 className='text-[12px]/[150%] font-semibold'>{data.size}</h3>
                </div>
                <div>
                    <Form form={form}>
                        <Form.Item name={'instock'} className='m-0 p-0'>
                            <InputNumber placeholder='Số lượng kho hàng' defaultValue={data.instock} onBlur={onSetInstock} />
                        </Form.Item>
                    </Form>
                </div>
            </div> */}

        </>
    )
}

export default AttributeItemUpdate