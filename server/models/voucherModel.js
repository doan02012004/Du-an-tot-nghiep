import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên của voucher
    code: { type: String, required: true, unique: true }, // Mã voucher
    type: { type: String, enum: ['percentage', 'fixed','freeship'], required: true }, // Loại voucher: phần trăm hoặc cố định
    value: { type: Number}, // Giá trị giảm giá
    minOrderValue: { type: Number }, // Giá trị đơn hàng tối thiểu để áp dụng voucher
    maxDiscountValue: { type: Number }, // Giá trị giảm tối đa (nếu có)
    quantity: { type: Number, required: true }, // Số lượng voucher có thể sử dụng
    usedQuantity: { type: Number, default: 0 }, // Số lượng voucher đã sử dụng
    category: { type: String, enum: ['discount', 'shipping'], required: true }, // Loại voucher: giảm giá sản phẩm hoặc phí ship
    scope: { type: String, enum: ['all', 'specific'], required: true }, // Phạm vi voucher: tất cả sản phẩm hoặc chỉ một số sản phẩm
    applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }], // Danh sách các sản phẩm áp dụng (nếu scope là specific)
    usedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'users'}],
    startDate: { type: Date, required: true }, // Ngày bắt đầu hiệu lực
    endDate: { type: Date, required: true }, // Ngày hết hạn
    status: { type: Boolean, default: true } // Trạng thái hoạt động của voucher
}, {
    timestamps: true
});

const VoucherModel = mongoose.model('Voucher', voucherSchema);
export default VoucherModel;
