/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { CommentOutlined, DeleteOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons'
// import { useState } from 'react'
// import CommentExtral from './CommentExtral'

// type CommentMainProps ={
//     comment:any
// }
// const CommentMain = ({comment}:CommentMainProps) => {
//     const [showCommentExtral,setShowCommentExtral] = useState<boolean >(false)
//   return (
//     <div>
//     {/* comment main  */}
//     <div className='bg-gray-100 rounded-md p-2 '>
//       <h5 className='text-black text-base font-semibold'>{comment?.name}</h5>
//       <p>{comment?.comment}</p>
//       <div className='flex justify-end gap-x-8 pr-6'>
//         <div className='flex items-center'><LikeOutlined className=' cursor-pointer' /> <span className='ml-2'>{comment?.like.length}</span></div>
//         <div className='flex items-center'><CommentOutlined onClick={()=> ( comment?.recomment.length > 0 && showCommentExtral == false )? setShowCommentExtral(true) : setShowCommentExtral(false) } className=' cursor-pointer' /> <span className='ml-2'>{comment?.recomment.length}</span></div>
//         <div><SendOutlined className=' cursor-pointer' /></div>
//         <div><DeleteOutlined className=' cursor-pointer' /></div>
//       </div>
//     </div>
//     {/* comment extral  */}
//         {showCommentExtral && (
//             <CommentExtral recomment={comment.recomment} />
//         )}
//   </div>
//   )
// }

// export default CommentMain

import { useState } from 'react';
import { CommentOutlined, DeleteOutlined, LikeOutlined, LoadingOutlined } from '@ant-design/icons';
import { IComment } from '../../../../common/interfaces/comment'; // Giả sử IComment là interface định nghĩa bình luận
import CommentExtral from './CommentExtral'; // Component để hiển thị các bình luận trả lời
import useCommentMutation from '../../../../common/hooks/comments/useCommentMutation';

type CommentMainProps = {
  comment: IComment; // Bình luận gốc
 user:{
  _id: string;
  lastname: string;
  firstname: string;
 }
};

const CommentMain = ({ comment, user }: CommentMainProps) => {
  const [mainUser,setMainUser] = useState<any>(null)
  const [showCommentExtral, setShowCommentExtral] = useState(false); // State để điều khiển việc hiển thị các bình luận trả lời
  const commentMutation = useCommentMutation()
  // Xử lý khi người dùng click vào icon xóa bình luận
  const handleDelete = async (commentId:string) => {
    commentMutation.mutate({action:'deleteMain', newComment:{commentId:commentId}})
  };

  return (
    <div>
      {/* Nội dung bình luận */}
      <div className="bg-gray-100 rounded-md p-2">
        <h5 className="text-black text-base font-semibold">{comment.userId.lastname} {comment.userId.firstname}</h5>
        <p>{comment.comment}</p>
        <div className="flex justify-end gap-x-8 pr-6">
          {/* Like button */}
          <div className="flex items-center">
            <LikeOutlined className="cursor-pointer" /> <span className="ml-2">{comment.like ? comment.like.length : 0}</span>
          </div>
          {/* Comment button */}
          <div className="flex items-center">
            <CommentOutlined
              onClick={() => setShowCommentExtral((prev) => !prev)} // Toggle hiển thị bình luận trả lời
              className="cursor-pointer"
            />
            <span className="ml-2">{comment.like ? comment.like.length : 0}</span>
          </div>
          {/* Delete button */}
          <div>
          { user._id == comment.userId._id  &&(
            <>
            {commentMutation.isPending?<LoadingOutlined /> : <DeleteOutlined onClick={() =>handleDelete(comment._id?comment._id:'')} className="cursor-pointer" />}
            </>
          )}
          </div>
          <div>
            <span onClick={()=>{setMainUser(comment.userId); setShowCommentExtral(true)}} className=' cursor-pointer text-xs hover:underline'>phản hồi</span>
          </div>
        </div>
      </div>

      {/* Hiển thị các bình luận trả lời */}
      {showCommentExtral && <CommentExtral comment={comment} mainUser={mainUser} setMainUser={setMainUser} />}
    </div>
  );
};

export default CommentMain;
