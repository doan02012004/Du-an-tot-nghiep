import mongoose from "mongoose";


const historyUpdateUserSchema = new mongoose.Schema({
    originalUser: { type: Object, required: true }, // Lưu toàn bộ dữ liệu trước khi thay đổi
    changes: { type: Object, required: true }, // Lưu các trường đã thay đổi
    updateTime: { type: Date, default: Date.now }, // Thời gian thay đổi
});

export const HistoryUpdateUser = mongoose.model("historyUpdateUser", historyUpdateUserSchema);