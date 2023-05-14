import React, { useState } from 'react';
import "./MessageInput.css"


const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() === '') return;
    onSendMessage({ text, sent: true, key: text});
    setText('');
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;