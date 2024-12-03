import { useEffect, useState } from "react";
import useCategoryBlogQuery from "../../../common/hooks/categoryBlog/useCategoryBlogQuery";
import { ICategoryBlog } from "../../../common/interfaces/categoryBlog";

interface CategoryBlogProps {
  onCategoryClick: (id: string) => void; // Hàm callback nhận id từ cha
}

const CategoryBlog = ({ onCategoryClick }: CategoryBlogProps) => {
  const query = useCategoryBlogQuery();
  const [categoryBlog, setCategoryBlog] = useState<ICategoryBlog[]>([]);

  useEffect(() => {
    if (query?.categories) {
      setCategoryBlog(query.categories);
    }
  }, [query]);

  return (
    <div>
      <div className="border border-gray-200 rounded-tl-[32px] rounded-br-[32px] p-10">
        <div>
          <h1 className="text-xl font-semibold mb-8 text-dark">Danh Mục</h1>
          <div>
            {categoryBlog.map((item: ICategoryBlog) => (
              <div
                key={item._id}
                className="block mb-8 cursor-pointer"
                onClick={() => onCategoryClick(item._id)} // Gọi hàm callback
              >
                <p className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span>
                    <i className="fa-solid fa-arrow-right" />
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;