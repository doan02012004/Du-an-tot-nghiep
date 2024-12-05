/* eslint-disable @typescript-eslint/no-explicit-any */
import Chat from './Chat';
import iconChat from '../../../assets/logos/logoAdmin.png'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenChat } from '../../../common/redux/features/chatSlice';

const ChatWidget = () => {
  const openChat = useSelector((state:any)=> state.chat.openChat)
  const dispath = useDispatch()

  return (
    <div>
      {/* Icon chat ở góc phải */}
      <div
        onClick={() => dispath(setOpenChat(!openChat))}
        className="fixed bottom-5 right-5 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-md shadow-black z-50 bg-white"
      >
        <img
          src={iconChat}
          className=' object-cover w-full h-full'
          alt="Chat Icon"
        />
      </div>

      {/* Hộp chat khi mở */}
      {openChat && (
        <div
          className="fixed bottom-24 right-5 w-[350px] h-[500px] border border-gray-300 rounded-lg bg-white shadow-lg z-50"
        >
          <Chat />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
