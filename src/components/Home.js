import "./Home.css"
import {useState} from "react"
import MessageInput from "./MessageInput/MessageInput"
import MessageList from "./MessageList/MessageList"
import Header from "./Header/Header"
import UserList from "./UserList/UserList"

import { sendMessage, getMessages, delMessages, jurnals } from "./api/api";

function Home (){
  const [userList, setUserList] = useState([]);
  const [chatName, setchatName] = useState("");
  const [messages, setMessages] = useState([]);
  
  const dataTime = (time) => {
    const timestamp = time; 
    const date = new Date(timestamp * 1000); 
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return  `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  const handleAddUsers = () => {
    const userAdd = prompt("введите номер пользователя", "79250589069@c.us")
    const user = {id: userAdd, name: userAdd, newMessage: false}
    setUserList([...userList, user])
    
    handleGetJurnal(userAdd)
  }
      
  const handleGetJurnal = async (chatId) => {
    const response = await jurnals(chatId);
    
    const a = response.map((i, id) => {
      return( {
        id: i.idMessage,
        text: i.textMessage,
        sent: i.sendByApi,
        time: dataTime(i.timestamp)
        })
    })
    setchatName(chatId)
    setMessages(a.reverse());
  }
 

  const handleSendMessage = async (newMessage) => {
    const response = await sendMessage( newMessage.text , chatName);
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    newMessage.id = response.idMessage
    newMessage.time = time
    
    setMessages([...messages, newMessage]);
  };

  const handleGetMessages = async () => {
    const response = await getMessages();
    
    if(response === null){
      console.log("ничего нет")
    } else if(response.body.senderData.sender === chatName) {
      const sent = response.body.typeWebhook === "incomingMessageReceived" ? false : true;
      const newMessage = {
        id: response.body.idMessage,
        text: response.body.messageData.textMessageData.textMessage,
        sent: sent,
        time: dataTime(response.body.timestamp)
      }
      setMessages([...messages, newMessage]);
      deletes(response.receiptId)
    } else {

      setUserList(userList.map(i => {
        if(i.id === response.body.senderData.sender){
          i.newMessage = true
          console.log("сообщение в другом чате")
        }
        return i
      }))
      deletes(response.receiptId)
    }
  }
  

  const deletes = async (id) => {
    await delMessages(id);
  };

  const handleUserClick = (userId) => {
    setUserList(userList.map(i => {
      if(i.id === userId){
        i.newMessage = false
      }
      return i
    }))
    handleGetJurnal(userId)
  };

  return(
    <>
      <button onClick={handleAddUsers}>Add users</button>
      <div className="home">
          <div className="chat-list">
              <Header title="7-xxx-xxx-xx-xx@c.us" />
              <UserList users={userList} onUserClick={handleUserClick} />
          </div>
          <div className="chat">
              <Header title={chatName} />
              <MessageList messages={messages}/>
              <MessageInput onSendMessage={handleSendMessage}/>
          </div>
      </div>
      <button onClick={handleGetMessages}>Get Messages</button>
    </>
  )
}

export default Home




