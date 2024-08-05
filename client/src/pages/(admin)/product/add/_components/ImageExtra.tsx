
import { Swiper, SwiperSlide } from 'swiper/react'
import {  Igallery } from '../../../../../common/interfaces/product'
import { Navigation } from 'swiper/modules'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import "swiper/css";
type ImageExtraProps = {
    data: Igallery,
    items:string[]
}
const ImageExtra = ({data,items}:ImageExtraProps) => {
  return (
    <div className="relative flex flex-wrap gap-3 px-5 py-8 mt-3 border w-96 min-h-36">
    <Swiper
      modules={[Navigation]}
      slidesPerView={3}
      spaceBetween={20}
      navigation={{
        nextEl: `.btn-next-gallery-${data.colorId.name}`,
        prevEl: `.btn-prev-gallery-${data.colorId.name}`,
      }}
    >
      {items?.map((item: string, index: number) => (
        <SwiperSlide key={index}>
          <div className="w-20 h-24 overflow-hidden border border-dark">
            <img
              src={item}
              alt="Ảnh đại diện"
              className="object-cover w-full h-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    <Button className={`absolute z-10 -translate-y-1/2 rounded-full btn-prev-gallery-${data.colorId.name} top-1/2 -left-3 size-8`}>
      <LeftOutlined />
    </Button>
    <Button className={`absolute z-10 -translate-y-1/2 rounded-full btn-next-gallery-${data.colorId.name} top-1/2 -right-3 size-8`}>
      <RightOutlined />
    </Button>
  </div>
  )
}

export default ImageExtra