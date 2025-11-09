import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Use your own CSS or Tailwind if preferred

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'You', text: input };
    setMessages([...messages, userMsg]);
    setInput('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/chat', { message: input });
      setMessages(msgs => [...msgs, { sender: 'SuMate.ai', text: response.data.reply }]);
    } catch {
      setMessages(msgs => [...msgs, { sender: 'SuMate.ai', text: 'Server error' }]);
    }
  };

  return (
    <div className="chatbox" style={{maxWidth:400,margin:"40px auto"}}>
      <h2>SuMate.ai Chatbot</h2>
      <div className="messages" style={{border:'1px solid #ccc',height:300,overflowY:'scroll',padding:10,marginBottom:10}}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.sender === 'You' ? 'right' : 'left',
            margin:"8px 0"
          }}>
            <span style={{
              background: msg.sender === 'You' ? "#e0e7ff" : "#a7f3d0",
              borderRadius:6,
              padding:"6px 12px",
              display:"inline-block",
              maxWidth:"70%"
            }}>
              <b>{msg.sender === 'You' ? 'You' : 'SuMate.ai'}</b>: {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{display:'flex'}}>
        <input
          style={{flex:1,marginRight:8,padding:8}}
          value={input}
          placeholder="Type a message"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==="Enter"&&sendMessage()}
        />
        <button style={{padding:'8px 16px'}} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
