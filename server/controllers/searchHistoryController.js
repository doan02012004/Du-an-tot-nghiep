import SearchHistoryModel from "../models/searchHistoryModel.js";
import SearchModel from "../models/searchModel.js";

// Hàm lưu lịch sử tìm kiếm của người dùng và cập nhật số lần tìm kiếm của từ khóa
export const trackSearch = async (req, res) => {
  const { userId, keyword } = req.body; // Lấy từ body thay vì params

  try {
    // Kiểm tra và cập nhật lịch sử tìm kiếm của người dùng
    let searchHistory = await SearchHistoryModel.findOne({ userId });

    if (searchHistory) {
      // Kiểm tra xem từ khóa đã tồn tại trong lịch sử tìm kiếm của người dùng chưa
      const existingKeyword = searchHistory.keywords.find(k => k.keyword === keyword);
      
      if (existingKeyword) {
        // Nếu từ khóa đã tồn tại, tăng số lần tìm kiếm của từ khóa này
        existingKeyword.searchCount += 1;
      } else {
        // Nếu từ khóa chưa tồn tại, thêm mới từ khóa vào lịch sử tìm kiếm
        searchHistory.keywords.push({ keyword, searchCount: 1 });
      }

      // Lưu lại thay đổi trong lịch sử tìm kiếm của người dùng
      await searchHistory.save();
    } else {
      // Nếu không có lịch sử tìm kiếm, tạo mới
      searchHistory = await SearchHistoryModel.create({
        userId,
        keywords: [{ keyword, searchCount: 1 }],
      });
    }

    // Cập nhật thống kê số lần tìm kiếm của từ khóa trong toàn hệ thống
    let keywordStats = await SearchModel.findOne({ keyword });

    if (keywordStats) {
      // Nếu từ khóa đã tồn tại trong thống kê, tăng số lần tìm kiếm
      keywordStats.searchCount += 1;
      await keywordStats.save();
    } else {
      // Nếu từ khóa chưa có trong thống kê, tạo mới
      keywordStats = await SearchModel.create({ keyword, searchCount: 1 });
    }

    // Trả lời cho client sau khi đã lưu thành công
    res.status(200).json({ message: "Search tracked successfully" });

  } catch (error) {
    console.error('Error tracking search:', error);
    res.status(500).json({ message: 'Error tracking search', error });
  }
};

// export const getSearchHistoryByUser = async(req, res)=>{
//   const { userId } = req.params; // Lấy userId từ params URL

//   try {
//     // Tìm kiếm lịch sử tìm kiếm của người dùng dựa trên userId
//     const searchHistory = await SearchHistoryModel.findOne({ userId });

//     if (!searchHistory) {
//       return res.status(404).json({ message: "No search history found for this user" });
//     }

//     // Trả về danh sách từ khóa và số lần tìm kiếm
//     res.status(200).json({
//       message: "Search history retrieved successfully",
//       keywords: searchHistory.keywords,
//     });
//   } catch (error) {
//     console.error("Error retrieving search history:", error);
//     res.status(500).json({ message: "Error retrieving search history", error });
//   }
// }
