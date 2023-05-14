import './Message.css';

const Message = ({ message }) => (
  <div className={`message ${message.sent ? 'sent' : 'received'}`}>
    <div className="message-content">
      {/* <div className="message-header"> */}
        {/* <span className="message-sender">{message.sender.name}</span> */}
        {/* <span className="message-time">{message.time}</span> */}
      {/* </div> */}
      <div className="message-body">{message.text}</div>
    </div>
  </div>
);

export default Message;