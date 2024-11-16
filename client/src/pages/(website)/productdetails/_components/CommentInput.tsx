import { LoadingOutlined, SendOutlined } from '@ant-design/icons'
import { useState } from 'react'


// Nhận tham số productId 
const CommentInput = () => {
    const [loading,setLoading] = useState(false)
  return (
    <div className=' absolute bottom-1 left-0 right-0 h-16 p-2 border border-gray-300 rounded-md flex gap-x-2'>
        <textarea
         disabled={loading}
          name='comment'
          placeholder='Nhập bình luận ...'
          className='w-full h-full p-2 text-base resize-none outline-0 '

        ></textarea>
        <button className=''>
            {loading ? <LoadingOutlined /> : <SendOutlined />}
        </button>
      </div>
  )
}

export default CommentInput