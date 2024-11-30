export interface IVoucher {
    _id?: string; // ID của voucher
    name: string; // Tên voucher
    code: string; // Mã voucher (5 ký tự)
    type: 'fixed' | 'percentage' | 'freeship'; // Loại voucher: cố định hoặc phần trăm
    value: number; // Giá trị giảm giá
    minOrderValue: number; // Giá trị đơn hàng tối thiểu
    maxDiscountValue?: number; // Giá trị giảm giá tối đa (cho phần trăm)
    quantity: number; // Số lượng voucher phát hành
    usedQuantity?: number; // Số lượng voucher đã sử dụng
    category: 'discount' | 'shipping'; // Loại voucher: giảm giá hoặc giảm vận chuyển
    scope: 'all' | 'specific'; // Phạm vi áp dụng: tất cả hoặc cụ thể
    applicableProducts?: string[]; // Danh sách sản phẩm áp dụng (nếu phạm vi là "specific")
    startDate: string; // Ngày bắt đầu hiệu lực
    endDate: string; // Ngày kết thúc
    status?: boolean; // Trạng thái (còn hiệu lực hay không)
}
