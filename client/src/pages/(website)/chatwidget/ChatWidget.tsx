import { useState } from 'react';
import Chat from './Chat';

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
        className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer shadow-lg z-50"
      >
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/chat.png"
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
