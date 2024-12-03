import { useContext, useEffect, useState } from 'react';
import useCategoryBlogQuery from '../../../../../common/hooks/categoryBlog/useCategoryBlogQuery';
import CategoryBlogDesktop from './CategoryBlogDesktop';
import { ICategoryBlog } from '../../../../../common/interfaces/categoryBlog';
import { AppContext } from '../../../../../common/contexts/AppContextProvider';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const CategoryBlogDetail = () => {
  const query = useCategoryBlogQuery();
  const [categoryBlog, setCategoryBlog] = useState<ICategoryBlog[]>([]);
  const { categoryBlogId, setCategoryBlogId } = useContext(AppContext);
  const navigate = useNavigate();  // Khởi tạo navigate

  useEffect(() => {
    if (query?.categories) {
      setCategoryBlog(query.categories);
    }
  }, [query]);

  const HandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    console.log(selectedId); // Kiểm tra giá trị đã chọn
    if (selectedId) {
      setCategoryBlogId(selectedId);
      navigate(`/blog`); // Điều hướng tới trang blog theo danh mục
    }
  };

  useEffect(() => {
    // Theo dõi sự thay đổi của CategoryBlogId
    console.log('CategoryBlogId updated:', categoryBlogId);
  }, [categoryBlogId]);

  return (
    <div className="px-[15px]">
      {/* menu danh mục khi về mobile */}
      <select
        className="h-12 w-full mb-8 px-3 py-2 text-#57585A border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent block lg:hidden"
        onChange={HandleChange} // Dùng onChange để bắt sự kiện khi người dùng chọn danh mục
      >
        {categoryBlog.map((item: ICategoryBlog) => (
          <option key={item._id} value={item._id}>{item.name}</option> // Sử dụng value để chọn giá trị
        ))}
      </select>
      
      {/* danh mục trên desktop */}
      <CategoryBlogDesktop />
    </div>
  );
};

export default CategoryBlogDetail;