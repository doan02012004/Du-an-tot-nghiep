import { useContext, useEffect, useState } from "react";
import useCategoryBlogQuery from "../../../../../common/hooks/categoryBlog/useCategoryBlogQuery";
import { ICategoryBlog } from "../../../../../common/interfaces/categoryBlog";
import { AppContext } from "../../../../../common/contexts/AppContextProvider";


const CategoryBlogDesktop = () => {
    const query = useCategoryBlogQuery();
    const [categoryBlog, setCategoryBlog] = useState<ICategoryBlog[]>([]);
    const {categoryBlogId, setCategoryBlogId} = useContext(AppContext);
    useEffect(() => {
        if (query?.categories) {
            setCategoryBlog(query.categories);
        }
    }, [query]);

    const HandleClick = (id: string) => {
        console.log(id); // Xem id khi click vào danh mục
        if (id) {
            setCategoryBlogId(id);
        }
    };

    useEffect(() => {
        // Theo dõi sự thay đổi của CategoryBlogId
        console.log('CategoryBlogId updated:', categoryBlogId);
    }, [categoryBlogId]);

    return (
        <div className="border w-[300px] border-gray-200 rounded-tl-[32px] rounded-br-[32px] p-10 sticky top-[100px] z-20 bg-white hidden lg:block">
            <div>
                <h1 className="text-xl font-semibold mb-8 text-dark">Danh Mục</h1>
                <div>
                    {categoryBlog.map((item: ICategoryBlog) => (
                        <a key={item._id} href={`/blog`} className="block mb-8" onClick={() => HandleClick(item._id)}>
                            <p className="flex justify-between items-center">
                                <span>{item.name}</span>
                                <span><i className="fa-solid fa-arrow-right" /></span>
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryBlogDesktop;