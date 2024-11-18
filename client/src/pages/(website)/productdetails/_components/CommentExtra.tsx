/* eslint-disable @typescript-eslint/no-explicit-any */


import { CloseCircleFilled, DeleteOutlined, LikeOutlined, LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { IComment, } from '../../../../common/interfaces/comment';
import { useContext, useEffect, useState, } from 'react';

import { AppContext } from '../../../../common/contexts/AppContextProvider';
import { message } from 'antd';
import useCommentMutation from '../../../../common/hooks/comments/useCommentMutation';


type CommentExtralProps = {
  comment: IComment;
  userTag: any,
  setUserTag: any
};

const CommentExtra = ({ comment, userTag, setUserTag }: CommentExtralProps) => {
  const [contentExtra, setContentExtra] = useState<string>('')
  const { currentUser } = useContext(AppContext)
  const commentMutation = useCommentMutation()
  useEffect(() => {
    if (comment.recomments?.length == 0) {
      if (comment?.userId?._id !== currentUser?._id) {
        setUserTag(comment.userId)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment?.recomments, setUserTag, currentUser]);


 
  const handleSubmit = () => {
    if (!contentExtra.trim()) return; // Kiểm tra nội dung rỗng
    if (!currentUser) {
      setContentExtra('')
      return message.error('Bạn cần đăng nhập để đánh giá')
    }
    commentMutation.mutate({ action: 'addExtra', newComment: { commentId: comment._id, recomment: { userId: currentUser._id, text: contentExtra.toString(), tag: userTag ? userTag?._id : null } } })
    setContentExtra('');
    setUserTag(null)
  };
  const handleDeleteExtra = async (recommentId: string|number) => {
    commentMutation.mutate({ action: 'deleteExtra', newComment: { commentId: comment._id, recommentId:recommentId } })
  };
  return (
    <div  className="pl-16 mt-2 ">
      {comment?.recomments && comment.recomments.map((comment) => (
        <div key={comment?._id} className="bg-gray-100 rounded-md p-2 mb-2">
          <h5 className="text-black text-sm font-semibold">{comment.userId.lastname} {comment.userId.firstname}</h5>
          <p className="text-xs" style={{overflowWrap:'break-word',wordWrap:'break-word'}}> <span className=' text-xs font-semibold text-blue mr-2'>{comment.tag?.lastname} {comment.tag?.firstname}</span> {comment?.comment.toString()}</p>
          <div className="flex justify-end gap-x-8 pr-6">
           {currentUser && (
             <div className="flex items-center">
             <LikeOutlined className="cursor-pointer" /> <span className="ml-2">{comment.like.length}</span>
           </div>
           )}
           {
            currentUser?._id == comment?.userId?._id && (
              <div>
              {commentMutation.isPending ? <LoadingOutlined /> : <DeleteOutlined onClick={() => handleDeleteExtra(comment?._id ? comment._id : '')} className="cursor-pointer hover:text-red" />}
            </div>
            )
           }
            {(comment?.userId?._id !== currentUser?._id  && currentUser)&& (
              <div>
                <span onClick={() => { setUserTag(comment.userId)}} className=' cursor-pointer text-xs hover:underline'>phản hồi</span>
              </div>
            )}
          </div>
        </div>
      ))}
      <div>
        {userTag && (
          <div>
            <div>
              <div className='flex gap-x-2 w-max relative'>
                <h5 className=' text-black font-semibold text-sm'>@{userTag?.lastname} {userTag?.firstname}</h5>
                <CloseCircleFilled onClick={()=>setUserTag(null)} className=' absolute  -right-5 cursor-pointer hover:text-red ' />
              </div>
            </div>
          </div>
        )}
        <div className=" h-12 p-2 border border-gray-300 rounded-md flex gap-x-2">
          <textarea
            name="comment"
            value={contentExtra}
            onChange={(e) => setContentExtra(e.target.value)}
            placeholder={userTag ? `Phản hồi ${userTag?.lastname}  ${userTag?.firstname}...` : (currentUser ? `Bình luận với vai trò ${currentUser?.lastname}  ${currentUser?.firstname}...` : 'Đăng nhập để đánh giá...')}
            className="w-full h-full p-2 text-sm resize-none outline-0"
          ></textarea>
          <button className="text-blue-500">
            {commentMutation.isPending ? <LoadingOutlined /> : <SendOutlined onClick={handleSubmit} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentExtra;
