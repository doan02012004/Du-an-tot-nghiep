/* eslint-disable @typescript-eslint/no-explicit-any */

import { Ichatmember } from '../../../../common/interfaces/chat';
import Member from './Member';


type Props = {
    listChat : Ichatmember[],
    setChatId:any,
    setUserMessage:any,
    chatId:null|string
}
const ListMember = ({listChat,setChatId,chatId,setUserMessage}:Props) => {
   

  return (
    <div className="w-1/4 bg-gray-50 p-4 border-r border-gray-300">
    <h2 className="text-lg font-semibold mb-4">Người dùng</h2>
    <div className='w-full overflow-y-auto'>
        {listChat?.map((item:Ichatmember)=>(
            <Member key={item?._id} chat={item} setChatId={setChatId} chatId={chatId} setUserMessage={setUserMessage}/>
        ))}
    </div>
</div>
  )
}

export default ListMember