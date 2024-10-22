import VoucherModel from "../models/voucherModel.js";

// Tạo voucher mới
export const createVoucher = async (req, res) => {
    try {
        const { name, code, type, value, minOrderValue, maxDiscountValue, quantity, category, startDate, endDate, applicableProducts, status } = req.body;

        // Kiểm tra độ dài của mã voucher phải đúng 5 ký tự
        if (code.length !== 5) {
            return res.status(400).json({ success: false, message: 'Mã voucher phải có đúng 5 ký tự' });
        }

        // Chuyển đổi định dạng ngày từ DD/MM/YYYY sang YYYY-MM-DD
        const formattedStartDate = startDate.split("/").reverse().join("-");
        const formattedEndDate = endDate.split("/").reverse().join("-");

        // Kiểm tra sản phẩm nếu phạm vi là specific
        if (category === 'specific' && (!applicableProducts || applicableProducts.length === 0)) {
            return res.status(400).json({ success: false, message: 'Danh sách sản phẩm áp dụng không thể để trống khi phạm vi là specific' });
        }

        // Tạo mới voucher với ngày đã được định dạng
        const newVoucher = new VoucherModel({
            name,
            code,
            type,
            value,
            minOrderValue,
            maxDiscountValue,
            quantity,
            category,
            scope: applicableProducts ? 'specific' : 'all',
            applicableProducts,
            startDate: new Date(formattedStartDate),
            endDate: new Date(formattedEndDate),
            status: status !== undefined ? status : true // Sử dụng status từ req.body nếu có, ngược lại mặc định là true
        });

        await newVoucher.save();
        return res.status(201).json({ success: true, voucher: newVoucher });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Hiển thị tất cả voucher
export const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await VoucherModel.find({});
        return res.status(200).json(vouchers);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Lấy voucher theo ID
export const getVoucherById = async (req, res) => {
    try {
        const voucher = await VoucherModel.findById(req.params.voucherId);

        if (!voucher) {
            return res.status(404).json({ success: false, message: 'Voucher không tồn tại' });
        }

        return res.status(200).json(voucher);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Cập nhật voucher
export const updateVoucher = async (req, res) => {
    try {
        const { name, code, type, value, minOrderValue, maxDiscountValue, quantity, category, startDate, endDate, applicableProducts, status } = req.body;

        // Chuyển đổi định dạng ngày từ DD/MM/YYYY sang YYYY-MM-DD
        const formattedStartDate = startDate.split("/").reverse().join("-");
        const formattedEndDate = endDate.split("/").reverse().join("-");

        const updatedVoucher = await VoucherModel.findByIdAndUpdate(
            req.params.voucherId, // ID của voucher cần cập nhật
            {
                name,
                code,
                type,
                value,
                minOrderValue,
                maxDiscountValue,
                quantity,
                category,
                scope: applicableProducts ? 'specific' : 'all',
                applicableProducts,
                startDate: new Date(formattedStartDate),
                endDate: new Date(formattedEndDate),
                status
            },
            { new: true } // Trả về bản cập nhật mới nhất
        );

        if (!updatedVoucher) {
            return res.status(404).json({ success: false, message: 'Voucher không tồn tại' });
        }

        return res.status(200).json({ success: true, voucher: updatedVoucher });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Kiểm tra voucher
export const checkVoucher = async (req, res) => {
    try {
        const { code, totalPrice, userId, productIds } = req.body;
        const voucher = await VoucherModel.findOne({ code, status: true });

        if (!voucher) {
            return res.status(404).json({ success: false, message: 'Voucher không tồn tại hoặc đã hết hạn' });
        }

        if (voucher.startDate > new Date() || voucher.endDate < new Date()) {
            return res.status(400).json({ success: false, message: 'Voucher chưa bắt đầu hoặc đã hết hạn' });
        }

        if (voucher.quantity <= voucher.usedQuantity) {
            return res.status(400).json({ success: false, message: 'Voucher đã được sử dụng hết' });
        }

        // Kiểm tra xem user đã sử dụng voucher này chưa
        const userUsedVoucher = voucher.usedBy.find(entry => entry.userId === userId && entry.type === voucher.category);
        if (userUsedVoucher) {
            return res.status(400).json({ success: false, message: `Bạn đã sử dụng voucher ${voucher.category} rồi` });
        }

        if (totalPrice < voucher.minOrderValue) {
            return res.status(400).json({ success: false, message: 'Giá trị đơn hàng không đủ để áp dụng voucher' });
        }

        // Kiểm tra phạm vi voucher
        if (voucher.scope === 'specific') {
            const applicableProductIds = voucher.applicableProducts || [];
            const isProductApplicable = productIds.some(productId => applicableProductIds.includes(productId));

            if (!isProductApplicable) {
                return res.status(400).json({ success: false, message: 'Voucher này không áp dụng cho sản phẩm của bạn' });
            }
        }

        // Tính giảm giá
        let discount = 0;
        if (voucher.type === 'percentage') {
            discount = (voucher.value / 100) * totalPrice;
            if (voucher.maxDiscountValue) {
                discount = Math.min(discount, voucher.maxDiscountValue);
            }
        } else if (voucher.type === 'fixed') {
            discount = voucher.value;
        }

        const finalPrice = totalPrice - discount;

        // Cập nhật số lượng voucher đã sử dụng
        voucher.usedQuantity += 1;
        voucher.usedBy.push({ userId, type: voucher.category });
        await voucher.save();

        return res.status(200).json({ success: true, discount, finalPrice });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Xóa voucher
export const deleteVoucher = async (req, res) => {
    try {
        const deletedVoucher = await VoucherModel.findByIdAndDelete(req.params.voucherId);

        if (!deletedVoucher) {
            return res.status(404).json({ success: false, message: 'Voucher không tồn tại' });
        }

        return res.status(200).json({ success: true, message: 'Voucher đã được xóa thành công' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
