import { useEffect, useState } from "react";
import useGalleryQuery from "../../../../../common/hooks/gallerys/useGalleryQuery"

const BannerSale = () => {
    const query = useGalleryQuery();
    const [sale,sestale] = useState([]);
    useEffect(()=>{
        if(query.data){
            sestale(query?.data[0])
        }
    },[query.data])
    return (
        <div className=" sticky top-[100px] z-20 bg-white flex justify-center items-center border w-[300px]  border-gray-200 rounded-tl-[32px] rounded-br-[32px] mt-10">
            <img className=" w-[300px]  rounded-tl-[32px] rounded-br-[32px]  object-cover" src={sale.imageUrl} />
        </div>
    )
}

export default BannerSale