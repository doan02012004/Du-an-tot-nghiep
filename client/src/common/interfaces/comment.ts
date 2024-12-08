
import { Iproduct } from "./product";


export interface IComment {
    _id?: string; // ID của bình luận
    userId: {
      _id:string,
      firstname: string,
      lastname: string,
      email: string,
      role:string
    }; // Tên người dùng để lại bình luận
    productId: string|Iproduct;
    likes: string[]; // Danh sách ID người dùng đã thích bình luận
    comment: string; // Nội dung bình luận
    rating: number; // Đánh giá (số sao)
    recomments: IReComment[]; // Danh sách bình luận phản hồi
    tag?:{
      _id:string,
      firstname: string,
      lastname: string,
      email: string,
      role:string
    };
    item?:{
      attribute:{
        size:string,
        color:string
      }
    }
    createdAt:string
  }
  
  export interface IReComment {
    _id:string|number,
    userId:{
      _id:string,
      firstname: string,
      lastname: string,
      email: string,
      role:string
    }; // Tên người dùng để lại bình luận
    likes: string[]; // Danh sách ID người dùng đã thích bình luận phản hồi
    comment: string; // Nội dung phản hồi
    tag?:{
      _id:string,
      firstname: string,
      lastname: string,
      email: string,
      role:string
    };
    createdAt:string
  }
  