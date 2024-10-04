/* eslint-disable @typescript-eslint/no-explicit-any */
// const color ={
//   _id:"djfhjdhjdh",
//   name:"ĐEN",
//   background:"black"
// }
// const product = {
//   _id: 'dfhjdfhj',
//   categoryId:{
//     _id:'kjdfkdkfj',
//     name:"Áo sơ mi",
//     slug:"ao-so-mi"
//   },
//   name: "Áo sơ mi",
//   price_old: 150000,
//   discount: 10,
//   description: "Mô tả",
//   active: true,
//   featured: true,
//   gender:"unisex",
//   gallerys: [
//     {
//       _id:'hhfdjhdj',
//       colorId:"djfkd",
//       avatar: "http:....",
//       items: [
//         "http://picsum...",
//         "http://picsum...",
//         "http://picsum...",
//         "http://picsum...",
//       ]
//     },
//     {
//       _id:'hhfdjhdj',
//       name: "TRẮNG",
//       background: "black",
//       avatar: "http:....",
//       items: [
//         "http://picsum...",
//         "http://picsum...",
//         "http://picsum...",
//         "http://picsum...",
//       ]
//     },
//   ],
//   attributes:[
//     {
//       _id:'djhjdfhj',
//       size:"M",
//       color:"ĐEN",
//       instock:10
//     },
//     {
//       _id:'djhjdfhj',
//       size:"M",
//       color:"TRẮNG",
//       instock:10
//     },
//     {
//       _id:'djhjdfhj',
//       size:"L",
//       color:"ĐEN",
//       instock:10
//     },
//     {
//       _id:'djhjdfhj',
//       size:"L",
//       color:"TRẮNG",
//       instock:10
//     },
//   ]
// }
//  const order = {
//   productId: 'kdfjkdfjkd',
//   attributeId:'jdfjhdf'
//  }

// import styles
import { useDispatch } from "react-redux";
import CreateProduct from "./_components/CreateProduct";
import FormInfor from "./_components/FormInfor";
import Properties from "./_components/Properties";
import { useEffect } from "react";
import { setAttributes, setColors, setGallerys, SetIsSave, setProductInfor, setSizes } from "../../../../common/redux/features/productSlice";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const AddProductAdmin = () => {
  const dispath = useDispatch()
  useEffect(() => {
    dispath(setSizes([]))
    dispath(setProductInfor({}))
    dispath(setGallerys([]))
    dispath(setAttributes([]))
    dispath(setColors([]))
    dispath(SetIsSave(false))
  }, [])
  return (
    <div className=" w-full h-[580px] overflow-y-scroll">
      <div className=" p-3 bg-white rounded-lg  shadow-sm shadow-gray-700">
        <div className="flex items-center justify-between pb-3 mb-3 border-b">
          <h1 className="text-3xl font-bold text-center mb-3 text-blue">Thêm sản phẩm</h1>
          <Link to={'/admin/product'}><Button type="primary" ><LeftOutlined /> Quay Lại</Button></Link>
        </div>
        <FormInfor />
        <Properties />
        <CreateProduct />
      </div>
    </div>
  )
}

export default AddProductAdmin