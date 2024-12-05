// services/favorite.ts
import instance from "../common/config/axios";
import { IFavoriteToggle } from "../common/interfaces/favorite";

// Thêm hoặc cập nhật trạng thái yêu thích
export const toggleFavorite = async ({userId, productId, status }: IFavoriteToggle) => {
  const response = await instance.post('/favorite', { userId, productId, status });
  return response.data;
};

// Lấy danh sách sản phẩm yêu thích của người dùng
export const getFavorites = async (userId: string) => {
  const response = await instance.get(`/favorite/${userId}`);
  return response.data;
};
