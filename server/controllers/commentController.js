import commentModel from "../models/commentModel.js";

export const createComment = async (req, res) => {
  try {
    const { userId, comment,productId,rate } = req.body;
  

    if (!userId || !productId || !comment) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }
    const existComment = await commentModel.findOne({userId})
    if(existComment){
      return res.status(400).json({ message: "Bạn đã đánh giá rồi!", exist:true });
    }
    const newComment = await commentModel.create({
      userId,
      productId,
      comment,
      like: [],
      recomments: [],
      rating: rate
    });

    return res.status(201).json({ message: "Tạo đánh giá thành công!", comment: newComment });
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
    const comment = await commentModel.findById(commentId)
    comment.recomments.push({
      userId,
      comment:text,
      tag:tag??null
    })
    await comment.save()
    const newComment = await commentModel.findById(commentId)
    return res.status(201).json({ message: "Phản hồi đánh giá thành công!", comment: newComment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCommentsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const Prdcomments = await commentModel.find({ productId })
      .populate("userId", "firstname lastname email")
      .populate("like", "firstname lastname email")
      .populate("tag", "firstname lastname email")
      .populate("recomments.userId","firstname lastname email")
      .populate("recomments.like", "firstname lastname email")
      .populate("recomments.tag","firstname lastname email")
      .sort({createdAt:-1})
    return res.status(200).json(Prdcomments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCommentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await commentModel.find({ userId })
      .populate("productId", "name")
      .populate("like", "name email")
      .populate("recomments.userId", "name email")
      .populate("recomments.like", "name email");
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
      .populate("like", "name email");

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
