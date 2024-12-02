import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const BlogSchema = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    }, // Tiêu đề bài viết

    slug: { 
      type: String, 
      required: true, 
      unique: true 
    }, // Slug tạo từ title, giúp SEO và URL thân thiện

    description: { 
      type: String, 
      required: true 
    }, // Mô tả ngắn (hiển thị trong danh sách)

    content: { 
      type: String, 
      required: true 
    }, // Nội dung đầy đủ của bài viết

    thumbnail: { 
      type: String, 
      required: true 
    }, // Link ảnh đại diện

    categories: [
      { 
        type: mongoose.Schema.Types.ObjectId, // Sử dụng ObjectId để tham chiếu đến categoryBlog
        ref: 'categoryBlog', // Tên của model categoryBlog
        required: true
      }
    ], // Danh mục bài viết (VD: Sự kiện thời trang)

    views: { 
      type: Number, 
      default: 0 
    }, // Số lượt xem bài viết

    tags: [
      { 
        type: String 
      }
    ], // Các thẻ gắn cho bài viết (tag)

    featured: { 
      type: Boolean, 
      default: false 
    }, // Đánh dấu bài viết nổi bật
  },
  { timestamps: true, versionKey: false }
);

// Tạo slug từ title trước khi lưu vào cơ sở dữ liệu
BlogSchema.pre("save", async function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });

    // Kiểm tra xem slug đã tồn tại chưa
    const existingSlug = await mongoose.models.Blog.findOne({ slug: this.slug });
    if (existingSlug) {
      this.slug = `${this.slug}-${Date.now()}`;  // Thêm timestamp vào slug nếu trùng lặp
    }
  }
  next();
});

export default mongoose.model("Blog", BlogSchema);