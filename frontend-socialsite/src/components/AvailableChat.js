import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

function AvailableChat({onlineUsers,currentId,setCurrentChat}) {
    const [friends,setFriends] = useState([]);
    const [onlineFriends,setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=> {
      const getFriends = async () => {
        const res = await axios.get("/users/friends/"+currentId);
        setFriends(res.data);
      }
      getFriends();
    },currentId);

    useEffect(()=> {
      setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)));
    },[friends,onlineUsers]);

    const handleClick = async (user) => {
      try {
        const res=await axios.get(`/conversations/find/${currentId}/${user._id}`);
        setCurrentChat(res.data);
      } catch(err) {}
    }
    return (
      <Container>
        {onlineFriends.map((o) => (
          <ChatOnlineFriend onClick={()=>handleClick(o)}>
            <ChatOnlineFriendImgContainer>
              <ChatOnlineFriendImg
                src={o.profilePicture ? PF+o.profilePicture : PF+"person/noAvatar.png"}
                alt=""
              />
              <ChatOnlineBadge />
            </ChatOnlineFriendImgContainer>
            <ChatOnlineName>{o.username}</ChatOnlineName>
          </ChatOnlineFriend>
        ))}
      </Container>
    );
}

export default AvailableChat

const Container = styled.div``;

const ChatOnlineFriend = styled.div`
display:flex;
align-items:center;
font-weight:500;
cursor:pointer;
margin-top:10px;
`;

const ChatOnlineFriendImgContainer = styled.div`
position:relative;
margin-right:10px;
`;

const ChatOnlineFriendImg = styled.img`
width:32px;
height:32px;
border-radius:50%;
object-fit:cover;
`;

const ChatOnlineBadge = styled.div`
width:10px;
height:10px;
border-radius:50%;
background-color:limegreen;
position:absolute;
top:1px;
right:1px;
border:1px solid white;
`;

const ChatOnlineName = styled.span``;
