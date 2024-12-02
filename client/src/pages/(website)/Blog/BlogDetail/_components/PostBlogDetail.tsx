import { useParams } from "react-router-dom";
import useBlogQuery from "../../../../../common/hooks/blog/useBlogQuery";
import { useEffect, useState } from "react";
import { IBlog } from "../../../../../common/interfaces/blog";

const PostBlogDetail = () => {
    const {id} = useParams()
    const query = useBlogQuery(id);
    const [blogdetail,setblogdetail] = useState<IBlog>({});
    useEffect(()=>{
        if(query){
            setblogdetail(query)
        }
    },[query])
    // Định dạng ngày
    const formattedDate = blogdetail.updatedAt ? new Date(blogdetail.updatedAt).toLocaleDateString() : 'Ngày cập nhật không có';
  return (
    <div className="px-[15px] mt-8 order-3 lg:order-2 ">
    <div>
        <h1 className="text-[26px]/[120%] text-dark font-semibold">
            {blogdetail.title}
        </h1>
        <div className="mt-[5px] text-[14px]/120% mb-4">
            {formattedDate}
        </div>
    </div>
    <div dangerouslySetInnerHTML={{ __html: blogdetail.content }} />
    
    </div>
  )
}

export default PostBlogDetail
