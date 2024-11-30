/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AttributeItem from '../../_components/AttributeItem';
import { Iattribute } from '../../../../../common/interfaces/product';
import ChoiceProperties from './ChoiceProperties';
import { useSelector } from 'react-redux';


const Properties = () => {
    const attributes = useSelector((state: any) => state.product.attributes)

    return (
        <div >
            <div className='px-5'>
                {/* Nhập thuộc tính  */}
                <ChoiceProperties />
                {/* Bảng thuộc tính  */}
                    {/* Setup ảnh cho màu sắc  */}
                  {/* {
                    gallerys.length > 0 && (
                        <div className=' mb-4 '>
                        <h3 className='font-bold text-base mb-2 text-red'>Màu sắc *</h3>
                        <div >
                            {gallerys?.map((item: Igallery, index: number) => (
                                <ColorItem data={item} key={index} />
                            ))}

                        </div>
                    </div>
                    )
                  } */}
                    {/* Setup biến thể  */}
                  {
                    attributes?.length > 0 && (
                        <div className='mb-4 '>
                        <h3 className='font-bold text-base mb-2 text-red'>Biến thể *</h3>
                        <div className='grid grid-cols-4 gap-6' >
                            {attributes?.map((attribute: Iattribute, index: number) => (
                                <AttributeItem data={attribute} index={index} key={index} />
                            ))}

                        </div>
                    </div>
                    )
                  }
            </div>
        </div>
    );
};

export default Properties