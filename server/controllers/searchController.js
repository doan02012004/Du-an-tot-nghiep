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


