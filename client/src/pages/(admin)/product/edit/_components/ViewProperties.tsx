import { Button } from "antd"
import PropertiesItem from "./PropertiesItem"


const ViewProperties = () => {
  return (
    <div className=' overflow-y-scroll h-[530px]'>
      <h1 className='text-lg font-bold text-center mb-3'>Thông tin thuộc tính</h1>
      {/* Thông tin các thuộc tính hiện có  */}
      <div className="flex items-center mb-4 w-max mx-auto">
        <div className="flex items-center mr-4">
          <p className="m-0 font-bold text-sm">Màu:</p>
          <Button disabled className="ml-1">Đen</Button>
          <Button disabled className="ml-1">Đen</Button>
          <Button disabled className="ml-1">Đen</Button>
        </div>
        <div className="flex items-center mr-4">
          <p className="m-0 font-bold text-sm">Size:</p>
          <Button disabled className="ml-1">M</Button>
          <Button disabled className="ml-1">L</Button>
          <Button disabled className="ml-1">XL</Button>
        </div>
      </div>
      <div className="flex items-center w-max mx-auto">
        <Button className="bg-black text-white mx-2">Thêm màu sắc</Button>
        <Button className="bg-black text-white mx-2">Thêm size</Button>
      </div>
      {/* Các biến thể  */}
      <div className="px-3">
        {/* Item biến thể  */}
       <PropertiesItem />
      </div>
    </div>
  )
}

export default ViewProperties