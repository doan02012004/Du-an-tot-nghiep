import { CloseSquareFilled } from "@ant-design/icons"



type ImageExtraProps = {
  type?:'main'|'extra'|'new'
  imageUrl: string
}
const ImageExtraUpdate = ({ imageUrl,type }: ImageExtraProps) => {
  return (
    <div className='w-full h-full relative '>
            <div className="w-full h-full overflow-hidden rounded-md border" >
                <img src={imageUrl} className=" cursor-pointer object-cover w-full h-full" alt="" />
            </div>
           {type =='main' && (
             <span className=" absolute -top-3 left-0 text-xs font-semibold text-white bg-indigo rounded-xl px-2 py-1">Ảnh đại diện</span>
           )}
            {type =='new' && (
             <span className=" absolute -top-3 left-0 text-xs font-semibold text-white bg-red rounded-xl px-2 py-1">Mới</span>
           )}
          <CloseSquareFilled className=" cursor-pointer absolute top-0 right-0 text-red text-xl hover:text-rose-400" />
    </div>
  )
}

export default ImageExtraUpdate