
import cron from 'node-cron';
import VoucherModel from "../models/voucherModel.js";
import SearchModel from '../models/searchModel.js';
cron.schedule('0 0 * * *', async () => {
    try {
        const vouchers = await VoucherModel.find({ status: true });
        for (const voucher of vouchers) {
            if (voucher.endDate < new Date()) {
                voucher.status = false;
                await voucher.save();
                console.log(`Voucher ${voucher.code} đã hết hạn và được tắt hoạt động.`);
            }
        }
        console.log('Voucher expiration check completed.');
    } catch (error) {
        console.error('Có lỗi xảy ra khi kiểm tra hết hạn voucher:', error.message);
    }
});
cron.schedule('0 0 * * *', async () => {
    try {
        const vouchers = await VoucherModel.find({ status: true });
        for (const voucher of vouchers) {
            if (voucher.quantity == 0) {
                voucher.status = false;
                await voucher.save();
                console.log(`Voucher ${voucher.code} đã hết số lượng sử dụng.`);
            }
        }
        console.log('Voucher expiration check completed.');
    } catch (error) {
        console.error('Có lỗi xảy ra khi kiểm tra hết hạn voucher:', error.message);
    }
});
cron.schedule('0 0 * * 0', async () => { // Chạy vào mỗi Chủ Nhật
    try {
        const keywords = await SearchModel.find({
            searchCount: { $lt: 5 },
            lastSearched: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });
        
        for (const keyword of keywords) {
            await SearchModel.deleteOne({ _id: keyword._id });
            console.log(`Từ khóa ${keyword.keyword} đã bị xóa do ít lượt tìm kiếm.`);
        }
        console.log('Keyword cleanup completed.');
    } catch (error) {
        console.error('Có lỗi xảy ra khi quét từ khóa:', error.message);
    }
});