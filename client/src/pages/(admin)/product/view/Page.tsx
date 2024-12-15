import { Link, useParams } from "react-router-dom"
import FormInforUpdate from "./_components/FormInforUpdate"
import PropertiesUpdate from "./_components/PropertiesUpdate"
import useProductQuery from "../../../../common/hooks/products/useProductQuery"
import { useEffect, useState } from "react"
import { Iproduct } from "../../../../common/interfaces/product"
import { Button, Tabs, TabsProps } from "antd"
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons"
import TabImageUpdate from "./_components/TabImageUpdate"
import TabComment from "./_components/TabComment"


const ViewProductAdmin = () => {
    const [product,setProduct] = useState<Iproduct>({} as Iproduct)
    const {slug} = useParams()
    const productQuery = useProductQuery({slug})
    useEffect(()=>{
        setProduct(productQuery.data)
    },[slug,productQuery.data])
    const items: TabsProps['items'] = [
      {
        key: '1',
        label:'Thông tin sản phẩm',
        children: (<FormInforUpdate product={product} />),
      },
      {
        key: '2',
        label:'Quản lý thuộc tính',
        children: (<PropertiesUpdate product={product}/>),
      },
      {
        key: '3',
        label:'Quản lý ảnh',
        children: (<TabImageUpdate product={product} />),
      },
      {
        key: '4',
        label: 'Đánh giá sản phẩm',
        children: (<TabComment productId={product?._id?product._id:''} />),
      }
    ];
  return (
    <>
    { productQuery.isLoading?(
      <div className="w-full h-full flex justify-center items-center">
          <LoadingOutlined className="text-5xl w-max"/>
      </div>
    ):(
       <div className=" w-full ">
       <div className=" p-3 bg-white">
         <div className="flex items-center justify-between pb-3 mb-3 border-b">
           <h1 className="text-3xl font-bold text-center mb-3 text-indigo">Chi tiết sản phẩm</h1>
           <Link to={'/admin/products'} className="block"><Button type="primary" ><LeftOutlined /> Quay Lại</Button></Link>
         </div>
         <Tabs items={items} />
         {/* <FormInfor />
         <Properties /> */}
       
       </div>
     </div>
    )}
    </>
  )
}

export default ViewProductAdmin