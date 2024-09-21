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
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007AFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 2000,
        }}
      >
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/chat.png"
          alt="Chat Icon"
        />
      </div>

      {/* Hộp chat khi mở */}
      {isChatOpen && (
        <div
          style={{
            
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '300px',
            height: '460px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 2000,
          }}
        >
          <Chat />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
