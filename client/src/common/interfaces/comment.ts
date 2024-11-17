import { Iuser } from "./auth";
import { Iproduct } from "./product";


export interface IComment {
    _id?: string; // ID của bình luận
    userId: {
      _id:string,
      firstname: string,
      lastname: string,
      email: string,
    }; // Tên người dùng để lại bình luận
    productId: string|Iproduct;
    like: string[]; // Danh sách ID người dùng đã thích bình luận
    comment: string; // Nội dung bình luận
    rating: number; // Đánh giá (số sao)
    recomments?: IReComment[]; // Danh sách bình luận phản hồi
  }
  
  export interface IReComment {
    userId: string | Iuser; // Tên người dùng để lại bình luận
    like: string[]; // Danh sách ID người dùng đã thích bình luận phản hồi
    comment: string; // Nội dung phản hồi
  }
  