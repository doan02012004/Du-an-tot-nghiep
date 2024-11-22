    import mongoose from "mongoose";


    const historyUpdateUserSchema = new mongoose.Schema({
        originalUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        changes: {
            type: Map,
            of: String,
            required: true
        },
        updateTime: {
            type: Date,
            default: Date.now
        }
    });

    export const HistoryUpdateUser = mongoose.model("historyUpdateUser", historyUpdateUserSchema);