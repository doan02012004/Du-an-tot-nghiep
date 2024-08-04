/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Clound_name = "dsko2bveh";
const preset = "demo0201";

const ColorItem = () => {
  const [avatar, setAvatar] = useState<string>("");
  const [items, setItems] = useState([] as any);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const divRef = useRef<any>();
  useEffect(() => {
    setMaxHeight(divRef.current.scrollHeight);
  }, []);
  const onOpen = () => {
    if (divRef.current.style.height == "0px" || !divRef.current.style.height) {
      divRef.current.style.height = maxHeight + "px";
    } else {
      divRef.current.style.height = 0 + "px";
    }
  };
  const handleChangeAvt: UploadProps["onChange"] = (info) => {
    if (info.file.status == "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status == "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setAvatar(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const handleChangeItems: UploadProps["onChange"] = (info) => {
    if (info.file.status == "uploading") {
      // console.log(info.file, info.fileList);
      setItems([]);
    }
    if (info.file.status == "done") {
      setItems([...items, info.file.response.url]);
      message.success(`${info.file.name} file uploaded successfully`);
      // Cập nhật fileList chỉ chứa những file mới
      // setItems(items.filter(file => !file.originFileObj));
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  console.log(items);
  return (
    <div className="w-full mb-4 border rounded-lg shadow-sm shadow-gray-500">
      {/* Tiêu đề  */}
      <div
        onClick={onOpen}
        className="flex items-center justify-between p-3 border-b cursor-pointer"
      >
        {/* tên và màu sắc  */}
        <div className="flex items-center gap-x-4">
          <h3 className="text-base font-semibold">Vàng</h3>
          <div className="rounded-full size-6 bg-yellow"></div>
        </div>
        {/* icon  */}
        <DownOutlined className="" />
      </div>
      {/* Content  */}
      <div
        ref={divRef}
        className="flex h-0 overflow-hidden transition-all duration-300 ease-in-out"
      >
        {/* ảnh đại diện  */}
        <div className="flex-shrink-0 p-5 basis-1/3">
          <Upload
            showUploadList={false}
            action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
            data={{
              upload_preset: preset,
            }}
            onChange={handleChangeAvt}
          >
            <Button icon={<UploadOutlined />}>Ảnh đại diện</Button>
          </Upload>
          <div className="mt-3 overflow-hidden border h-44 w-36 ">
            <img
              src={avatar}
              alt="Ảnh đại diện"
              className="object-cover w-full h-full"
            />
            {/* <LoadingOutlined className="text-xl"/> */}
          </div>
        </div>
        {/* ảnh phụ  */}
        <div className="p-5 basis-2/3">
          <Upload
            multiple
            name="file"
            showUploadList={false}
            action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
            data={{
              upload_preset: preset,
            }}
            onChange={handleChangeItems}
            // beforeUpload={handleBeforeUpload}
          >
            <Button icon={<UploadOutlined />}>Ảnh phụ</Button>
          </Upload>
          <div className="relative flex flex-wrap gap-3 px-5 py-8 mt-3 border w-96 min-h-36">
            <Swiper
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={20}
              navigation={{
                nextEl: ".btn-next-gallery",
                prevEl: ".btn-prev-gallery",
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
            <Button className="absolute z-10 -translate-y-1/2 rounded-full btn-prev-gallery top-1/2 -left-3 size-8">
              <LeftOutlined />
            </Button>
            <Button className="absolute z-10 -translate-y-1/2 rounded-full btn-next-gallery top-1/2 -right-3 size-8">
              <RightOutlined />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorItem;
