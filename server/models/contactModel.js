import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    title: { type: String, require: true},
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved'],
      default: 'new',
    },
    response: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Contact', contactSchema);
