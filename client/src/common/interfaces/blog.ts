export interface IBlog {
    title: string;
    slug?:string;
    description: string;  // Mô tả ngắn
    content: string;      // Nội dung bài viết
    thumbnail: string;    // Link ảnh đại diện
    categories: string[]; // Danh mục bài viết
    createdAt?: string;    // Ngày tạo
    updatedAt?: string;   // Ngày cập nhật (tuỳ chọn)
    views?: number;        // Số lượt xem
    tags?: string[];      // Các thẻ tag bài viết (tuỳ chọn)
    featured: boolean;    // Bài viết nổi bật
}

export interface IBlogUpdate {
    blogId?: string;
    title: string;
    description: string; // Cập nhật mô tả
    content: string;
    thumbnail: string;   // Cập nhật ảnh đại diện
    categories: string[]; // Cập nhật danh mục
    tags?: string[];      // Cập nhật tags
    featured: boolean;    // Cập nhật trạng thái nổi bật
}
