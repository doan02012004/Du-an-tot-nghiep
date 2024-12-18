/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleFilled, DeleteOutlined, LikeOutlined, LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState, } from 'react';
import { message } from 'antd';
import { IComment } from '../../../../../common/interfaces/comment';
import { AppContext } from '../../../../../common/contexts/AppContextProvider';
import useCommentMutation from '../../../../../common/hooks/comments/useCommentMutation';
import { formatDateComment } from '../../../../../common/utils/product';



type CommentExtralProps = {
  comment: IComment;
  userTag: any,
  setUserTag: any
};

const CommentExtraAdmin = ({ comment, userTag, setUserTag }: CommentExtralProps) => {
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
  const handleDeleteExtra = async (recommentId: string | number) => {
    commentMutation.mutate({ action: 'deleteExtra', newComment: { commentId: comment._id, recommentId: recommentId } })
  };
  // toggleLike 
  const onHandleLikeExtra = (recommentId:string|number) =>{
    commentMutation.mutate({action:'likeExtra',newComment:{commentId:comment._id,userId:currentUser?._id,recommentId}})
  }
  return (
    <div className="pl-16 mt-2 ">
      {comment?.recomments && comment.recomments.map((recomment) => (
        <div key={recomment?._id} className="bg-gray-100 rounded-md p-2 mb-2">
          {recomment?.userId?.role == 'admin' ?
            (<h5 className="text-rose-900 text-sm font-semibold">Fendi Shop</h5>)
            :
            (
              <h5 className="text-black text-sm font-semibold">{recomment?.userId?.lastname} {recomment?.userId?.firstname}</h5>
            )}
          <p className="text-xs" style={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}> {recomment?.tag && (<span className=' text-xs font-semibold text-blue mr-2'>{recomment?.tag?.role == 'admin'?'Fendi Shop': `${recomment?.tag?.lastname} ${recomment?.tag?.firstname}`}</span>)} {recomment?.comment.toString()}</p>
          <div className="flex justify-between items-center">
          <div className='text-xs text-black font-medium'>
            {formatDateComment(recomment?.createdAt)}
          </div>
            <div className="flex gap-x-8 pr-5">
              {currentUser && (
                <div className="flex items-center">
                  <LikeOutlined onClick={() =>onHandleLikeExtra(recomment._id)}  className={` ${recomment?.likes?.includes(currentUser?._id) && 'text-blue'} cursor-pointer `} /> <span className="ml-2">{recomment?.likes?.length}</span>
                </div>
              )}
              {
                currentUser?._id == recomment?.userId?._id && (
                  <div>
                    {commentMutation.isPending ? <LoadingOutlined /> : <DeleteOutlined onClick={() => handleDeleteExtra(recomment?._id ? recomment._id : '')} className="cursor-pointer hover:text-red" />}
                  </div>
                )
              }
              {(recomment?.userId?._id !== currentUser?._id && currentUser) && (
                <div>
                  <span onClick={() => { setUserTag(recomment?.userId) }} className=' cursor-pointer text-xs hover:underline'>phản hồi</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div>
        {userTag && (
          <div>
            <div>
              <div className='flex gap-x-2 w-max relative'>
                <h5 className=' text-black font-semibold text-sm'>@{userTag?.role == 'admin'?'Fendi Shop': `${userTag?.lastname} ${userTag?.firstname}`}</h5>
                <CloseCircleFilled onClick={() => setUserTag(null)} className=' absolute  -right-5 cursor-pointer hover:text-red ' />
              </div>
            </div>
          </div>
        )}
        <div className=" h-12 p-2 border border-gray-300 rounded-md flex gap-x-2">
          <textarea
            name="comment"
            value={contentExtra}
            onChange={(e) => setContentExtra(e.target.value)}
            placeholder={userTag ? (userTag.role!=='admin'? `Phản hồi ${userTag?.lastname}  ${userTag?.firstname}...`: `Phản hồi Fendi Shop...`) : (currentUser ? (currentUser.role == 'admin' ? `Bình luận với vai trò Fendi Shop...` : `Bình luận với vai trò ${currentUser?.lastname}  ${currentUser?.firstname}...`) : 'Đăng nhập để đánh giá...')}
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

export default CommentExtraAdmin;
