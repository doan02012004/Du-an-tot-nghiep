import mongoose from "mongoose";

const rateWeightSchema = new mongoose.Schema({
    minWeight: {
        type: Number,
        required: true, // Bắt buộc phải có
    },
    maxWeight: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
});

const rateVolumeSchema = new mongoose.Schema({
    minVolume: {
        type: Number,
        required: true, // Bắt buộc phải có
    },
    maxVolume: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
});

// Schema cho các phương thức vận chuyển
const shipModel = new mongoose.Schema({
    nameBrand: {
        type: String,
        required: true, // Tên phương thức vận chuyển (vd: "Chuyển phát nhanh")
    },
    weight: {
        type: [rateWeightSchema], // Danh sách các mức phí theo trọng lượng
        default: [],
    },
    volume: {
        type: [rateVolumeSchema], // Danh sách các mức phí theo thể tích
        default: [],
    }
});



const ShipModel = mongoose.model('ship', shipModel)
export default ShipModel