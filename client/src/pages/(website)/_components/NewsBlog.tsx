import { useEffect, useState } from "react";
import useBlogQuery from "../../../common/hooks/blog/useBlogQuery"
import { IBlog } from "../../../common/interfaces/blog";
import { Link } from "react-router-dom";

const NewsBlog = () => {
    const query = useBlogQuery();
    // console.log(query?.blogs)
    const [blog,setblog] = useState<IBlog[]>([])
    useEffect(()=>{
        if(query?.blogs){
            setblog(query?.blogs)
        }
    },[query])
    return (
        <div className="border border-gray-200 rounded-tl-[32px] rounded-br-[32px] p-10 mt-10">
            <div>
                <h1 className="text-xl font-semibold mb-8 text-dark">Tin mới nhất</h1>
                <div>
                {blog
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))  // Sắp xếp bài viết theo ngày tạo (mới nhất lên đầu)
                .slice(0, 5)  // Chỉ lấy 5 bài viết mới nhất
                .map((item: IBlog) => (
                    <ul key={item._id}>
                    <li className="flex text-[14px] justify-between">
                        <img className="h-[75px] w-[30%] object-cover" src={item.thumbnail} alt={item.title}/>
                        <div className="w-[70%] h-[75px] ml-3 overflow-hidden">
                        <div className="font-semibold mb-2">
                            <Link to={`/blog/${item._id}`} dangerouslySetInnerHTML={{ __html: item.title }}/>
                        </div>
                        <p className="">{new Date(item.createdAt).toLocaleDateString()}</p> {/* Hiển thị ngày tạo ở định dạng đẹp */}
                        </div>
                    </li>
                    </ul>
                ))}

                </div>
            </div>
        </div>
    )
}

export default NewsBlog