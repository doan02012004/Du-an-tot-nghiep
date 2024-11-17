/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { CommentOutlined, DeleteOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons'
// type CommentExtralProps = {
//     recomment: any
// }
// const CommentExtral = ({ recomment }: CommentExtralProps) => {
//     return (
//         <div className='pl-14 mt-2'>
//             {recomment?.map((comment: any) => (
//                 <div className='bg-gray-100 rounded-md p-2 mb-2'>
//                     <h5 className='text-black text-sm font-semibold'>{comment?.name}</h5>
//                     <p className='text-xs'>{comment?.comment}</p>
//                     <div className='flex justify-end gap-x-8 pr-6'>
//                         <div className='flex items-center'><LikeOutlined className=' cursor-pointer' /> <span className='ml-2'>{comment?.like.length}</span></div>
//                         <div><SendOutlined className=' cursor-pointer' /></div>
//                         <div><DeleteOutlined className=' cursor-pointer' /></div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default CommentExtral

import { LikeOutlined, LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { IComment, IReComment } from '../../../../common/interfaces/comment';
import { useContext, useEffect, useState } from 'react';
import { Iuser } from '../../../../common/interfaces/auth';
import { AppContext } from '../../../../common/contexts/AppContextProvider';


type CommentExtralProps = {
  comment: IComment;
  mainUser: any,
  setMainUser: any
};

const CommentExtral = ({ comment, mainUser, setMainUser }: CommentExtralProps) => {
  const [userTag, setUserTag] = useState<any>(null)
  const { currentUser } = useContext(AppContext)
  useEffect(() => {
    if (comment.recomments?.length == 0) {
      setUserTag(comment.userId)
    } else if (mainUser) {
      setUserTag(mainUser)
    }
  }, [comment, userTag, setUserTag, mainUser, setMainUser]);

  return (
    <div className="pl-14 mt-2">
      {comment?.recomments && comment.recomments.map((comment, index) => (
        <div key={index} className="bg-gray-100 rounded-md p-2 mb-2">
          <h5 className="text-black text-sm font-semibold">{comment?.name}</h5>
          <p className="text-xs">{comment?.comment}</p>
          <div className="flex justify-end gap-x-8 pr-6">
            <div className="flex items-center">
              <LikeOutlined className="cursor-pointer" /> <span className="ml-2">{comment.like.length}</span>
            </div>
            <div>
              <span className=' cursor-pointer text-xs hover:underline'>phản hồi</span>
            </div>
          </div>
        </div>
      ))}
      <div>
        {userTag && (
          <div>
            <div className='flex gap-x-2'>
              <h5 className=' text-black font-semibold text-sm'>@{userTag?.lastname} {userTag?.firstname}</h5>
            </div>
          </div>
        )}
        <div className=" h-12 p-2 border border-gray-300 rounded-md flex gap-x-2">
          <textarea
            name="comment"
            // value={content}
            // onChange={(e) => setContent(e.target.value)}
            placeholder={userTag ? `Phản hồi ${userTag?.lastname}  ${userTag?.firstname}` : `Bình luận với vai trò ${currentUser?.lastname}  ${currentUser?.firstname} `}
            className="w-full h-full p-2 text-sm resize-none outline-0"
          ></textarea>
          <button className="text-blue-500">
            <SendOutlined />
            {/* {commentMutation.isPending ? <LoadingOutlined /> : <SendOutlined />} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentExtral;
