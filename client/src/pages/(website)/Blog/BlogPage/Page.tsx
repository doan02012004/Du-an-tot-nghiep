import { useContext } from 'react';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import CategoryBlog from '../../_components/CategoryBlog';
import NewsBlog from '../../_components/NewsBlog';
import Posts from './_components/Posts';
import TitleBlog from './_components/TitleBlog';

const PageBlog = () => {
  const {categoryBlogId, setCategoryBlogId} = useContext(AppContext);
  const handleCategoryClick = (id: string) => {
    console.log("Danh mục được chọn:", id);
    setCategoryBlogId(id);
  };

  return (
    <section className="container">
      {/* đường dẫn đến trang */}
      <TitleBlog />
      {/* bài viết */}
      <div className="py-[50px] px-[15px] lg:flex lg:justify-between">
        {/* box trái có bài viết */}
        <Posts categoryBlogId={categoryBlogId} />
        {/* box phải có danh mục và tin mới */}
        <div className="basis-4/12 hidden lg:block">
          {/* Danh mục bài viết */}
          <CategoryBlog onCategoryClick={handleCategoryClick} />
          {/* Tin mới nhất */}
          <NewsBlog />
        </div>
      </div>
    </section>
  );
};

export default PageBlog;