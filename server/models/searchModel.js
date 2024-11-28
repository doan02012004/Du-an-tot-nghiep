import mongoose from 'mongoose'

const searchSchema = new mongoose.Schema({
  keyword: { 
    type: String, 
    required: true 
  }, // Từ khóa tìm kiếm
  searchCount: { 
    type: Number, 
    default: 1 
  }, // Số lần tìm kiếm cùng từ khóa và bộ lọc này
  
});

const SearchModel = mongoose.model('searchs', searchSchema);

export default SearchModel;
