import mongoose from 'mongoose'

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
}, {
    timestamps: true, versionKey: false
})
const BlackListModel = mongoose.model('blacklist', blackListSchema)
export default BlackListModel