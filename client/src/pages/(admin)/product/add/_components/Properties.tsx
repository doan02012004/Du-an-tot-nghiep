/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ColorItem from '../../_components/ColorItem';
import AttributeItem from '../../_components/AttributeItem';
import { Iattribute, Igallery } from '../../../../../common/interfaces/product';
import ChoiceProperties from './ChoiceProperties';
import { useSelector } from 'react-redux';


const Properties = () => {
    const gallerys = useSelector((state: any) => state.product.gallerys)
    const attributes = useSelector((state: any) => state.product.attributes)


    return (
        <div className=''>
            <div className='w-max border-b border-red pr-5 mb-3'>
                <h3 className='text-lg text-red'>Thuộc tính sản phẩm *</h3>
            </div>
            <div className='px-5'>
                {/* Nhập thuộc tính  */}
                <ChoiceProperties />
                {/* Bảng thuộc tính  */}
                <div className=' '>
                    {/* Setup ảnh cho màu sắc  */}
                  {
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
                  }
                    {/* Setup biến thể  */}
                  {
                    attributes?.length > 0 && (
                        <div className='mb-4 '>
                        <h3 className='font-bold text-base mb-2 text-red'>Biến thể *</h3>
                        <div className='grid grid-cols-2 gap-5' >
                            {attributes?.map((attribute: Iattribute, index: number) => (
                                <AttributeItem data={attribute} index={index} key={index} />
                            ))}

                        </div>
                    </div>
                    )
                  }
                </div>
            </div>
        </div>
    );
};

export default Properties