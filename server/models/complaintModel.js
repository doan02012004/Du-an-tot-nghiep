import mongoose, { Schema } from 'mongoose';

const complaintSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'orders', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    complaintReason: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved','cancelled'],
      default: 'new',
    },
    response: { type: String },
    note: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Complaint', complaintSchema);