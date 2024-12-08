/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { Igallery, Iproduct } from "../../../../../common/interfaces/product";
import ImageExtraUpdate from "./ImageExtraUpdate";
import { IColor } from "../../../../../common/interfaces/Color";
import useProductMutation from "../../../../../common/hooks/products/useProductMutation";
import useAttributeMutation from "../../../../../common/hooks/products/useAttributeMutation";


type ColorItemProps = {
  data: Igallery,
  product: Iproduct
}

const Clound_name = import.meta.env.VITE_CLOUND_NAME;
const preset = import.meta.env.VITE_PRESET;

const ColorItemUpdate = ({ data, product }: ColorItemProps) => {
  const [color, setColor] = useState({} as IColor | any)
  const [loadingGal, setLoadingGal] = useState(false)
  const productMutation = useProductMutation()
  const attributeMutation = useAttributeMutation()
  useEffect(() => {
    const findColor: IColor | undefined = product.colors.find((item: IColor) => item.name == data.name)
    if (findColor) {
      setColor(findColor)
    }
  }, [data, product])
  const handleChangeItems: UploadProps["onChange"] = (info) => {
    if (info.file.status == "uploading") {
      setLoadingGal(true)
    }
    if (info.file.status == "done") {
      productMutation.mutate({ action: 'addImage', optionGallery: { productId: product._id, galleryId: data._id, imageUrl: info.file.response.url } })
      setLoadingGal(false)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoadingGal(false)
    }
  };
  const onDeleteImage = (imageUrl:string) =>{
    const newDataDeleteImage = {
      imageUrl,
      productId:product?._id,
      galleryId:data._id
    }
    attributeMutation.mutate({action:"deleteImage",dataDeleteImage:newDataDeleteImage})
  }
  // const onSave = () => {
  //   if (avatar == '') return message.error('Bạn chưa thêm ảnh đại diện');
  //   if (items.length == 0) return message.error('Bạn chưa thêm ảnh phụ')
  //   const newGallery = {
  //     ...data,
  //     avatar: avatar,
  //     items: items,
  //   }
  //   attributeMutation.mutate({ action: 'updateGallery', gallery: newGallery, productId: product._id })
  // }
  return (
    <div className="w-full bg-white">
      <div className="flex items-center pb-3 border-b gap-x-6 mb-6">
        <div className="flex items-center gap-x-4 ">
          <h3 className="text-base font-semibold m-0">{data.name}</h3>
          <div className="rounded-full size-6 border" style={{ background: color.background }}></div>
        </div>
        {/* upload ảnh phụ  */}
        <Upload
          disabled={data.check}
          multiple
          name="file"
          showUploadList={false}
          action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
          data={{
            upload_preset: preset,
          }}
          onChange={handleChangeItems}
        >
          <Button className="bg-indigo text-white font-semibold" loading={loadingGal} disabled={data.check} icon={<UploadOutlined />}>Thêm ảnh</Button>
        </Upload>
      </div>
      <div className="grid grid-cols-12 gap-3">
        {
          data?.avatar && (
            <div className="col-span-3 min-h-64">
              <ImageExtraUpdate onDeleteImage={onDeleteImage} imageUrl={data?.avatar} type="main" />
            </div>
          )
        }
        {
          data?.items?.map((item: string) => (
            <div className=" col-span-3 min-h-64">
              <ImageExtraUpdate onDeleteImage={onDeleteImage} imageUrl={item} />
            </div>
          ))
        }
      </div>

    </div>
    // <div className="w-full mb-4 border rounded-lg shadow-sm shadow-gray-500">
    //   {/* Tiêu đề  */}
    //   <div
    //     className="flex items-center justify-between p-3 border-b cursor-pointer"
    //   >

    //     {/* tên và màu sắc  */}
    //     <div className="flex items-center gap-x-4">
    //       <h3 className="text-base font-semibold">{data.name}</h3>
    //       <div className="rounded-full size-6 border" style={{ background: color.background }}></div>
    //       {isSave && <CheckCircleOutlined className="text-green-600 text-xl" />}
    //     </div>
    //     {/* icon  */}
    //     <div className="flex items-center gap-x-3">
    //      {isSave == false ?
    //       ( <div className="flex items-center gap-x-3"><Button disabled={loadingAvt? loadingAvt: loadingGal} onClick={()=>{setAvatar(data.avatar);setItems(data.items);setIsSave(true)}} type="primary"><ReloadOutlined />Reset</Button><Button disabled={loadingAvt? loadingAvt: loadingGal} onClick={onSave} type="primary"><SaveOutlined />Cập nhật</Button></div>)
    //       :
    //       ( <Button onClick={()=>{setIsSave(false)}} className="bg-yellow text-white"><EditOutlined /></Button>)}
    //       <Button className="size-8 rounded-full"  onClick={onOpen}><DownOutlined/></Button>
    //     </div>
    //   </div>
    //   {/* Content  */}
    //   <div
    //     ref={divRef}
    //     className="flex h-0 overflow-hidden transition-all duration-300 ease-in-out"
    //   >
    //     {/* ảnh đại diện  */}
    //     <div className="p-5 basis-1/3">
    //       <Upload
    //         disabled={isSave}
    //         showUploadList={false}
    //         action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
    //         data={{
    //           upload_preset: preset,
    //         }}
    //         onChange={handleChangeAvt}
    //         className="block mb-2"
    //       >
    //         <Button loading={loadingAvt} disabled={isSave}  icon={<UploadOutlined />}>Ảnh đại diện</Button>
    //       </Upload>
    //       <div className="overflow-hidden border h-44 w-40 ">
    //         <img
    //           src={avatar}
    //           alt="Ảnh đại diện"
    //           className="object-cover w-full h-full"
    //         />
    //       </div>
    //     </div>
    //     {/* ảnh phụ  */}
    //     <div className="p-5 basis-2/3">
    //       <Upload
    //       disabled={isSave}
    //         multiple
    //         name="file"
    //         showUploadList={false}
    //         action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
    //         data={{
    //           upload_preset: preset,
    //         }}
    //         onChange={handleChangeItems}
    //       >
    //         <Button loading={loadingGal}  disabled={isSave} icon={<UploadOutlined />}>Ảnh phụ</Button>
    //       </Upload>
    //      <ImageExtraUpdate  items={items} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default ColorItemUpdate;
