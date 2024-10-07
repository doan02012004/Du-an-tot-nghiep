import { useState } from 'react';
import Chat from './Chat';
import iconChat from '../../../assets/icons/facebook-chat-icon.png'

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Icon chat ở góc phải */}
      <div
        onClick={toggleChat}
        className="fixed bottom-5 right-5 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50 bg-white"
      >
        <img
          src={iconChat}
          className=' object-cover w-full h-full'
          alt="Chat Icon"
        />
      </div>

      {/* Hộp chat khi mở */}
      {isChatOpen && (
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
