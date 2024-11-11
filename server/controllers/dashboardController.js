import { StatusCodes } from "http-status-codes";
import orderModel from "../models/orderModel.js";
import moment from 'moment'



// Hàm để tính doanh thu
export const getRevenue = async (req, res) => {
    try {
        const {start,end} = req.params;
        const startDate = start ?? moment().subtract(5, 'month').toDate(); // Ngày 1 tháng trước
        const endDate = end ?? moment().toDate(); // Ngày giờ hiện tại
        console.log("Ngày bắt đầu:", startDate);
        console.log("Ngày kết thúc:", endDate);
        // Sử dụng aggregate để lọc theo thời gian và tính tổng doanh thu
        const revenue = await orderModel.aggregate([
            {
                // Lọc các đơn hàng trong khoảng thời gian
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),  // Ngày bắt đầu
                        $lte: new Date(endDate)     // Ngày kết thúc
                    }
                }
            },
            {
                // Tính tổng doanh thu từ totalPrice
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" }
                }
            }
        ]);

        // Nếu không có đơn hàng nào trong khoảng thời gian, tổng doanh thu sẽ là 0
        const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;
        console.log("Doanh thu:", revenue);
        return res.status(200).json({total:totalRevenue});
    } catch (error) {
        console.error("Lỗi khi tính doanh thu:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

