/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "../common/config/axios";
import { IComment } from '../common/interfaces/comment';

export const commentService = {
//  Lấy danh sách bình luận theo sản phẩm
  getCommentsByProductId: async (productId: string | number) => {
    try {
      const response = await instance.get(`/comments/product/${productId}`);   
      const data: IComment[] = response.data;
       // Dữ liệu trả về là danh sách bình luận
      return data; 
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  getCommentsByUserId: async (userId: string | number) => {
    try {
      const response = await instance.get(`/comments/user/${userId}`);
      console.log(`${userId}`);
      const data: IComment[] = response.data; // Dữ liệu trả về là danh sách bình luận
      return data; 
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
    
  },

  // Thêm một bình luận mới
  addComment: async (comment: IComment) => {
    try {
      const response = await instance.post(`/comments/product`, comment);
      const data = response.data; // Dữ liệu trả về là bình luận vừa thêm
      return data;
    } catch (error:any) {
      console.error('Error adding comment:', error);
      return error.response.data
    }
  },

  // Xóa bình luận theo ID
  deleteComment: async (commentId: string | number) => {
    try {
      const res = await instance.delete(`/comments/${commentId}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },

  // Xóa phản hồi theo ID
  deleteCommentExtra: async (option:{commentId:string|number,recommentId:string|number}) => {
    try {
      const res = await instance.delete(`/comments/recomments/${option.commentId}/${option.recommentId}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },

  // Thêm phản hồi cho một bình luận
  addReComment: async (option:{commentId:string|number,recomment:{userId:string|number,text:string,tag?:string|number,}}) => {
    try {
      const response = await instance.post(`/comments/recomment`, option);
      const data: any = response.data; // Dữ liệu trả về là bình luận đã được cập nhật
      return data;
    } catch (error) {
      console.error('Error adding recomment:', error);
      throw error;
    }
  },

  // Thích hoặc bỏ thích bình luận
  toggleLikeComment: async (option:{commentId:string|number,userId:string|number}) => {
    try {
      const response = await instance.post(`/comments/like/comment`, option);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error liking comment:', error);
      throw error;
    }
  },
    // Thích hoặc bỏ thích bình luận con
    toggleLikeCommentExtra: async (option:{commentId:string|number,recommentId:string|number,userId:string|number}) => {
      try {
        const response = await instance.post(`/comments/like/recomment`, option);
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Error liking comment:', error);
        throw error;
      }
    },
};
