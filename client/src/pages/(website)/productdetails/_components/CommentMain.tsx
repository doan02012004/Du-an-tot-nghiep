/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentOutlined, DeleteOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons'
import { useState } from 'react'
import CommentExtral from './CommentExtral'

type CommentMainProps ={
    comment:any
}
const CommentMain = ({comment}:CommentMainProps) => {
    const [showCommentExtral,setShowCommentExtral] = useState<boolean >(false)
  return (
    <div>
    {/* comment main  */}
    <div className='bg-gray-100 rounded-md p-2 '>
      <h5 className='text-black text-base font-semibold'>{comment?.name}</h5>
      <p>{comment?.comment}</p>
      <div className='flex justify-end gap-x-8 pr-6'>
        <div className='flex items-center'><LikeOutlined className=' cursor-pointer' /> <span className='ml-2'>{comment?.like.length}</span></div>
        <div className='flex items-center'><CommentOutlined onClick={()=> ( comment?.recomment.length > 0 && showCommentExtral == false )? setShowCommentExtral(true) : setShowCommentExtral(false) } className=' cursor-pointer' /> <span className='ml-2'>{comment?.recomment.length}</span></div>
        <div><SendOutlined className=' cursor-pointer' /></div>
        <div><DeleteOutlined className=' cursor-pointer' /></div>
      </div>
    </div>
    {/* comment extral  */}
        {showCommentExtral && (
            <CommentExtral recomment={comment.recomment} />
        )}
  </div>
  )
}

export default CommentMain