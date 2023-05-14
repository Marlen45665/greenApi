import './Message.css';

const Message = ({ message}) => (
  <div className={`message ${message.sent ? 'sent' : 'received'}`}>
    <div className="message-content">
      <div className="message-body">{message.text}
        <span className="message-time">{message.time}</span>
      </div>
    </div>
  </div>
);

export default Message;