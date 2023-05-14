import "./MessageList.css"
import Message from "./Message/Message"


const MessageList = ({ messages }) => {
  const renderedMessages = messages.map((message) => (
    <Message key={message.id} message={message}/>
  ));

  return <div className="message-list">{renderedMessages}</div>;
};

export default MessageList;