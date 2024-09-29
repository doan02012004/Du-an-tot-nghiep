import useChatQuery from '../../../common/hooks/chats/useChatQuery';
import Conversation from './_component/Conversation';
import InputMessage from './_component/InputMessage';
import ProfileMemberChat from './_component/ProfileMemberChat';
import { useContext } from 'react';
import { AppContext } from '../../../common/contexts/AppContextProvider';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Thay bằng URL server Node.js nếu khác

const Chat = () => {
  const {currentUser,adminId} = useContext(AppContext)
  const chatQuery = useChatQuery({senderId:currentUser?._id,reciverId:adminId})
  
 

  return (
    <div className="flex flex-col h-full">
      {/* Thông tin admin */}
        <ProfileMemberChat/>

      {/* Phần khung chat */}
      <Conversation chatId={chatQuery?.data?._id}/>

      {/* Form gửi tin nhắn */}
      <InputMessage chatId={chatQuery?.data?._id}/>
    </div>
  );
};

export default Chat;
