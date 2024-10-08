/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, InputRef, message, Radio, Select, Space, Switch } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import useCategoryQuery from '../../../../../common/hooks/categories/useCategoryQuery';
import { ICategories } from '../../../../../common/interfaces/categories';
import useCategoryMutation from '../../../../../common/hooks/categories/useCategoryMutation';
import { useDispatch, useSelector } from 'react-redux';
import { SetIsSave, setProductInfor } from '../../../../../common/redux/features/productSlice';
import { Iproduct } from '../../../../../common/interfaces/product';
const FormInfor = () => {
    const [form] = Form.useForm()
    const [name, setName] = useState<string>('');
    const inputRef = useRef<InputRef>(null);
    const categoriesQuery = useCategoryQuery()
    const categoriesMutation = useCategoryMutation()
    const productInfor = useSelector((state: any) => state.product.productInfor)
    const isSave = useSelector((state: any) => state.product.isSave)
    const dispath = useDispatch()
    useEffect(() => {
        form.setFieldsValue(productInfor)
    }, [productInfor, form])
    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        if (name == '') {
            message.error("Vui lòng nhập dữ liệu !")
        } else {
            categoriesMutation.mutate({ action: 'add', category: { name: name }, isOther: true })
            setName('');
        }
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const onSubmit = async (data: Iproduct) => {
        dispath(setProductInfor(data))
        dispath(SetIsSave(true))
        message.success("Bạn đã lưu thay đổi !")
    }
    return (
        <div className='border-b mb-3'>
            <div className='w-max border-b border-red pr-5 mb-3'>
                <h3 className='text-lg text-red'>Thông tin sản phẩm *</h3>
            </div>
          <div className='px-5'>
          {isSave && (
                <div className='w-full mb-2'>
                    <Button onClick={() => dispath(SetIsSave(false))} className='bg-yellow text-white'><EditOutlined />Chỉnh sửa thông tin</Button>
                </div>
            )}
            <Form form={form} name="basic" className='m-0 p-0' layout="vertical" onFinish={onSubmit} disabled={isSave} >
                <div className="py-2">
                    {/* Thông tin  */}
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
                                loading={categoriesQuery.isLoading ? categoriesQuery.isLoading : categoriesMutation.isPending}
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
                                                onChange={(event) => setName(event.target.value)}
                                                onKeyDown={(e) => e.stopPropagation()}
                                            />
                                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                Add item
                                            </Button>
                                        </Space>
                                    </>
                                )}
                                options={categoriesQuery?.data?.map((item: ICategories) => ({ label: item.name, value: item._id }))}
                            />
                        </Form.Item>
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

                    {/* Mô tả  */}
                    <div className=" w-full mx-auto ">
                        <Form.Item
                            label="Mô tả sản phẩm"
                            name={'description'}
                        >
                            <ReactQuill className="w-full" />
                        </Form.Item>
                    </div>
                    <Form.Item >
                        {!isSave && (<Button type="primary" htmlType="submit" ><SaveOutlined />Lưu thay đổi</Button>)}
                    </Form.Item>
                </div>
            </Form>
          </div>

        </div>
    )
}

export default FormInfor