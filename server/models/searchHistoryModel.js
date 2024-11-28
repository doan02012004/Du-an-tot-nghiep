import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users', 
    required: true 
  }, // Tham chiếu đến người dùng

  keywords: [
    {
      keyword: { 
        type: String, 
        required: true 
      }, // Từ khóa tìm kiếm

      searchCount: { 
        type: Number, 
        default: 1 
      }, // Số lần tìm kiếm cho từ khóa này
    }
  ],
});

const SearchHistoryModel = mongoose.model('searchHistories', searchHistorySchema);

export default SearchHistoryModel;
