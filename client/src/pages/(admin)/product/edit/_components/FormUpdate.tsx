/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, InputNumber, InputRef, message, Radio, Select, Space, Switch } from 'antd'
import React, { useRef, useState } from 'react'
import useCategoryQuery from '../../../../../common/hooks/categories/useCategoryQuery'
import useCategoryMutation from '../../../../../common/hooks/categories/useCategoryMutation'
import { ICategories } from '../../../../../common/interfaces/categories'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

type FormUpdateProps = {
    onStatus: any
}
const FormUpdate = ({onStatus}:FormUpdateProps) => {
    const [form] =Form.useForm()
    const [name, setName] = useState<string>('');
    const inputRef = useRef<InputRef>(null);
    const categoriesQuery = useCategoryQuery()
    const categoriesMutation = useCategoryMutation()
    const onChangePriceNew:any = (priceNew:number) =>{
        const priceOld = form.getFieldValue('price_old')
        if(priceNew > priceOld ){
         form.setFieldValue('price_new', 0)
         return message.error('Vui lòng không nhập cao hơn giá niêm yết')
        }
         if(priceOld){
             const discount = Math.ceil((priceOld - priceNew) / priceOld  * 100)
             form.setFieldValue('discount', discount)
         }
     }
    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
       if(name == ''){
        message.error("Vui lòng nhập dữ liệu !")
       }else{
        categoriesMutation.mutate({action:'add',category:{name:name},isOther:true})
        setName('');
       }
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
  return (
    <div className=' fixed top-0 left-0 z-20 w-full h-full bg-black/45 flex justify-center items-center'>
        <div className='bg-white w-[1200px] p-5 rounded-lg relative'>
            <h1 className='text-lg font-semibold text-center'>Cập nhật thông tin sản phẩm</h1>
            <Button onClick={()=>onStatus(false)} className=' absolute top-2 right-2 size-8 rounded-full'><CloseOutlined /></Button>
            <Form form={form} name="basic" layout="vertical" >
            <div className="flex py-3">
                {/* Thông tin  */}
                <div className="px-5 basis-1/2 ">
                    <div className="grid grid-cols-2 gap-x-4" >
                        <Form.Item
                            label="Tên sản phẩm"
                            name={'name'}
                            rules={[{ required: true, message: "Bắt buộc nhập" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Danh mục sản phẩm"
                            name='categoryId'
                            rules={[{ required: true, message: "Bắt buộc nhập" }]}
                        >
                            <Select
                                loading={categoriesQuery.isLoading?categoriesQuery.isLoading:categoriesMutation.isPending}
                                placeholder="custom dropdown render"
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <Input
                                                placeholder="Please enter item"
                                                ref={inputRef}
                                                value={name}
                                                onChange={(event)=> setName(event.target.value)}
                                                onKeyDown={(e) => e.stopPropagation()}
                                            />
                                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                Add item
                                            </Button>
                                        </Space>
                                    </>
                                )}
                                options={categoriesQuery?.data?.map((item:ICategories) => ({ label:item.name, value: item._id }))}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Giá niêm yết (đ)"
                            name={'price_old'}
                            rules={[{ required: true, message: "Bắt buộc nhập" }]}
                        >
                            <InputNumber className="w-full"/>
                        </Form.Item>
                        <div className="flex items-center gap-x-3">
                            <Form.Item
                                label="Giá ưu đãi (đ)"
                                name={'price_new'}
                                className="basis-1/2"
                                rules={[{ required: true, message: "Bắt buộc nhập" }]}
                            >
                                <InputNumber className="w-full" onChange={onChangePriceNew} />
                            </Form.Item>
                            <Form.Item
                                label="Khuyến mại (%)"
                                name={'discount'}
                                className="basis-1/2"
                                rules={[{ required: true, message: "Bắt buộc nhập" },{type:'number',min:0,message:"Không để giá trị âm"}]}
                            >
                                <InputNumber className="w-full" disabled />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Giới tính"
                            name={'gender'}
                            rules={[{ required: true, message: "Bắt buộc nhập" }]}
                        >
                            <Radio.Group>
                                <Radio value="male">Nam</Radio>
                                <Radio value="female">Nữ</Radio>
                                <Radio value="unisex">Cả nam nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <div className="flex items-center gap-x-3">
                            <Form.Item
                                label="Nổi bật"
                                name={'featured'}
                                className="basis-1/2"
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item
                                label="Hoạt động"
                                name={'active'}
                                className="basis-1/2"
                            >
                                <Switch defaultValue={true} />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"><SaveOutlined /> Cập nhật</Button>
                    </Form.Item>
                </div>
                {/* Mô tả  */}
                <div className="px-5 basis-1/2 w-max ">
                    <Form.Item
                        label="Mô tả sản phẩm"
                        name={'description'}

                    >
                        <ReactQuill className="w-[500px]" />
                    </Form.Item>
                </div>
            </div>
        </Form>
        </div>
    </div>
  )
}

export default FormUpdate
