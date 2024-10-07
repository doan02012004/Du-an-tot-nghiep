/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Iattribute, Igallery, Iproduct } from '../../../../../common/interfaces/product';
import ChoicePropertiesUpdate from './ChoicePropertiesUpdate';
import ColorItemUpdate from './ColorItemUpdate';
import AttributeItemUpdate from './AttributeItemUpdate';
import AddProperties from './AddProperties';


type PropertiesUpdate = {
    product:Iproduct
}
const PropertiesUpdate = ({product}:PropertiesUpdate) => {
    return (
        <div className=''>
           <div className='w-max border-b border-red pr-5 mb-3'>
                <h3 className='text-lg text-red'>Thuộc tính sản phẩm *</h3>
            </div>
            {/* Nhập thuộc tính  */}
            <ChoicePropertiesUpdate product={product}/>
            <AddProperties product={product}/>
            {/* Bảng thuộc tính  */}
            <div className=' '>
                {/* Setup ảnh cho màu sắc  */}
                <div className=' mb-4 px-5  '>
                <h3 className='font-bold text-base mb-2 text-red'>Màu sắc *</h3>
                    <div >
                        {product?.gallerys?.map((item:Igallery,index:number)=>(
                             <ColorItemUpdate data={item} product={product} key={index} />
                        ))}
                    </div>
                </div>
                {/* Setup biến thể  */}
                <div className='mb-4 px-5'>
                <h3 className='font-bold text-base mb-2 text-red'>Các biến thể *</h3>
                    <div className='grid grid-cols-2 gap-4' >
                        {product?.attributes?.map((attribute:Iattribute,index:number)=>(
                             <AttributeItemUpdate data={attribute} product={product} key={index}/>
                        ))}
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertiesUpdate