/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, InputNumber, InputRef, Radio, Select, Space, Switch } from 'antd'
import React, { useRef, useState } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
const FormInfor = () => {
    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, name]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <Form name="basic" layout="vertical" onFinish={onSubmit} className="">
            <h1 className='font-bold text-xl mb-4 text-center'>Thông tin sản phẩm</h1>
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
                                                onChange={onNameChange}
                                                onKeyDown={(e) => e.stopPropagation()}
                                            />
                                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                Add item
                                            </Button>
                                        </Space>
                                    </>
                                )}
                                options={items.map((item) => ({ label: item, value: item }))}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Giá niêm yết (đ)"
                            name={'price_old'}
                            rules={[{ required: true, message: "Bắt buộc nhập" }]}
                        >
                            <InputNumber className="w-full" />
                        </Form.Item>
                        <div className="flex items-center gap-x-3">
                            <Form.Item
                                label="Giá ưu đãi (đ)"
                                name={'price_new'}
                                className="basis-1/2"
                                rules={[{ required: true, message: "Bắt buộc nhập" }]}
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                            <Form.Item
                                label="Khuyến mại (%)"
                                name={'discount'}
                                className="basis-1/2"
                                rules={[{ required: true, message: "Bắt buộc nhập" }]}
                            >
                                <InputNumber className="w-full" />
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
                                <Radio value="other">Khác</Radio>
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
                        <Button type="primary" htmlType="submit"><SaveOutlined /> Lưu thay đổi</Button>
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
    )
}

export default FormInfor