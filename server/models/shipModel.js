const rateWeightSchema = new mongoose.Schema({
    minWeightValue: {
        type: Number,
        required: true, // Bắt buộc phải có
    },
    maxWeightValue: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const rateVolumeSchema = new mongoose.Schema({
    minVolumeValue: {
        type: Number,
        required: true, // Bắt buộc phải có
    },
    maxVolumeValue: {
        type: Number,
        required: true,
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
    weightRates: {
        type: [rateWeightSchema], // Danh sách các mức phí theo trọng lượng
        default: [],
    },
    volumeRates: {
        type: [rateVolumeSchema], // Danh sách các mức phí theo thể tích
        default: [],
    }
});



const ship = mongoose.model('ship', shipModel)
export default ship