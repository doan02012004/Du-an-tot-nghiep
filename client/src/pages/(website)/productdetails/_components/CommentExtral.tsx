/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentOutlined, DeleteOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons'
type CommentExtralProps = {
    recomment: any
}
const CommentExtral = ({ recomment }: CommentExtralProps) => {
    return (
        <div className='pl-14 mt-2'>
            {recomment?.map((comment: any) => (
                <div className='bg-gray-100 rounded-md p-2 mb-2'>
                    <h5 className='text-black text-sm font-semibold'>{comment?.name}</h5>
                    <p className='text-xs'>{comment?.comment}</p>
                    <div className='flex justify-end gap-x-8 pr-6'>
                        <div className='flex items-center'><LikeOutlined className=' cursor-pointer' /> <span className='ml-2'>{comment?.like.length}</span></div>
                        <div><SendOutlined className=' cursor-pointer' /></div>
                        <div><DeleteOutlined className=' cursor-pointer' /></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentExtral