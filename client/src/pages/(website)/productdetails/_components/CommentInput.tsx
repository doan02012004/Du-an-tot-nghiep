// import { LoadingOutlined, SendOutlined } from '@ant-design/icons'
// import { useState } from 'react'


// // Nhận tham số productId 
// const CommentInput = () => {
//     const [loading,setLoading] = useState(false)
//   return (
//     <div className=' absolute bottom-1 left-0 right-0 h-16 p-2 border border-gray-300 rounded-md flex gap-x-2'>
//         <textarea
//          disabled={loading}
//           name='comment'
//           placeholder='Nhập bình luận ...'
//           className='w-full h-full p-2 text-base resize-none outline-0 '

//         ></textarea>
//         <button className=''>
//             {loading ? <LoadingOutlined /> : <SendOutlined />}
//         </button>
//       </div>
//   )
// }

// export default CommentInput

import { useState } from 'react';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import useCommentMutation from '../../../../common/hooks/comments/useCommentMutation';

type CommentInputProps = {
  productId: string | number; // Sử dụng productId để gửi lên backend
  userId: string; // Sử dụng userId của người dùng thực tế
};

const CommentInput = ({ productId, userId }: CommentInputProps) => {
  const [content, setContent] = useState('');
  const commentMutation = useCommentMutation()
  const handleSubmit = () => {
    if (!content.trim()) return; // Kiểm tra nội dung rỗng
    commentMutation.mutate({ action: 'add', newComment: {  productId, userId, comment: content } })
    setContent('');
  };

  return (
    <div className="absolute bottom-1 left-0 right-0 h-16 p-2 border border-gray-300 rounded-md flex gap-x-2">
      <textarea
        disabled={commentMutation.isPending}
        name="comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập bình luận ..."
        className="w-full h-full p-2 text-base resize-none outline-0"
      ></textarea>
      <button onClick={handleSubmit} disabled={commentMutation.isPending} className="text-blue-500">
        {commentMutation.isPending ? <LoadingOutlined /> : <SendOutlined />}
      </button>
    </div>
  );
};

export default CommentInput;

