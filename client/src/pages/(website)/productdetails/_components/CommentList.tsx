/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from 'react';
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
  const { currentUser } = useContext(AppContext)
  const [commentId, setCommentId] = useState<string | number | null>(null)
  const commentQuery = useCommentQuery(productId)
  const commentRef = useRef<HTMLDivElement>(null)
  // Lấy danh sách bình luận từ API
  useEffect(() => {

    if (commentQuery.data) {
      setComments(commentQuery.data);
    }
  }, [productId, commentQuery.data]);




  return (
    <div className={`relative w-full ${comments.length == 0 ? 'h-[210px]':'h-[450px]'} pb-24`}>
      {/* Hiển thị danh sách bình luận */}
    <div ref={commentRef} className={`${comments.length == 0 ? 'h-[calc(210px-105px)]':'h-[calc(450px-105px)]'} flex flex-col gap-6 w-full overflow-y-auto`}>
        {comments.length > 0 ?
          comments.map((comment) => (
            <CommentMain
              key={comment?._id}
              setCommentId={setCommentId}
              commentId={commentId}
              comment={comment}
              commentRef={commentRef}
              user={currentUser}
            />
          )) :
          (<p>Chưa có đánh đánh giá nào.</p>)}
      </div>
      {/* Input để thêm bình luận mới */}
      <CommentInput productId={productId} userId={currentUser?._id} />
    </div>
  );
};

export default CommentList;

