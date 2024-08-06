import { DeleteOutlined, LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Rate } from 'antd'


const CommentItem = () => {
  return (
    <div className='px-3 py-1 border rounded-lg mb-4'>
    {/* header  */}
    <div className='flex'>
        <div className='flex items-center justify-center size-10 rounded-full border '>
            <UserOutlined  className='text-xl'/>
        </div>
       <div className='ml-3'>
       <h3 className=' text-blue font-semibold m-0'>Ngọc Hảo</h3>
            <Rate className='text-sm' value={5} disabled />
           <div className='flex items-center gap-x-3'>
           <p className='m-0 text-[12px]/[150%] font-light'>Hà Nội</p>
           <p className='m-0 text-[12px]/[150%] font-light'>06-08-2024</p>
           </div>

       </div>
    </div>
    {/* Content  */}
    <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quisquam enim facilis eveniet quasi laborum ipsam dolor illum dolore nemo non neque expedita dignissimos distinctio voluptates aut unde, necessitatibus facere.

        </p>
        <div className='py-2 flex flex-col'>
            <div className='self-end flex items-center'>
                <LikeOutlined className=' cursor-pointer mx-3'/>
                <MessageOutlined className=' cursor-pointer mx-3'/>
                <DeleteOutlined className=' cursor-pointer mx-3' />
            </div>
            
        </div>
    </div>


</div>
  )
}

export default CommentItem
