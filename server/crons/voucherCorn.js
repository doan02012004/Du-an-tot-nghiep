
// import cron from 'node-cron';
// import VoucherModel from "../models/voucherModel.js";
// cron.schedule('0 0 * * *', async () => {
//     try {
//         const vouchers = await VoucherModel.find({ status: true });
//         for (const voucher of vouchers) {
//             if (voucher.endDate < new Date()) {
//                 voucher.status = false;
//                 await voucher.save();
//                 console.log(`Voucher ${voucher.code} đã hết hạn và được tắt hoạt động.`);
//             }
//         }
//         console.log('Voucher expiration check completed.');
//     } catch (error) {
//         console.error('Có lỗi xảy ra khi kiểm tra hết hạn voucher:', error.message);
//     }
// });