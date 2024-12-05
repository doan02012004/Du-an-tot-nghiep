import FavoriteModel from '../models/favoriteModel.js'; // Import model Favorites

// Thêm hoặc cập nhật trạng thái yêu thích của sản phẩm
export const toggleFavoriteProduct = async (req, res) => {
  const { userId, productId, status } = req.body;  // status: true (yêu thích), false (hủy yêu thích)

  try {
    // Kiểm tra trạng thái (chỉ cho phép true hoặc false)
    if (typeof status !== 'boolean') {
      return res.status(400).json({ message: "Trạng thái yêu thích phải là true hoặc false" });
    }

    // Kiểm tra xem người dùng đã yêu thích sản phẩm này chưa
    let favorite = await FavoriteModel.findOne({ userId, productId });

    if (favorite) {
      // Nếu đã có, cập nhật trạng thái
      favorite.status = status;
      await favorite.save();
      return res.status(200).json({ message: "Cập nhật trạng thái yêu thích thành công", favorite });
    } else {
      // Nếu chưa có, tạo mới bản ghi yêu thích
      favorite = new FavoriteModel({
        userId,
        productId,
        status,
      });
      await favorite.save();
      return res.status(200).json({ message: "Thêm sản phẩm vào yêu thích thành công", favorite });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách sản phẩm yêu thích của người dùng
export const getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Kiểm tra nếu userId hợp lệ
    if (!userId) {
      return res.status(400).json({ message: "UserId không hợp lệ" });
    }

    // Lấy danh sách sản phẩm yêu thích của người dùng
    const favorites = await FavoriteModel.find({ userId, status: true }).populate('productId');

    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
