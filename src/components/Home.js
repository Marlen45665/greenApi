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
        if(userAdd !== undefined && userAdd !== null && userAdd !== ""){
            const newUser = {id: userAdd, name: userAdd, newMessage: false}
            setUserList([...userList, newUser])
            handleGetJurnal(userAdd)
        } 
    }

    const handleGetJurnal = async (chatId) => {
        const response = await jurnals(chatId);
        const a = response.map((i) => {
        return( {
            id: i.idMessage,
            text: i.textMessage,
            sent: i.sendByApi,
            time: dataTime(new Date(i.timestamp * 1000))
            })
        })
        setchatName(chatId)
        setMessages(a.reverse());
    }

    const dataTime = (date) => { 
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return  `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    const handleSendMessage = async (newMessage) => {
        const response = await sendMessage( newMessage.text , chatName);
        const time = dataTime(new Date())
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
            time: dataTime(new Date(response.body.timestamp * 1000))
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
            <div className="home">
                <div className="chat-list">
                    <Header title="7-xxx-xxx-xx-xx@c.us">
                        <div className="add-user-button" onClick={handleAddUsers}></div>
                    </Header>
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




