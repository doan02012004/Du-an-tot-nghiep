/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { Iattribute, Igallery } from '../../../../../common/interfaces/product'

import useProductMutation from '../../../../../common/hooks/products/useProductMutation'
import useColorQuery from '../../../../../common/hooks/color/useColorQuery'
import { IColor } from '../../../../../common/interfaces/Color'



const CreateProduct = () => {
    const [checkAdd, setCheckAdd] = useState(false)
    const [newColors,setNewColors] = useState([] as IColor[])
    const productMutation = useProductMutation()
    const attributes = useSelector((state:any)=>state.product.attributes)
    const gallerys = useSelector((state:any)=>state.product.gallerys)
    const sizes = useSelector((state:any)=>state.product.sizes)
    const colors = useSelector((state:any)=>state.product.colors)
    const productInfor = useSelector((state:any)=>state.product.productInfor)
    const isSave = useSelector((state:any)=>state.product.isSave)
    const colorQuery = useColorQuery()
    useEffect(()=>{
       if(gallerys.length == 0 || attributes?.length == 0 ){
        setCheckAdd(false)
       }else{
            if(!gallerys?.some((item:Igallery)=> item.check == false) && !attributes?.some((item:Iattribute)=> item.isCheck == false) && isSave){
                setCheckAdd(true)
            }else{
                setCheckAdd(false)
            }
       }
    },[gallerys,attributes,isSave])

    useEffect(()=>{
        const newColor = colorQuery?.data?.filter((item:IColor)=> colors.includes(item._id) )
        setNewColors(newColor)
    },[colors,colorQuery.data])
    const onCreateProduct = () =>{
        if(Object.keys(productInfor).length == 0){
            return message.error("Vui lòng nhập dữ liệu thông tin sản phẩm")
        }
        if(isSave == false) return  message.error("Bạn chưa lưu thay đổi thông tin sản phẩm")
        const check = attributes.some((item:Iattribute) => item.isCheck == false)
        if(check) return message.error("Bạn chưa lưu thay đổi thuộc tính")
        const newProduct = {
            ...productInfor,
            sizes:sizes,
            colors:newColors,
            gallerys:gallerys,
            attributes:attributes
        }
        productMutation.mutate({action:'add',product:newProduct})
    }
  return (
    <div>
    {checkAdd && (<div className='flex justify-center items-end'>
        <Button disabled={productMutation?.isPending} loading={productMutation?.isPending} onClick={onCreateProduct} className='bg-black text-white  mx-auto'><PlusOutlined /> Sản phẩm</Button>
        {productMutation?.isPending && (
            <div className="fixed w-full z-[50] h-full top-0 left-0 bottom-0 right-0 bg-slate-800/30  flex justify-center items-center">
            <LoadingOutlined className="text-7xl text-blue font-light" />
          </div>
        )}
    </div>)}
  </div>
  )
}

export default CreateProduct