import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import AvailableChat from '../components/AvailableChat';
import Conversation from '../components/Conversation';
import Message from '../components/Message';
import Topbar from '../components/Topbar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {io} from 'socket.io-client';

function Messenger() {
    const [conversations,setConversations] = useState([]);
    const [currentChat,setCurrentChat] = useState(null);
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const {user} = useContext(AuthContext);
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect(()=>{
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage",data => {
        setArrivalMessage({
          sender:data.senderId,
          text:data.text,
          createdAt:Date.now(),
        })
      });
    },[])

    useEffect(()=> {
      arrivalMessage && currentChat && currentChat.members.includes(arrivalMessage.sender) &&
      setMessages(prev=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat]);

    useEffect(()=> {
      socket.current.emit("sendUser",user._id);
      socket.current.on("getUsers",users=>{
        setOnlineUsers(user.following.filter(f=>users.some(u=>u.userId === f)));
      })
    },[user]);
    useEffect(()=> {
      const getConversations = async () => {
        try{
        const res = await axios.get('/conversations/'+user._id);
        setConversations(res.data);
        } catch(err) {
          console.log(err);
        }
      }
      getConversations();
    },[user])

    useEffect(()=> {
      const getMessages = async () => {
        try { 
          const res = await axios.get("/messages/" + currentChat._id)
          setMessages(res.data);
        } catch(err) {
          console.log(err);
        }
      }
      getMessages();
    },[currentChat]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        coversationId: currentChat._id,
      }
      const receiverId = currentChat.members.find(member=>member!==user._id);
      socket.current.emit("sendMessage",{
        senderId:user._id,
        receiverId,
        text: newMessage,
      });

      try {
        const res = await axios.post("/messages",message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch(err) {}
    }
    useEffect(()=>{
      scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth" });
    },[messages])
    return (
      <React.Fragment>
        <Topbar />
        <Container>
          <ChatMenu>
            <ChatMenuWrapper>
              <ChatMenuInput placeholder="Search for friends" /> 
              {
                conversations.map((conversation)=>(<div onClick={()=>setCurrentChat(conversation)}><Conversation conversation={conversation} currentUser={user} /> </div>))
              }
            </ChatMenuWrapper>
          </ChatMenu>
          <ChatBox>
            <ChatBoxWrapper>
              { currentChat ?  <React.Fragment>
              <ChatBoxTop>
                {
                  messages.map((message)=>(
                    <div ref={scrollRef}>
                    <Message message={message} mine={message.sender === user._id}  />
                    </div>
                  ))
                }
              </ChatBoxTop>
              <ChatBoxBottom>
                <ChatMessageInput placeholder="Write your message..." onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} />
                <ChatSubmitButton onClick={handleSubmit} >Send</ChatSubmitButton>
              </ChatBoxBottom> </React.Fragment>: <NoConversation>Open a conversation to start a Chat</NoConversation>
}
            </ChatBoxWrapper>
          </ChatBox>
          <ChatOnline>
            <ChatOnlineWrapper>
              <AvailableChat onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
            </ChatOnlineWrapper>
          </ChatOnline>
        </Container>
      </React.Fragment>
    );
}

export default Messenger

const Container = styled.div`
height: calc(100vh - 70px);
display:flex;
`;
const ChatMenu = styled.div`
flex:3;
`;

const ChatMenuWrapper = styled.div`
padding:10px;
height:100%;
`;

const ChatMenuInput = styled.input`
width:90%;
padding:10px 0;
border:none;
border-bottom:1px solid gray;
background-color:transparent;
:focus {
    outline:none;
}
`;

const ChatBox = styled.div`
flex:6;
background-color:#f1f1f1;
`;

const ChatBoxWrapper = styled.div`
padding:10px;
height:100%;
display:flex;
flex-direction:column;
justify-content:space-between;
position:relative;
`;

const ChatBoxTop = styled.div`
height:100%;
overflow-y :scroll;

&::-webkit-scrollbar {
  display:none;
}
`;

const ChatBoxBottom = styled.div`
margin-top:5px;
display:flex;
align-items:center;
justify-content:space-between;
`;

const ChatMessageInput = styled.textarea`
width:80%;
height:60px;
padding:10px;
`;

const ChatSubmitButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #e27d60;
  color:white;
`;

const NoConversation = styled.span`
position:absolute;
top:10%;
font-size:50px;
color:rgb(224,220,220);
cursor:default;
`;

const ChatOnline = styled.div`
flex:3;
`;

const ChatOnlineWrapper = styled.div`
padding:10px;
height:100%;
`;
