import { useEffect, useState } from "react";
import useBlogQuery from "../../../../../common/hooks/blog/useBlogQuery";
import { IBlog } from "../../../../../common/interfaces/blog";
import { Link } from "react-router-dom";

interface PostsProps {
  categoryBlogId: string;
}

const Posts = ({ categoryBlogId }: PostsProps) => {
  const query = useBlogQuery();
  const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Số bài viết hiển thị mỗi trang

  useEffect(() => {
    if (query?.blogs) {
      let blogsToDisplay = query.blogs;

      if (categoryBlogId) {
        // Lọc bài viết theo danh mục
        blogsToDisplay = blogsToDisplay.filter((blog: IBlog) =>
          blog.categories?.some(
            (category) => category._id === categoryBlogId
          )
        );
      }

      // Lọc bài viết nổi bật và sắp xếp theo lượt xem
      blogsToDisplay = blogsToDisplay.filter((blog: IBlog) => blog.featured);
      blogsToDisplay.sort((a: IBlog, b: IBlog) => b.views - a.views);

      setFilteredBlogs(blogsToDisplay);
    }
  }, [categoryBlogId, query?.blogs]);

  // Reset trang về 1 khi categoryBlogId thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryBlogId]);

  // Tính toán bài viết hiển thị dựa trên trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  // Tổng số trang
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="basis-7/12">
      <div>
        {/* Hiển thị danh sách bài viết */}
        {currentPosts.map((item: IBlog) => (
          <div className="mb-4 lg:flex" key={item._id}>
            {/* ảnh blog */}
            <div className="px-[15px] flex-shrink-0 mb-[10px] lg:w-[200px] lg:h-[135px]">
              <Link to={`/blog/${item._id}`}>
                <img
                  className="w-full h-full object-cover"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </Link>
            </div>
            {/* văn bản */}
            <div className="px-[15px] lg:h-[135px] overflow-hidden">
              <a className="text-[#373737] font-medium" href={`/blog/${item._id}`}>
                <h1 className="uppercase font-semibold">{item.title}</h1>
              </a>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          </div>
        ))}

        {/* Phần phân trang */}
        <div>
          <ul className="list-inline-pagination flex justify-center items-center mt-[70px]">
            <li className="mx-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="block py-2 px-4 bg-white border hover:bg-black hover:text-white rounded-tl-lg rounded-br-lg disabled:opacity-50"
              >
                «
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li className="mx-2" key={page}>
                <button
                  onClick={() => handlePageChange(page)}
                  className={`block py-2 px-4 ${
                    page === currentPage
                      ? "bg-black text-white"
                      : "bg-white border hover:bg-black hover:text-white"
                  } rounded-tl-lg rounded-br-lg`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className="mx-2">
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="block py-2 px-4 bg-white border hover:bg-black hover:text-white rounded-tl-lg rounded-br-lg disabled:opacity-50"
              >
                »
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Posts;
