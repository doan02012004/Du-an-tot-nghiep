import { StatusCodes } from "http-status-codes";
import SearchModel from "../models/searchModel.js";
export const getPopularSearch = async (req, res) => {
    try {
        const popularSearches = await SearchModel.find()
            .sort({ searchCount: -1 }) // Sắp xếp giảm dần theo số lần tìm kiếm
            .limit(10) // Giới hạn lấy 10 từ khóa phổ biến nhất
            .select('keyword filters searchCount'); // Lấy các trường cần thiết

        res.status(StatusCodes.OK).json(popularSearches);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
    }
}
export const trackSearch = async (req, res) => {
    const { keyword } = req.body; // Lấy từ body thay vì params
    try {
        // Cập nhật thống kê số lần tìm kiếm của từ khóa trong toàn hệ thống
        let keywordStats = await SearchModel.findOne({ keyword });

        if (keywordStats) {
            // Nếu từ khóa đã tồn tại trong thống kê, tăng số lần tìm kiếm
            keywordStats.searchCount += 1;
            keywordStats.lastSearchedAt = Date.now(); // Cập nhật thời gian tìm kiếm mới
            await keywordStats.save();
        } else {
            // Nếu từ khóa chưa có trong thống kê, tạo mới
            if (keyword.length >= 2) {
                keywordStats = await SearchModel.create({ keyword, searchCount: 1 });
            }
            
        }

        // Trả lời cho client sau khi đã lưu thành công
        res.status(200).json({ message: "Search tracked successfully" });

    } catch (error) {
        console.error('Error tracking search:', error);
        res.status(500).json({ message: 'Error tracking search', error });
    }
};



