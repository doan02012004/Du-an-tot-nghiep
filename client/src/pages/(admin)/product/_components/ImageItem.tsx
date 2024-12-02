
type Props = {
    type?:'main'|'extra'
    imageUrl: string
}

const ImageItem = ({ imageUrl,type }: Props) => {
    return (
        <div className='w-full h-full relative'>
            <div className="w-full h-full overflow-hidden rounded-md" >
                <img src={imageUrl} className=" cursor-pointer object-cover w-full h-full" alt="" />
            </div>
           {type =='main' && (
             <span className=" absolute -top-3 right-0 text-xs font-semibold text-white bg-indigo rounded-xl px-2 py-1">Ảnh đại diện</span>
           )}
        </div>
    )
}

export default ImageItem