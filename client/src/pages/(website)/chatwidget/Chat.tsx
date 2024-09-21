import { useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Thay bằng URL server Node.js nếu khác

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages] = useState([]);

  //   useEffect(() => {
  //     // Lắng nghe sự kiện 'chat message' từ server
  //     socket.on('chat message', (msg) => {
  //       setMessages((prevMessages) => [...prevMessages, msg]);
  //     });

  //     // Clean up khi component bị unmount
  //     return () => {
  //       socket.off('chat message');
  //     };
  //   }, []);

  //   const sendMessage = (e) => {
  //     e.preventDefault();
  //     if (message.trim()) {
  //       // Gửi tin nhắn tới server
  //       socket.emit('chat message', message);
  //       setMessage(''); // Xóa nội dung input sau khi gửi
  //     }
  //   };

  return (
    <div>
      {/* Thông tin admin */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <img
          src="https://i.pravatar.cc/300"
          alt="Admin Fendi Avatar"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '10px',
          }}
        />
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}> Fendi Shop</span>
      </div>

      {/* Phần khung chat */}
      <div style={{ height: '350px', overflowY: 'scroll', border: '1px solid #ccc'}}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '8px' }}>{msg}</div>
        ))}
      </div>
      {/* onSubmit={sendMessage} -- bỏ vô form bên dưới
       */}
      <form style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '20px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border 0.3s',
          }}
          onFocus={(e) => e.target.style.border = '1px solid #007AFF'}
          onBlur={(e) => e.target.style.border = '1px solid #ccc'}
        />
        <button className='btn-sendMessage' type="submit"
          style={{
            backgroundColor: '#007AFF',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={() => {
            (document.querySelector('btn-sendMessage') as HTMLElement).style.backgroundColor = '#005BBB';
          }}
          onMouseLeave={() => {
            (document.querySelector('btn-sendMessage') as HTMLElement).style.backgroundColor = '#007AFF';
          }}
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default Chat;
