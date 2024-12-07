/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleOutlined, LoadingOutlined, SendOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'
import useCommentMutation from '../../../../../common/hooks/comments/useCommentMutation';
import { message, Rate } from 'antd';
import { AppContext } from '../../../../../common/contexts/AppContextProvider';

type CommentFormProps = {
    item: any,
    setDataComment:any,
    orderId:string
};
const CommentForm = ({ item,setDataComment,orderId }: CommentFormProps) => {
    const { currentUser } = useContext(AppContext)
    const [content, setContent] = useState('');
    const [rate, setRate] = useState<number>(5)
    const commentMutation = useCommentMutation();

    const handleSubmit = () => {
        if (!content.trim()) return; // Kiểm tra nội dung rỗng
        if (!currentUser?._id) {
            setContent('')
            return message.error('Bạn cần đăng nhập để đánh giá')
        }
        commentMutation.mutate({ action: 'add', newComment: { orderId:orderId, userId: currentUser?._id, comment: content, rate, item } })
        setContent('');
        setRate(1)
        setDataComment(null)
    };
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-400/40 flex justify-center items-center z-50'>
            <div className=' relative max-w-[500px] w-full px-4 py-3 shadow shadow-black rounded-lg bg-white '>
                <h2 className=' uppercase font-semibold text-lg w-max mx-auto mb-4 text-black'>Đánh giá</h2>
                <CloseCircleOutlined onClick={()=>setDataComment(null)} className=' absolute top-2 right-2 text-2xl cursor-pointer hover:text-red' />
                <div className="flex items-center it py-4">
                    <img src={item?.gallery?.avatar || 'https://via.placeholder.com/80'} alt={item.name} className="w-20 h-[84px] rounded-lg mr-4 object-cover" />
                    <div className="flex-grow">
                        <span className="font-medium text-gray-800">{item?.name}</span><br />
                        <span>Màu:{item?.attribute?.color}</span><br /><span>Size:{item?.attribute?.size}</span>
                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="">
                        <p className="font-semibold text-gray-800">
                            {(item.price * item.quantity).toLocaleString()}₫
                        </p>
                    </div>

                </div>
                <div className='flex items-center pb-3 bg-white'>
                    <h5 className='m-0'>Đánh giá:</h5>
                    <Rate className='ml-2' defaultValue={rate} onChange={(value) => setRate(value)} />
                </div>
                <div className=" h-16 p-2 border border-gray-300 rounded-md flex gap-x-2">
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
            </div>

        </div>
    )
}

export default CommentForm