import mongoose from "mongoose";

const rateWeightSchema = new mongoose.Schema({
    minWeight: {
        type: Number,
        required: true,
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
        required: true,
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
        required: true,
    },
    weight: {
        type: [rateWeightSchema],
        default: [],
    },
    volume: {
        type: [rateVolumeSchema],
        default: [],
    }
});



const ShipModel = mongoose.model('ship', shipModel)
export default ShipModel