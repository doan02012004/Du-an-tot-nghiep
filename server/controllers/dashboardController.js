import { StatusCodes } from "http-status-codes";
import orderModel from "../models/orderModel.js";
import moment from 'moment'
import UserModel from "../models/userModel.js";



// Hàm để tính doanh thu
export const getRevenue = async (req, res) => {
    try {
        const {start,end} = req.query;
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) : moment().subtract(5, 'month').toDate(); // Ngày 1 tháng trước
        const endDate = end ? new Date(`${end}T23:59:59.999Z`) : moment().toDate(); // Ngày giờ hiện tại
        // console.log("Ngày bắt đầu:", start);
        // console.log("Ngày kết thúc:", end);
        // Sử dụng aggregate để lọc theo thời gian và tính tổng doanh thu
        const revenue = await orderModel.aggregate([
            {
                // Lọc các đơn hàng trong khoảng thời gian
                $match: {
                    status:"received",
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
        return res.status(200).json({total:totalRevenue});
    } catch (error) {
        console.error("Lỗi khi tính doanh thu:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Hàm để lấy số lượng đơn hàng đã hoàn thành
export const getStatusOrdersCountByDate  = async (req, res) => {
    try {
        const {start,end,status} = req.params;
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) : moment().subtract(5, 'month').toDate(); // Ngày 1 tháng trước
        const endDate = end ? new Date(`${end}T23:59:59.999Z`) : moment().toDate(); // Ngày giờ hiện tại
        const pendingOrdersCount = await orderModel.countDocuments({
            status: status,
            createdAt: { 
                $gte: new Date(startDate),  // Ngày bắt đầu
                $lte: new Date(endDate)     // Ngày kết thúc
            }
        });
        return res.status(200).json({total:pendingOrdersCount});
    } catch (error) {
        console.error("Lỗi khi lấy số lượng đơn hàng chờ:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
    
};
// Hàm để lấy số lượng người dùng mới
export const getUserNewCountByDate  = async (req, res) => {
    try {
        const {start,end} = req.params;
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) : moment().subtract(5, 'month').toDate(); // Ngày 1 tháng trước
        const endDate = end ? new Date(`${end}T23:59:59.999Z`) : moment().toDate(); // Ngày giờ hiện tại
        const userCount = await UserModel.countDocuments({
            createdAt: { 
                $gte: new Date(startDate),  // Ngày bắt đầu
                $lte: new Date(endDate)     // Ngày kết thúc
            }
        });
       
        return res.status(200).json({total:userCount});
    } catch (error) {
        console.error("Lỗi khi lấy số lượng đơn hàng chờ:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

