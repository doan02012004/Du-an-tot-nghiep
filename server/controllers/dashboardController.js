import { StatusCodes } from "http-status-codes";
import orderModel from "../models/orderModel.js";
import moment from 'moment'
import UserModel from "../models/userModel.js";



// Hàm để tính doanh thu
export const getRevenue = async (req, res) => {
    try {
        const {start,end} = req.query;
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) : moment().subtract(1, 'month').toDate(); // Ngày 1 tháng trước
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

// Hàm để lấy số lượng đơn hàng dựa trên status
export const getStatusOrdersCountByDate  = async (req, res) => {
    try {
        const {start,end,status} = req.query;
        const arrayStatus = status.split(',')
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) : moment().subtract(1, 'month').toDate(); // Ngày 1 tháng trước
        const endDate = end ? new Date(`${end}T23:59:59.999Z`) : moment().toDate(); // Ngày giờ hiện tại
        const pendingOrdersCount = await orderModel.countDocuments({
            status: {$in:arrayStatus},
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
        const {start,end} = req.query;
        const s = moment().subtract(1, 'month').format('DD-MM-YYYY');
        const e = moment().format('DD-MM-YYYY');
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) :moment().subtract(1, 'month').toDate();  // Ngày 1 tháng trước
        const endDate = end ? new Date(`${end}T23:59:59.999Z`) :  moment().toDate();// Ngày giờ hiện tại
        const userCount = await UserModel.countDocuments({
            createdAt: { 
                $gte: new Date(startDate), // Ngày bắt đầu
                $lte: new Date(endDate)   // Ngày kết thúc
            }
        });
       
        return res.status(200).json({total:userCount});
    } catch (error) {
        console.error("Lỗi khi lấy số lượng đơn hàng chờ:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
// Hàm để lấy top 5 người dùng mua nhiều nhất
export const getTopUserByDate  = async (req, res) => {
    try {
        const {start,end} = req.query;
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) :moment().subtract(1, 'month').toDate();  // Ngày 1 tháng trước
        const endDate = end ? new Date(`${end}T23:59:59.999Z`) :  moment().toDate();// Ngày giờ hiện tại
        const userCount = await orderModel.aggregate([
            {
                // Lọc các đơn hàng trong khoảng thời gian xác định
                $match: {
                    status:"received" ,
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                // Gom nhóm theo userId và tính tổng số đơn hàng và tổng tiền mua của mỗi người dùng
                $group: {
                    _id: "$userId",
                    totalOrders: { $sum: "$totalOrder" }, // Đếm số đơn hàng
                    totalSpent: { $sum: "$totalPrice" } // Tính tổng tiền đã chi tiêu
                }
            },
            {
                // Sắp xếp theo tổng số đơn hàng giảm dần
                $sort: { totalSpent: -1 }
            },
            {
                // Giới hạn kết quả là 5 người dùng
                $limit: 5
            },
            {
                // Kết hợp với bảng người dùng để lấy thông tin người dùng
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                // Lấy dữ liệu người dùng từ mảng
                $unwind: "$userInfo"
            },
            {
                // Chỉ lấy các trường cần thiết
                $project: {
                    _id: 0,
                    userId: "$_id",
                    totalOrders: 1,
                    totalSpent: 1,
                    userInfo: { firstname: 1,lastname:1, email: 1,city:1 }
                }
            }
        ]);
       
        return res.status(200).json({users:userCount});
    } catch (error) {
        console.error("Lỗi khi lấy số lượng đơn hàng chờ:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
// Hàm để lấy top 5 sản phẩm được mua nhiều nhất
export const getTopSellingProduct  = async (req, res) => {
    try {
        const {start,end} = req.query;
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) :moment().subtract(1, 'month').toDate();  // Ngày 1 tháng trước
        const endDate = end ? new Date(`${end}T23:59:59.999Z`) :  moment().toDate();// Ngày giờ hiện tại
        const results = await orderModel.aggregate([
            {
                // Lọc các đơn hàng trong khoảng thời gian xác định
                $match: {
                    status:"received" ,
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                // Giải nén mảng "items" để tính riêng từng sản phẩm trong đơn hàng
                $unwind: "$items"
            },
            {
                // Gom nhóm theo productId trong items và tính tổng số lượng bán ra
                $group: {
                    _id: "$items.productId",
                    totalQuantitySold: { $sum: "$items.quantity" }, // Tổng số lượng đã bán của sản phẩm
                    totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } // Tổng doanh thu của sản phẩm
                }
            },
            {
                // Sắp xếp theo số lượng bán được giảm dần
                $sort: { totalQuantitySold: -1 }
            },
            {
                // Giới hạn kết quả là 5 sản phẩm
                $limit: 5
            },
            {
                // Kết hợp với bảng sản phẩm để lấy thông tin chi tiết của từng sản phẩm
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                // Giải nén dữ liệu sản phẩm từ mảng
                $unwind: "$productInfo"
            },
            {
                // Kết hợp với bảng categories để populate categoryId
                $lookup: {
                    from: "categories",
                    localField: "productInfo.categoryId",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                // Giải nén dữ liệu category từ mảng
                $unwind: "$categoryInfo"
            },
            {
                // Chỉ lấy các trường cần thiết
                $project: {
                    productId: "$_id",
                    totalQuantitySold: 1,
                    totalRevenue: 1,
                    productInfo: { name: 1, gallerys: 1 },
                    categoryInfo: { name: 1, slug: 1 }
                }
            }
        ]);

       
        return res.status(200).json({products:results});
    } catch (error) {
        console.error("Lỗi khi lấy số lượng đơn hàng chờ:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
// Hàm để lấy top 5 sản phẩm được mua nhiều nhất
export const getTopUserCity  = async (req, res) => {
    try {
        const {start,end} = req.query;
        const startDate = start ? new Date(`${start}T00:00:00.000Z`) :moment().subtract(1, 'month').toDate();  // Ngày 1 tháng trước
        const endDate = end ? new Date(`${end}T23:59:59.999Z`) :  moment().toDate();// Ngày giờ hiện tại
        const results = await UserModel.aggregate([
            {
                 // Lọc trong khoảng thời gian xác định
                 $match: {
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
              $group: {
                _id: "$city",      // Nhóm theo trường 'city'
                value: { $sum: 1 } // Đếm số lượng người dùng trong mỗi thành phố
              }
            },
            {
              $sort: { count: -1 } // Sắp xếp theo số lượng người dùng giảm dần
            },
            {
              $limit: 4            // Lấy top 4 thành phố
            },
            {
                // Chỉ lấy các trường cần thiết
                $project: {
                   name:"$_id",
                   value: 1
                }
            }
          ])

       
        return res.status(200).json({data:results});
    } catch (error) {
        console.error("Lỗi khi lấy số lượng đơn hàng chờ:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
// Hàm để lấy doanh thu 6 tháng gần nhất
export const getMonthlyRevenue   = async (req, res) => {
    try {
        const startDate = moment().subtract(5, 'month').toDate();  // Ngày 1 tháng trước
        const endDate =   moment().toDate();// Ngày giờ hiện tại
        const results = await orderModel.aggregate([
            {
                // Lọc các đơn hàng trong 6 tháng gần nhất
                $match: {
                    status:"received",
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                // Nhóm các đơn hàng theo năm và tháng, tính tổng doanh thu
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalRevenue: { $sum: "$totalPrice" }
                }
            },
            {
                // Sắp xếp theo năm và tháng (mới nhất trước)
                $sort: {
                    "_id.year": -1,
                    "_id.month": -1
                }
            },
            {
                // Giới hạn kết quả là 6 tháng gần nhất
                $limit: 6
            },
            {
                // Định dạng lại dữ liệu trả về
                $project: {
                    year: "$_id.year",
                    month:  "$_id.month",
                    totalRevenue: 1,
                    _id: 0
                }
            }
        ]);

       
        return res.status(200).json({data:results.reverse()});
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu 6 tháng:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

