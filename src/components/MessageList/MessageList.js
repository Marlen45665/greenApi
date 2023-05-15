
import React, { useRef, useEffect } from "react";
import "./MessageList.css";
import Message from "./Message/Message";

const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);

  const renderedMessages = messages.map((message) => (
    <Message key={message.id} message={message} />
  ));

  useEffect(() => {
    messageListRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {renderedMessages}
      <div ref={messageListRef} />
    </div>
  );
};

export default MessageList;

