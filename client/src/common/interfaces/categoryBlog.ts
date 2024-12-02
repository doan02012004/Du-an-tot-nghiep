// interfaces/categoryBlog.ts
export interface ICategoryBlog {
    id?: string;             // ID của danh mục
    name: string;           // Tên danh mục
    slug?: string;           // Slug của danh mục
    status?: boolean;        // Trạng thái (hiển thị/ẩn)
}
