/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EditOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { Igallery } from "../../../../common/interfaces/product";
import { useDispatch, useSelector } from "react-redux";
import { setGallerys } from "../../../../common/redux/features/productSlice";
import ImageItem from "./ImageItem";

type ColorItemProps = {
  data: Igallery
}

const Clound_name = import.meta.env.VITE_CLOUND_NAME;
const preset = import.meta.env.VITE_PRESET;

const ColorItem = ({ data }: ColorItemProps) => {
  const [avatar, setAvatar] = useState<string>("");
  const [items, setItems] = useState([] as any);
  const [loadingAvt, setLoadingAvt] = useState(false)
  const [loadingGal, setLoadingGal] = useState(false)
  const gallerys = useSelector((state: any) => state.product.gallerys)
  const dispath = useDispatch()
  useEffect(() => {
    setAvatar(data.avatar)
    setItems(data.items)
  }, [data])
  const handleChangeAvt: UploadProps["onChange"] = (info) => {
    if (info.file.status == "uploading") {
      setLoadingAvt(true)
    }
    if (info.file.status == "done") {
      setAvatar(info.file.response.url)
      setLoadingAvt(false)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoadingAvt(false)
    }
  };
  const handleChangeItems: UploadProps["onChange"] = (info) => {
    if (info.file.status == "uploading") {
      setLoadingGal(true)
    }
    if (info.file.status == "done") {
      setItems([...items, info.file.response.url]);
      setLoadingGal(false)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoadingGal(false)
    }
  };
  const onEdit = () => {
    const newGallery = {
      ...data,
      check: false
    }
    const newGallers = gallerys.map((item: Igallery) => item.name == data.name ? newGallery : item);
    dispath(setGallerys(newGallers))
  }
  const onSave = () => {
    if (avatar == '') return message.error('Bạn chưa thêm ảnh đại diện');
    if (items.length == 0) return message.error('Bạn chưa thêm ảnh phụ')
    const newGallery = {
      ...data,
      avatar: avatar,
      items: items,
      check: true
    }
    const newGallers = gallerys.map((item: Igallery) => item.name == data.name ? newGallery : item);
    dispath(setGallerys(newGallers))
  }
  return (
    <div className="w-full bg-white">
      <div className="flex items-center gap-x-6 mb-6">
        <div className="flex items-center gap-x-4 ">
          <h3 className="text-base font-semibold m-0">{data.name}</h3>
          <div className="rounded-full size-6 border" style={{ background: data.background }}></div>
        </div>
        {/* upload ảnh đại diện  */}
        <Upload
          disabled={data.check}
          showUploadList={false}
          action={`https://api.cloudinary.com/v1_1/${Clound_name}/image/upload`}
          data={{
            upload_preset: preset,
          }}
          onChange={handleChangeAvt}
        >
          <Button className="bg-indigo text-white font-semibold" loading={loadingAvt} disabled={data.check} icon={<UploadOutlined />}>Avatar</Button>
        </Upload>
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
          beforeUpload={() => setItems([])}
        >
          <Button className="bg-indigo text-white font-semibold" loading={loadingGal} disabled={data.check} icon={<UploadOutlined />}>Ảnh phụ</Button>
        </Upload>
        {!data?.check ?
          (
            <Button disabled={loadingAvt ? loadingAvt : loadingGal} onClick={onSave} type="primary" icon={<SaveOutlined />}>Lưu</Button>
          ) : (
            <Button onClick={onEdit} type="primary" danger icon={<EditOutlined />}>Chỉnh sửa</Button>
          )}
      </div>
      <div className="grid grid-cols-12 gap-3">
        {
          avatar !== '' && (
            <div className="col-span-3 min-h-64">
              <ImageItem imageUrl={avatar} type="main" />
            </div>
          )
        }
        {
          items?.map((item:string) => (
            <div className=" col-span-3 min-h-64">
              <ImageItem imageUrl={item} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ColorItem;
