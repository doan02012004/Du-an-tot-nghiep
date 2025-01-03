/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect,  useState } from 'react';
import { CommentOutlined, DeleteOutlined, LikeOutlined, LoadingOutlined } from '@ant-design/icons';
import { IComment } from '../../../../common/interfaces/comment'; // Giả sử IComment là interface định nghĩa bình luận
import CommentExtra from './CommentExtra'; // Component để hiển thị các bình luận trả lời
import useCommentMutation from '../../../../common/hooks/comments/useCommentMutation';
import { Rate, Space } from 'antd';
import { formatDateComment } from '../../../../common/utils/product';

type CommentMainProps = {
  comment: IComment; // Bình luận gốc
  user: {
    _id: string;
    lastname: string;
    firstname: string;
  },
  commentRef:any,
  setCommentId:any,
  commentId:any
};

const CommentMain = ({ comment, user,commentRef,commentId,setCommentId }: CommentMainProps) => {
  const [userTag, setUserTag] = useState<any>(null)
  const commentMutation = useCommentMutation()

  // khi phản hồi thì sẽ cuộn tới nơi input bình luận
  useEffect(()=>{
    if(commentRef?.current){
      if(userTag){
        commentRef.current.scrollTop = commentRef.current.scrollHeight;
      }
    }
  },[userTag,commentRef])

  // tự động xóa tag user khi không được open comment extra
  useEffect(()=>{
    if(userTag){
      if(comment._id !== commentId){
        setUserTag(null)
      }
    }
  },[userTag,commentId,comment])

 
  // Xử lý khi người dùng click vào icon xóa bình luận
  const handleDelete = async (commentId: string) => {
    commentMutation.mutate({ action: 'deleteMain', newComment: { commentId: commentId } })
  };

  // toggleLike 
  const onHandleLike = () =>{
    commentMutation.mutate({action:'like',newComment:{commentId:comment._id,userId:user?._id}})
  }
  return (
    <div>
      {/* Nội dung bình luận */}
      <div className="bg-gray-100 rounded-md p-2">
        <h5 className="text-black text-base font-semibold m-0">{comment.userId.lastname} {comment.userId.firstname}</h5>
          <Rate value={comment?.rating} className='text-xs p-0 m-0 block' disabled />
          <Space className='mb-3 *:text-xs *:text-black'>
            <span >size: {comment?.item?.attribute?.size}</span>
            <span>màu: {comment?.item?.attribute?.color}</span>
          </Space>
        <p className='font-semibold text-black'>{comment.comment}</p>
        <div className="flex justify-between items-center">
          <div className='text-xs font-medium'>
            {formatDateComment(comment.createdAt)}
          </div>
         <div className=' flex items-center gap-x-8 pr-5 '>
           {/* Like button */}
           {user && (
            <div className="flex items-center">
              <LikeOutlined onClick={onHandleLike} className={` ${comment.likes.includes(user?._id) && 'text-blue'} cursor-pointer `} /> <span className="ml-2">{comment.likes ? comment.likes.length : 0}</span>
            </div>
          )}
          {/* Comment button */}
          <div className="flex items-center">
            <CommentOutlined
              onClick={() => setCommentId((prev:any) => {
                if(prev == comment?._id){
                  setUserTag(null)
                  return null
                }else{
                  return comment._id
                }
              })} // Toggle hiển thị bình luận trả lời
              className={` cursor-pointer ${comment?._id == commentId && 'text-blue'}`}
            />
            <span className="ml-2">{comment.recomments ? comment.recomments.length : 0}</span>
          </div>
          {/* Delete button */}
          {user && user?._id == comment.userId._id && (
            <div>
              {commentMutation.isPending ? <LoadingOutlined /> : <DeleteOutlined onClick={() => handleDelete(comment._id ? comment._id : '')} className="cursor-pointer" />}
            </div>
          )}

          {(comment?.userId?._id !== user?._id && user)  && (
            <div>
              <span onClick={() => { setUserTag(comment.userId); setCommentId(comment?._id) }} className=' cursor-pointer text-xs hover:underline'>phản hồi</span>
            </div>
          )}

         </div>
        </div>
      </div>

      {/* Hiển thị các bình luận trả lời */}
      {commentId == comment?._id && <CommentExtra comment={comment} userTag={userTag} setUserTag={setUserTag} />}
    </div>
  );
};

export default CommentMain;
