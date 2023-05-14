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

  


  const handleAddUsers = () => {
    const userAdd = prompt("введите номер пользователя", "79250589069@c.us")
    const user = {id: userAdd, name: userAdd}
    setUserList([...userList, user])
    setchatName(userAdd)
    handleGetJurnal(userAdd)
  }
      
  const handleGetJurnal = async (chatId) => {
    const response = await jurnals(chatId);
    
    const a = response.map((i, id) => {
      return( {
        id: i.idMessage,
        text: i.textMessage,
        sent: i.sendByApi
        })
    })
    setMessages(a.reverse());
  }
 

  const handleSendMessage = async (newMessage) => {
    const response = await sendMessage( newMessage.text , chatName);
    newMessage.id = response.idMessage
    setMessages([...messages, newMessage]);
    console.log(messages)
  };

  const handleGetMessages = async () => {
    const response = await getMessages();
    if(response == null){
      console.log("ничего нет")
    } else {
      const sent = response.body.typeWebhook === "incomingMessageReceived" ? false : true;
      const newMessage = {
        id: response.body.idMessage,
        text: response.body.messageData.textMessageData.textMessage,
        sent: sent
      }
      setMessages([...messages, newMessage]);
      deletes(response.receiptId)
    }
  }

  const deletes = async (id) => {
    await delMessages(id);
  };





  return(
    <>
      <button onClick={handleAddUsers}>Add users</button>
      <div className="home">
          <div className="chat-list">
              <Header title="7-xxx-xxx-xx-xx@c.us" />
              <UserList users={userList} />
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




