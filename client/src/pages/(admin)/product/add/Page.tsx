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

// import styles
import { Tabs } from "antd";
import FormInfor from "./_components/FormInfor";
import Properties from "./_components/Properties";

const AddProductAdmin = () => {
  const items = [
    {
      key: '1',
      label: 'Thông tin sản phẩm',
      children: <FormInfor />
    },
    {
      key: '2',
      label: 'Thêm màu sắc',
      children: <Properties />,
    },
    
  ]
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
   <Tabs items={items} defaultActiveKey="1" onChange={onChange} />
  )
}

export default AddProductAdmin