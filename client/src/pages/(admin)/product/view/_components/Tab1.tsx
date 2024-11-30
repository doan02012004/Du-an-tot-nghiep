/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Select, Space } from "antd"
import { useEffect, useState } from "react"
import { Iattribute, Iproduct } from "../../../../../common/interfaces/product"
import { IColor } from "../../../../../common/interfaces/Color"
import AttributeItemUpdate from "./AttributeItemUpdate"
import { FilterOutlined } from "@ant-design/icons"

type Tab1Props = {
    product:Iproduct
}
const Tab1 = ({product}:Tab1Props) => {
    const [sizesFillter,setSizesFillter] = useState<string[]>([])
    const [colorsFillter,setColorsFillter] = useState<string[]>([])
    const [check1,setCheck1] = useState(false)
    const [check2,setCheck2] = useState(false)
    const [attributesFillter,setAttributesFillter] = useState<Iattribute[]>([])


    const result = (options:{attibutes:Iattribute[],check1:boolean,check2:boolean,sizesFillter:string[],colorsFillter:string[]}) =>{
        if(sizesFillter?.length>0 && colorsFillter.length>0){
            if(check1){
                const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                    if(sizesFillter.includes(attribute.size) && colorsFillter.includes(attribute.color)&& attribute.instock>0){
                        return true
                    }else{
                        return false
                    }
                })
                return newAttributes
            }else if(check2){
                const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                    if(sizesFillter.includes(attribute.size) && colorsFillter.includes(attribute.color)&& attribute.instock==0){
                        return true
                    }else{
                        return false
                    }
                })
                return newAttributes
            }
            const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                if(sizesFillter.includes(attribute.size) && colorsFillter.includes(attribute.color)&& attribute.instock>0){
                    return true
                }else{
                    return false
                }
            })
           return newAttributes
        }else if(sizesFillter.length>0 && colorsFillter.length==0){
            if(check1){
                const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                    if(sizesFillter.includes(attribute.size) && attribute.instock>0){
                        return true
                    }else{
                        return false
                    }
                })
                return newAttributes
            }else if(check2){
                const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                    if(sizesFillter.includes(attribute.size) && attribute.instock==0){
                        return true
                    }else{
                        return false
                    }
                })
                return newAttributes
            }
            const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                if(sizesFillter.includes(attribute.size)){
                   return true
                }else{
                  return false
                }
            })
            return newAttributes
        }else if(sizesFillter.length==0 && colorsFillter.length>0){
            if(check1){
                const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                    if(colorsFillter.includes(attribute.color) && attribute.instock>0){
                        return true
                    }else{
                        return false
                    }
                })
                return newAttributes
            }else if(check2){
                const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                    if(colorsFillter.includes(attribute.color) && attribute.instock==0){
                        return true
                    }else{
                        return false
                    }
                })
                return newAttributes
            }
            const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                if(colorsFillter.includes(attribute.color)){
                   return true
                }else{
                  return false
                }
            })
            return newAttributes
        }else if( check1|| check2 && sizesFillter.length ==0 && colorsFillter.length == 0){
            if(check1){
                const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                    if(attribute.instock>0){
                        return true
                    }else{
                        return false
                    }
                })
                return newAttributes
            }if(check2){
                const newAttributes = options.attibutes.filter((attribute:Iattribute) =>{
                    if(attribute.instock==0){
                        return true
                    }else{
                        return false
                    }
                })
                return newAttributes
            }
        }
        return options.attibutes
    }
    useEffect(()=>{
        const newAttributes = result({attibutes:product?.attributes,check1,check2,colorsFillter,sizesFillter}) as Iattribute[]
        setAttributesFillter(newAttributes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[check1,check2,sizesFillter,colorsFillter,product])
  return (
    <div>
        {/* fillter  */}
        <div className="flex flex-col mb-4" >
        <Space size={'middle'} className="w-max self-end pb-3 border-b ">
            <Space>
                <Checkbox checked={check1}  onChange={(e) =>{setCheck1(e.target.checked);setCheck2(false)}} />
                <span className="font-semibold">Còn hàng</span>
            </Space>
            <Space>
                <Checkbox checked={check2}  onChange={(e) =>{setCheck2(e.target.checked);setCheck1(false)}} />
                <span className="font-semibold">Hết hàng</span>
            </Space>
                <Select
                style={{minWidth:250}}
                mode="multiple"
                value={sizesFillter}
                placeholder='chọn size...'
                onChange={(data:string[])=> setSizesFillter(data)}
                options={
                    product?.sizes.map((size:string)=>{
                        return {
                            label:size,
                            value:size
                        }
                    })
                }
                />
                 <Select
                style={{minWidth:250}}
                mode="multiple"
                value={colorsFillter}
                placeholder='chọn màu...'
                onChange={(data:string[])=> setColorsFillter(data)}
                options={
                    product?.colors.map((color:IColor)=>{
                        return {
                            label:color.name,
                            value:color.name
                        }
                    })
                }
                />
                <Button onClick={() =>{setColorsFillter([]);setSizesFillter([]);setCheck1(false);setCheck2(false)}} type="primary" icon={<FilterOutlined />} danger>Bỏ Lọc </Button>
        </Space>
        </div>
        <div className="grid grid-cols-12 gap-6 pb-10">
            {attributesFillter?.map((attribute:Iattribute)=>(
                <div key={attribute?._id} className="col-span-6">
                    <AttributeItemUpdate data={attribute} product={product} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Tab1