import { useContext } from "react";
import Product from "../../_components/Product";
import { AppContext } from "../../../../common/contexts/AppContextProvider";
import useFavoriteQuery from "../../../../common/hooks/favorite/useFavoriteQuery";

type Props = {}

const PageFavourite = (props: Props) => {
  const { currentUser } = useContext(AppContext);
  const { data } = useFavoriteQuery(currentUser?._id); // Lấy danh sách yêu thích

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sản phẩm yêu thích của bạn</h2>
      {/* Đảm bảo rằng danh sách không rỗng */}
      {data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.map((favorite) => (
            <div key={favorite._id} className="transition-transform transform hover:scale-105">
              <Product product={favorite?.productId} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Bạn chưa có sản phẩm yêu thích nào.</p>
      )}
    </div>
  );
}

export default PageFavourite;
