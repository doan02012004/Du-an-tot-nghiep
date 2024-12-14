/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { useContext, useEffect, useRef, useState } from 'react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Igallery, Iproduct } from '../../../../common/interfaces/product';
import { AppContext } from '../../../../common/contexts/AppContextProvider';

type Props = {
    product:Iproduct|null
}

const Slider_product_details = ({product}: Props) => {
    const { choiceColor } = useContext(AppContext);
    const [gallery, setGallery] = useState<string[]>([]);
    const imageRef = useRef(null as any)

    useEffect(() => {
        if (product && product.gallerys) {
            const handleColorChange = () => {
                const color = choiceColor;
                const galleryItem = product?.gallerys.find((item:Igallery) => item.name == color)
                if (galleryItem) {
                    const items = Array.isArray(galleryItem.items) ? galleryItem.items : [];
                    setGallery([galleryItem.avatar, ...items]);
                }
                
            };

            handleColorChange();
            if(imageRef && imageRef.current.swiper){
                imageRef.current.swiper.slideTo(0)
            }
        }
    }, [choiceColor, product]); // Đảm bảo thêm các phụ thuộc
    const onChangeImage = (index:number) =>{
        if(imageRef && imageRef.current.swiper){
            imageRef.current.swiper.slideTo(index)
        }
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', ()=>{
            setIsMobile(window.innerWidth)
        })
    }, []);

  return (
    <>
        <div className='lg:flex lg:justify-between'>
                        <div className='w-full lg:w-[485px] lg:h-[729px]'>
                                <Swiper
                                            modules={[Navigation, Pagination,EffectFade]}
                                            effect='fade'
                                            slidesPerView={1}
                                            navigation
                                            ref={imageRef}
                                        >
                                            {gallery?.map((item,index)=>(
                                                <SwiperSlide key={index} className=''>
                                                <div className=''>
                                                    <img src={item} className='object-cover w-full h-full' />
                                                </div>
                                            </SwiperSlide>
                                            ))}
                                            {/* <SwiperSlide className=''>
                                                <div className=''>
                                                    <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2023/08/04/95437d1b09113b992ad2496ee3e3e3f8.webp" className='object-cover w-full h-full' />
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className=''>
                                                <div className=''>
                                                    <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/04/04/dc06923d4097dc13f365dcf7c21180a4.webp" className='object-cover w-full h-full' />
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className=''>
                                                <div className=''>
                                                    <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/04/04/dc06923d4097dc13f365dcf7c21180a4.webp" className='object-cover w-full h-full' />
                                                </div>
                                            </SwiperSlide> */}
                                </Swiper>
                        </div>
                        {/* --------------------------------------------------------- */}
                        <div className='lg:h-[729px] mt-4 lg:mt-0'>
                            <button className='swiper-gallery-prev cursor-pointer pt-1 pl-[50px] pb-[37px] hidden lg:block  bg-white'><i className="fa-solid fa-chevron-up text-[20px]"></i></button>
                            <Swiper
                                                modules={[Navigation]}
                                                pagination={{
                                                    clickable: true,
                                                }}
                                                navigation={{
                                                    prevEl:'.swiper-gallery-prev ',
                                                    nextEl:'.swiper-gallery-next'
                                                }}
                                                direction={isMobile <=1024 ? 'horizontal':'vertical'}
                                                slidesPerView={4}
                                                spaceBetween={9}
                                                breakpoints={{
                                                    576:{
                                                        slidesPerView:4,
                                                        spaceBetween:9
                                                    },
                                                    0:{
                                                        slidesPerView:4,
                                                        spaceBetween:8
                                                    }
                                                }}
                                                className='lg:h-[604px]'
                                                
                                            >
                                                {gallery?.map((item,index)=>(
                                                    <SwiperSlide key={index}>
                                                        <div className='lg:w-[95px] lg:h-[142px]'>
                                                            <img src={item} onClick={()=> onChangeImage(index)} className='object-cover w-full h-full' />
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                                {/* <SwiperSlide>
                                                    <div className='lg:w-[95px] lg:h-[142px]'>
                                                        <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/04/04/dc06923d4097dc13f365dcf7c21180a4.webp" className='object-cover w-full h-full' />
                                                      </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className='lg:w-[95px] lg:h-[142px]'>
                                                        <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/04/04/dc06923d4097dc13f365dcf7c21180a4.webp" className='object-cover w-full h-full' />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className='lg:w-[95px] lg:h-[142px]'>
                                                        <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/04/04/dc06923d4097dc13f365dcf7c21180a4.webp" className='object-cover w-full h-full' />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className='lg:w-[95px] lg:h-[142px]'>
                                                        <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/04/04/dc06923d4097dc13f365dcf7c21180a4.webp" className='object-cover w-full h-full' />
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <div className='lg:w-[95px] lg:h-[142px]'>
                                                        <img src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/04/04/dc06923d4097dc13f365dcf7c21180a4.webp" className='object-cover w-full h-full' />
                                                    </div>
                                                </SwiperSlide> */}
                            </Swiper>
                            <button className='swiper-gallery-next cursor-pointer pl-[50px] pt-[37px] hidden bg-white lg:block'><i className="fa-solid fa-chevron-down text-[20px]"></i></button>
                        </div>
                    </div>
    </>
  )
}

export default Slider_product_details