import { DeleteOutlined, DownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const PropertiesItem = () => {
  return (
    <div className="w-full mb-4 border rounded-lg shadow-sm shadow-gray-500">
          {/* Tiêu đề  */}
          <div
            className="flex items-center justify-between p-3 border-b cursor-pointer"
          >

            {/* tên và màu sắc  */}
            <div className="flex items-center gap-x-4">
              <h3 className="text-base font-semibold">Vàng</h3>
              <div className="rounded-full size-6 border" style={{ background: "yellow" }}></div>
            </div>
            {/* icon  */}
            <div className="flex items-center gap-x-3">
            
              <Button type="primary" danger><DeleteOutlined /></Button>
              <Button className="size-8 rounded-full" ><DownOutlined /></Button>
            </div>
          </div>
          {/* Content  */}
          <div className=" transition-all duration-300 ease-in-out">
                
          </div>
        </div>
  )
}

export default PropertiesItem