/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ColorItem from './ColorItem';
import AttributeItem from './AttributeItem';

import { Iattribute, Igallery } from '../../../../../common/interfaces/product';

import useLocalStorage from '../../../../../common/hooks/localstorage/useLocalStorage';
import ChoiceProperties from './ChoiceProperties';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAttributes, setGallerys } from '../../../../../common/redux/features/productSlice';

const Properties = () => {
    const gallerys = useSelector((state:any)=> state.product.gallerys)
    const attributes = useSelector((state:any)=> state.product.attributes)
    const [gallerysLocal, ] = useLocalStorage('gallerys',[])
    const [attributesLocal, ] = useLocalStorage('attributes',[])
    const dispath = useDispatch()
   useEffect(()=>{
       dispath(setGallerys(gallerysLocal))
       dispath(setAttributes(attributesLocal))
   },[])
    return (
        <div className=''>
            <h1 className='font-bold text-xl mb-2 text-center'>Thuộc tính</h1>
            {/* Nhập thuộc tính  */}
            <ChoiceProperties />
            {/* Bảng thuộc tính  */}
            <div className='flex '>
                {/* Setup ảnh cho màu sắc  */}
                <div className='basis-2/3 px-5 border-r-2 border-r-gray-200 '>
                    <h3>Màu sắc:</h3>
                    <div className='h-[350px] px-4 overflow-y-scroll w-full'>
                        {gallerys?.map((item:Igallery,index:number)=>(
                             <ColorItem data={item} key={index} />
                        ))}
                       
                    </div>
                </div>
                {/* Setup biến thể  */}
                <div className='basis-1/3 px-5'>
                    <h3>Các biến thể:</h3>
                    <div className='h-[350px] px-4 overflow-y-scroll w-full'>
                        {attributes?.map((attribute:Iattribute,index:number)=>(
                             <AttributeItem data={attribute} key={index}/>
                        ))}
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Properties