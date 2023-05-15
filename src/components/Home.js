import "./Home.css";
import { useState, useEffect} from "react";
import MessageInput from "./MessageInput/MessageInput";
import MessageList from "./MessageList/MessageList";
import Header from "./Header/Header";
import UserList from "./UserList/UserList";
import { sendMessage, getMessages, delMessages, jurnals } from "./api/api";

function Home() {
  const [userList, setUserList] = useState([]);
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    const interval = setInterval(handleGetMessages, 5000);
    console.log("Обновлено")
    return () => clearInterval(interval);
  });


  const handleAddUser = () => {
    const userAdd = prompt("Введите номер пользователя", "7-xxx-xxx-xx-xx@c.us");
    if (userAdd) {
      const newUser = { id: userAdd, name: userAdd, newMessage: false };
      setUserList((prevUserList) => [...prevUserList, newUser]);
      handleGetJurnal(userAdd);
    }
  };


  const handleGetJurnal = async (chatId) => {
    const response = await jurnals(chatId);
    const messagesData = response.map((i) => ({
      id: i.idMessage,
      text: i.textMessage,
      sent: i.sendByApi,
      time: dataTime(new Date(i.timestamp * 1000))
    }));
    setChatName(chatId);
    setMessages(messagesData.reverse());
  };


  const dataTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };


  const handleSendMessage = async (newMessage) => {
    const response = await sendMessage(newMessage.text, chatName);
    const time = dataTime(new Date());
    newMessage.id = response.idMessage;
    newMessage.time = time;
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };


  const handleGetMessages = async () => {
    const response = await getMessages();
    if (response === null) {
      console.log("Ничего нет");
    } else if (response.body.senderData.sender === chatName) {
      const sent = response.body.typeWebhook === "incomingMessageReceived" ? false : true;
      const newMessage = {
        id: response.body.idMessage,
        text: response.body.messageData.textMessageData.textMessage,
        sent: sent,
        time: dataTime(new Date(response.body.timestamp * 1000))
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      deletes(response.receiptId);
    } else {
      setUserList((prevUserList) =>
        prevUserList.map((i) => {
          if (i.id === response.body.senderData.sender) {
            i.newMessage = true;
            console.log("Сообщение в другом чате");
          }
          return i;
        })
      );
      deletes(response.receiptId);
    }
  };


  const deletes = async (id) => {
    await delMessages(id);
  };


  const handleUserClick = (userId) => {
    setUserList((prevUserList) =>
      prevUserList.map((i) => {
        if (i.id === userId) {
          i.newMessage = false;
        }
        return i;
      })
    );
    handleGetJurnal(userId)
  };

  
  return(
      <>
        <div className="home">
            <div className="chat-list">
                <Header title="MY CHAT">
                    <div className="add-user-button" onClick={handleAddUser}></div>
                </Header>
                <UserList users={userList} onUserClick={handleUserClick} />
            </div>
            <div className="chat">
                <Header title={chatName}>
                        {/* <div className="update-user-button" onClick={handleGetMessages}></div> */}
                </Header>
                <MessageList messages={messages}/>
                <MessageInput onSendMessage={handleSendMessage}/>
            </div>
        </div>
      </>
  )
}

export default Home;
