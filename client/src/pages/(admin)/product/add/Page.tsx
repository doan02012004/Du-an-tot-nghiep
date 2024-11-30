/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import CreateProduct from "./_components/CreateProduct";
import FormInfor from "./_components/FormInfor";
import Properties from "./_components/Properties";
import { useEffect, useState } from "react";
import { setAttributes, setColors, setGallerys, SetIsSave, setProductInfor, setSizes } from "../../../../common/redux/features/productSlice";
import { Button, Tabs, TabsProps } from "antd";
import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import TabImage from "./_components/TabImage";
import { Iattribute, Igallery } from "../../../../common/interfaces/product";


const AddProductAdmin = () => {
  const [checkGallerys,setCheckGallerys] = useState(false)
  const [checkAttributes,setCheckAttributes] = useState(false)
  const attributes = useSelector((state: any) => state.product.attributes)
  const gallerys = useSelector((state: any) => state.product.gallerys)
  const isSave = useSelector((state: any) => state.product.isSave)
  const dispath = useDispatch()
  useEffect(() => {
    dispath(setSizes([]))
    dispath(setProductInfor({}))
    dispath(setGallerys([]))
    dispath(setAttributes([]))
    dispath(setColors([]))
    dispath(SetIsSave(false))
  }, [])
  useEffect(() => {
    if(gallerys.length>0){
      setCheckGallerys(!gallerys.some((item: Igallery) => item.check === false))
    }else{
      setCheckGallerys(false)
    }
    if(attributes.length>0){
      setCheckAttributes(!attributes.some((item: Iattribute) => item.isCheck === false))
    }else{
      setCheckAttributes(false)
    }
  },[gallerys,attributes])
  const items: TabsProps['items'] = [
    {
      key: '1',
      label:(
        <span className={`flex items-center ${isSave &&'text-green-600'}`}>Thông tin sản phẩm {isSave && <CheckOutlined className="ml-2" />}</span>
      ),
      children: (<FormInfor />),
    },
    {
      key: '2',
      label: (
        <span className={`flex items-center ${checkAttributes &&'text-green-600'}`}>Thuộc tính {checkAttributes && <CheckOutlined className="ml-2" />}</span>
      ),
      children: (<Properties />),
    },
    {
      key: '3',
      label: (
        <span className={`flex items-center ${checkGallerys &&'text-green-600'}`}>Ảnh sản phẩm {checkGallerys && <CheckOutlined className="ml-2" />}</span>
      ),
      children: (<TabImage />),
    }
  ];
  return (
    <div className=" w-full">
      <div className=" p-3 bg-white">
        <div className="flex items-center justify-between pb-3 mb-3 border-b">
          <h1 className="text-3xl font-bold text-center mb-3 text-indigo">Thêm sản phẩm</h1>
          <div className="flex items-center gap-x-4">
          <CreateProduct />
          <Link to={'/admin/product'} className="block"><Button type="primary" ><LeftOutlined /> Quay Lại</Button></Link>
          </div>
          
        </div>
        <Tabs items={items} />
        {/* <FormInfor />
        <Properties /> */}
      
      </div>
    </div>
  )
}

export default AddProductAdmin