import { useContext, useEffect, useState } from 'react';
import { IComment } from '../../../../common/interfaces/comment';
import CommentMain from './CommentMain';
import CommentInput from './CommentInput';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import useCommentQuery from '../../../../common/hooks/comments/useCommentQuery';

interface CommentListProps {
  productId: string | number;
}

const CommentList = ({ productId }: CommentListProps) => {
  const [comments, setComments] = useState<IComment[]>([]); // Khai báo rõ ràng kiểu dữ liệu là IComment[]
  const {currentUser} = useContext(AppContext)
  const commentQuery = useCommentQuery(productId)
  // Lấy danh sách bình luận từ API
  useEffect(() => {
  
    if(commentQuery.data){
      setComments(commentQuery.data);
    }
  }, [productId,commentQuery.data]);

  // Hàm thêm bình luận mới
  // const handleAddComment = async (comment: IComment) => {
  //   console.log("Product ID:", productId);
  //   console.log("User ID:", userId);
  //   console.log("Comment Data:", comment);
  
  //   try {
  //     const addedComment = await commentService.addComment(productId, comment); // Gửi yêu cầu API
  //     console.log("Added Comment Response:", addedComment); // Log phản hồi từ API
  //     setComments((prev) => [addedComment, ...prev]); // Thêm vào danh sách
  //   } catch (error) {
  //     console.error("Failed to add comment:", error);
  //   }
  // };
  
  

  return (
    <div className="relative w-full h-[500px] pb-16">
      {/* Hiển thị danh sách bình luận */}
      <div className="h-[calc(500px-75px)] flex flex-col gap-4 w-full overflow-y-auto">
        {comments.length> 0 ?
        comments.map((comment) => (
          <CommentMain key={comment._id} comment={comment} user={currentUser} />
        )):
        (<p>Chưa có đánh đánh giá nào.</p>)}
      </div>
      {/* Input để thêm bình luận mới */}
      <CommentInput productId={productId} userId={currentUser._id} />
    </div>
  );
};

export default CommentList;

