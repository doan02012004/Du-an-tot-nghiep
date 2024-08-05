/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { Igallery } from '../../../../../common/interfaces/product'

import useProductMutation from '../../../../../common/hooks/products/useProductMutation'



const CreateProduct = () => {
    const [checkAdd, setCheckAdd] = useState(false)
    const productMutation = useProductMutation()
    const attributes = useSelector((state:any)=>state.product.attributes)
    const gallerys = useSelector((state:any)=>state.product.gallerys)
    const productInfor = useSelector((state:any)=>state.product.productInfor)

    useEffect(()=>{
       if(gallerys.length == 0){
        setCheckAdd(false)
       }else{
        setCheckAdd(!gallerys?.some((item:Igallery)=> item.check == false))
       }
    },[gallerys])
    const onCreateProduct = () =>{
        if(Object.keys(productInfor).length == 0){
            return message.error("Vui lòng nhập dữ liệu thông tin sản phẩm")
        }
        const newGallers = gallerys.map((item:Igallery)=>(
            {
                ...item,
                colorId: item.colorId._id
            }
        ))
        const newProduct = {
            ...productInfor,
            gallerys:newGallers,
            attributes:attributes
        }
        productMutation.mutate({action:'add',product:newProduct})
        console.log(newProduct)
    }
  return (
    <div>
    {checkAdd && ( <Button onClick={onCreateProduct} className='bg-black text-white'><PlusOutlined /> Sản phẩm</Button>)}
  </div>
  )
}

export default CreateProduct