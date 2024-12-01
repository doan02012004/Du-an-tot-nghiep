import mongoose from "mongoose";

const rateWeightSchema = new mongoose.Schema({
    minWeight: { type: Number, required: true, default: 0 },
    maxWeight: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 }
});

const rateVolumeSchema = new mongoose.Schema({
    minVolume: {
        type: Number,
        default: 0,
        required: true
    },
    maxVolume: {
        type: Number,
        default: 0,
        required: true

    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
});

// Schema cho các phương thức vận chuyển
const shipModel = new mongoose.Schema({
    nameBrand: {
        type: String
    },
    weight: {
        type: [rateWeightSchema],

    },
    volume: {
        type: [rateVolumeSchema],

    }
});



const ShipModel = mongoose.model('ship', shipModel)
export default ShipModel