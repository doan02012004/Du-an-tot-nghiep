import { Button, Select } from 'antd'
import React, { useState } from 'react'
import ColorItem from './ColorItem';
import AttributeItem from './AttributeItem';

const Properties = () => {
    const [colors, setColors] = React.useState<string[]>([]);
    const [sizes, setSizes] = useState([])
    return (
        <div className='p-5'>
            <h1 className='font-bold text-xl mb-4 text-center'>Thuộc tính</h1>
            {/* Nhập thuộc tính  */}
            <div className='w-max mx-auto flex items-center gap-x-3 mb-4'>
                <Select
                    mode="multiple"
                    value={sizes}
                    className='w-80'
                    onChange={setSizes}
                    placeholder="Vui lòng chọn size"
                    options={[
                        { value: 'S', label: 'S' },
                        { value: 'M', label: 'M' },
                        { value: 'L', label: 'L' },
                        { value: 'XL', label: 'XL' },
                        { value: 'XXL', label: 'XXL' },
                    ]}
                />
                <Select
                    mode="multiple"
                    value={colors}
                    className='w-80'
                    onChange={setColors}
                    placeholder="Vui lòng chọn màu sắc"
                    options={[
                        { value: 'VÀNG', label: 'Vàng' },
                        { value: 'ĐEN', label: 'Đen' },
                        { value: 'TRẮNG', label: 'Trắng' },
                    ]}
                />
                <Button type='primary'>Tạo biến thể</Button>
            </div>
            {/* Bảng thuộc tính  */}
            <div className='flex '>
                {/* Setup ảnh cho màu sắc  */}
                <div className='basis-2/3 px-5 border-r-2 border-r-gray-200 '>
                    <h3>Màu sắc:</h3>
                    <div className='h-[390px] px-4 overflow-y-scroll w-full'>
                        <ColorItem />
                        <ColorItem />
                    </div>
                </div>
                {/* Setup biến thể  */}
                <div className='basis-1/3 px-5'>
                    <h3>Các biến thể:</h3>
                    <div className='h-[390px] px-4 overflow-y-scroll w-full'>
                        <AttributeItem />
                        <AttributeItem />
                        <AttributeItem />
                        <AttributeItem />
                        <AttributeItem />
                        <AttributeItem />
                        <AttributeItem />
                        <AttributeItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Properties