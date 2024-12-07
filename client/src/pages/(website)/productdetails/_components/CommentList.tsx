/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from 'react';
import { IComment, IReComment } from '../../../../common/interfaces/comment';
import CommentMain from './CommentMain';
import { AppContext } from '../../../../common/contexts/AppContextProvider';
import useCommentQuery from '../../../../common/hooks/comments/useCommentQuery';
import CommentInput from './CommentInput';

interface CommentListProps {
  productId: string | number;
}

const CommentList = ({ productId }: CommentListProps) => {
  const [comments, setComments] = useState<IComment[]>([]); // Khai báo rõ ràng kiểu dữ liệu là IComment[]
  const { currentUser, socket } = useContext(AppContext)
  const [commentId, setCommentId] = useState<string | number | null>(null)
  const commentQuery = useCommentQuery(productId)
  const commentRef = useRef<HTMLDivElement>(null)
  // Lấy danh sách bình luận từ API
  useEffect(() => {

    if (commentQuery.data) {
      setComments(commentQuery.data);
    }
  }, [productId, commentQuery.data]);


  useEffect(() => {
    if (socket?.current) {
      //real-time comment
      socket.current.on('userAddComment', (data: any) => {
        if (data.productId === productId) {
          setComments([data, ...comments])
        }
      })

      // retime recomment
      socket.current?.on('userAddRecomment', (data: any) => {
        if (data?.recomment?.userId?._id !== currentUser?._id) {
          // console.log(data)
          if (data.productId === productId) {
            const oldComment = comments.find((item: IComment) => item._id == data.commentId)
            if (oldComment) {
              const checkIndex =  oldComment?.recomments.findIndex((recomment:IReComment) => recomment._id == data?.recomment?._id)
              if( checkIndex<0){
                oldComment?.recomments.push(data.recomment)
                const newComment = comments.map((item: IComment) => item._id == oldComment._id ? oldComment: item) as IComment[]
                setComments(newComment)
              }
            }
          }
        }

      })
    }
  }, [socket, comments])

  return (
    <div className={`relative w-full ${comments.length == 0 ? 'h-[210px]' : 'h-[450px]'} `}>
      {/* Hiển thị danh sách bình luận */}
      <div ref={commentRef} className={`${comments.length == 0 ? 'h-[150px]' : 'h-[350px]'} flex flex-col gap-6 w-full pb-5 overflow-y-auto`}>
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

