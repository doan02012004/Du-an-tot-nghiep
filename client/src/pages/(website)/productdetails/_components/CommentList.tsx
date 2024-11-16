/* eslint-disable @typescript-eslint/no-explicit-any */
import {  SendOutlined } from '@ant-design/icons'

import CommentMain from './CommentMain'
import CommentInput from './CommentInput'

const data = [
  {
    _id:"shdakdhhfreuhjcndjc37464",
    name:"Bùi Văn Đoàn",
    like:['sdhsd','sdshdh','jdfhdfhj'],
    comment:"Sản phẩm này chất lượng",
    rating:4.5,
    recomment:[
      {
        name:"Tuấn Anh",
        like:['sdhsd','sdshdh','jdfhdfhj'],
        comment:"Tôi cũng thấy vậy",
      },
      {
        name:"Trọng Lào",
        like:['sdhsd','sdshdh','jdfhdfhj'],
        comment:"Tôi cũng thấy vậy",
      },
      {
        name:"Hiếu Hâm",
        like:['sdhsd','sdshdh','jdfhdfhj'],
        comment:"Bọn này nói phét",
      },
    ]
    // recomment:[]
  },
  {
    _id:"shdakdhdfdf3434euhjcndjc37464",
    name:"Tuấn Anh",
    like:['sdhsd','sdshdh','jdfhdfhj'],
    comment:"Sản phẩm này chất lượng",
    rating:4.5,
    recomment:[
      {
        name:"Văn Đoàn",
        like:['sdhsd','sdshdh','jdfhdfhj'],
        comment:"Tôi cũng thấy vậy",
      },
      {
        name:"Trọng Lào",
        like:['sdhsd','sdshdh','jdfhdfhj'],
        comment:"Tôi cũng thấy vậy",
      },
      {
        name:"Hiếu Hâm",
        like:['sdhsd','sdshdh','jdfhdfhj'],
        comment:"Bọn này nói phét",
      },
    ]
    // recomment:[]
  }
]
const CommentList = () => {
  return (
    <div className='relative w-full h-96 pb-16'>
      {/* message box  */}
      <div className=' h-[calc(380px-70px)] flex flex-col gap-4  w-full overflow-y-auto'>
        {data?.map((comment:any) =>(

        <CommentMain key={comment._id} comment={comment} />
        ))}
        {/* <CommentMain />
        <CommentMain />
        <CommentMain /> */}
      </div>
      {/* comment input  */}
     <CommentInput />
    </div>
  )
}

export default CommentList