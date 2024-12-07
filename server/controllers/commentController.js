import mongoose from "mongoose";
import commentModel from "../models/commentModel.js";
import orderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";

export const createComment = async (req, res) => {
  try {
    const { userId, comment,orderId,rate, item } = req.body;
  

    if (!userId || !orderId || !comment) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }
    const checkProduct = await ProductModel.findById(item.productId)
    if(!checkProduct){
      return res.status(400).json({ message: "Sản phẩm này không tồn tại !" });
    }
    const newComment = await commentModel.create({
      userId,
      productId:item.productId,
      comment,
      item:{
        name:item.name,
        gallery:item.gallery,
        attribute:item.attribute
      },
      like: [],
      recomments: [],
      rating: rate
    })
    if(newComment){
      const order = await orderModel.findById(orderId)
      if(!order){
        return res.status(400).json({ message: "Đơn hàng này không tồn tại !" });
      }else{
        order.items = order.items.map((orderItem) => orderItem._id == item._id? {...orderItem,checkComment:true}: orderItem)
        await order.save()
        const comment = await commentModel.findById(newComment?._id).populate("userId", "firstname lastname email role").exec()
        return res.status(201).json({ message: "Tạo đánh giá thành công!", comment: comment });
      }
    }else{
      return res.status(400).json({ message: "Đánh giá thất bại!" });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createCommentExtra = async (req, res) => {
  try {
    const { commentId, recomment } = req.body;
  const text = recomment.text;
  const tag = recomment.tag;
  const userId = recomment.userId;


    if (!userId || !commentId || !text) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }
    const recommentItem = {
      _id: new mongoose.Types.ObjectId(),
      userId,
      comment: text,
      tag: tag ?? null,
    }
    const comment = await commentModel.findById(commentId)
    comment.recomments.push(recommentItem)
    await comment.save()
    const newComment = await commentModel.findById(commentId)
    .populate("userId", "firstname lastname email role")
    .populate("tag", "firstname lastname email")
    .populate("recomments.userId","firstname lastname email role")
    .populate("recomments.tag","firstname lastname email role");
    const newRecomment = newComment.recomments.find((item) => item._id.toString() == recommentItem._id)
    if(newComment){
      return res.status(201).json({ message: "Phản hồi đánh giá thành công!", recomment: newRecomment,productId:newComment.productId,commentId:commentId });
    }else{
      return res.status(400).json({ message: "Phản hồi đánh giá thất bại!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCommentsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await commentModel.find({ productId })
      .populate("userId", "firstname lastname email role")
      .populate("tag", "firstname lastname email")
      .populate("recomments.userId","firstname lastname email role")
      .populate("recomments.tag","firstname lastname email role")
      .sort({createdAt:-1})
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCommentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await commentModel.find({ userId })
      .populate("productId", "name")
      .populate("tag", "firstname lastname email")
      .populate("recomments.userId", "name email")
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

export const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await commentModel.findById(commentId)
      .populate("userId", "name email")
      .populate("tag", "firstname lastname email")
    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá!" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await commentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá để xóa!" });
    }

    return res.status(200).json({ message: "Xóa đánh giá thành công!", comment: deletedComment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteCommentExtraById = async (req, res) => {
  try {
    const { commentId,recommentId } = req.params;
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá để xóa!" });
    }
    comment.recomments = comment.recomments.filter((recomment) => recomment._id.toString() !== recommentId)
    await comment.save()
    return res.status(200).json({ message: "Xóa đánh giá thành công!", comment: comment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const likeCommentById = async (req, res) => {
  try {
    const { commentId,userId } = req.body;
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá để like!" });
    }
    const checkLike = comment.likes.findIndex((id) => id.toString() == userId )
    if(checkLike >=0){
      comment.likes = comment.likes.filter((id) => id.toString() !== userId)
    }else{
      comment.likes.push(userId)
    }
    await comment.save()
    return res.status(200).json({ message: "Like đánh giá thành công!", comment: comment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const likeCommentExtraById = async (req, res) => {
  try {
    const { commentId,recommentId,userId } = req.body;
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá để like!" });
    }
    const recomment = comment.recomments.find((recomment) => recomment._id.toString() == recommentId )
    const checkLike = recomment.likes.findIndex((id) => id.toString() == userId )
    if(checkLike >=0){
      recomment.likes = recomment.likes.filter((id) => id.toString() !== userId)
    }else{
       recomment.likes.push(userId)
    }
    await comment.save()
    return res.status(200).json({ message: "Like đánh giá thành công!", comment: comment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      req.body,
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá để cập nhật!" });
    }

    return res.status(200).json({ message: "Cập nhật đánh giá thành công!", comment: updatedComment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
