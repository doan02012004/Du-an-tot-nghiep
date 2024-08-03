/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined, LeftOutlined, RightOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, message, Upload, UploadProps } from "antd"
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Clound_name = 'dsko2bveh';
const preset = 'demo0201';

const ColorItem = () => {
    const [avatar, setAvatar] = useState<string>('')
    const [items, setItems] = useState([] as any)
    const [maxHeight, setMaxHeight] = useState<number|null>(null)
    const divRef = useRef<any>()
    useEffect(() => {
        setMaxHeight(divRef.current.scrollHeight)
    }, [])
    const onOpen = () => {

        if (divRef.current.style.height == '0px' || !divRef.current.style.height) {
            divRef.current.style.height = maxHeight + 'px'
        } else {
            divRef.current.style.height = 0 + "px"
        }
    }
    const handleChangeAvt: UploadProps['onChange'] = (info) => {
        if (info.file.status == 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (info.file.status == 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setAvatar(info.file.response.url)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    const handleChangeItems: UploadProps['onChange'] = (info) => {

        if (info.file.status == 'uploading') {
            // console.log(info.file, info.fileList);
            setItems([])
        }
        if (info.file.status == 'done') {
            setItems([...items, info.file.response.url])
            message.success(`${info.file.name} file uploaded successfully`);
            // Cập nhật fileList chỉ chứa những file mới
            // setItems(items.filter(file => !file.originFileObj));
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

    }
    console.log(items)
    return (
        <div className='w-full rounded-lg border shadow-sm shadow-gray-500 mb-4'>
            {/* Tiêu đề  */}
            <div onClick={onOpen} className='cursor-pointer flex items-center justify-between p-3 border-b'>
                {/* tên và màu sắc  */}
                <div className="flex items-center gap-x-4">
                    <h3 className='font-semibold text-base'>Vàng</h3>
                    <div className='size-6 rounded-full bg-yellow'></div>
                </div>
                {/* icon  */}
                <DownOutlined className="" />
            </div>
            {/* Content  */}
            <div ref={divRef} className='flex h-0 overflow-hidden transition-all duration-300 ease-in-out'>
                {/* ảnh đại diện  */}
                <div className='basis-1/3 p-5 flex-shrink-0'>
                    <Upload
                        showUploadList={false}
                        action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
                        data={{
                            upload_preset: preset
                        }}
                        onChange={handleChangeAvt}
                    >
                        <Button icon={<UploadOutlined />}>Ảnh đại diện</Button>
                    </Upload>
                    <div className="h-44 w-36 overflow-hidden border mt-3 ">
                        <img src={avatar} alt="Ảnh đại diện" className="w-full h-full object-cover" />
                        {/* <LoadingOutlined className="text-xl"/> */}
                    </div>

                </div>
                {/* ảnh phụ  */}
                <div className='basis-2/3 p-5'>
                    <Upload
                        multiple
                        name="file"
                        showUploadList={false}
                        action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
                        data={{
                            upload_preset: preset
                        }}
                        onChange={handleChangeItems}
                    // beforeUpload={handleBeforeUpload}
                    >
                        <Button icon={<UploadOutlined />}>Ảnh phụ</Button>
                    </Upload>
                    <div className="w-96 min-h-36 px-5 py-8 border flex flex-wrap gap-3 mt-3 relative">
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={3}
                            spaceBetween={20}
                            navigation={{
                                nextEl:'.btn-next-gallery',
                                prevEl:'.btn-prev-gallery'
                            }}
                            
                        >
                            {items?.map((item: string, index: number) => (
                                <SwiperSlide key={index}>
                                    <div className="h-24 w-20 overflow-hidden border border-dark" >
                                        <img src={item} alt="Ảnh đại diện" className="w-full h-full object-cover" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Button className=" btn-prev-gallery absolute top-1/2 z-10 -left-3 -translate-y-1/2 size-8 rounded-full"><LeftOutlined /></Button>
                        <Button className=" btn-next-gallery absolute top-1/2 z-10 -right-3 -translate-y-1/2 size-8 rounded-full"><RightOutlined /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorItem