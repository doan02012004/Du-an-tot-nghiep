import { Link, useParams } from "react-router-dom"
import FormInforUpdate from "./_components/FormInforUpdate"
import PropertiesUpdate from "./_components/PropertiesUpdate"
import useProductQuery from "../../../../common/hooks/products/useProductQuery"
import { useEffect, useState } from "react"
import { Iproduct } from "../../../../common/interfaces/product"
import { Button } from "antd"
import { LeftOutlined } from "@ant-design/icons"


const ViewProductAdmin = () => {
    const [product,setProduct] = useState<Iproduct>({} as Iproduct)
    const {id} = useParams()
    const productQuery = useProductQuery(id)
    useEffect(()=>{
        setProduct(productQuery.data)
    },[id,productQuery.data])
  return (
    <div className=" w-full h-[580px] overflow-y-scroll">
        <div className=" p-3 bg-white rounded-lg  shadow-sm shadow-gray-700">
        <div className="flex items-center justify-between pb-3 mb-3 border-b">
          <h1 className="text-3xl font-bold text-center mb-3 text-blue">Chi tiết sản phẩm</h1>
          <Link to={'/admin/products'}><Button type="primary" ><LeftOutlined /> Quay Lại</Button></Link>
        </div>
          <FormInforUpdate product={product} />
          <PropertiesUpdate  product={product} />
        </div>
    </div>
  )
}

export default ViewProductAdmin