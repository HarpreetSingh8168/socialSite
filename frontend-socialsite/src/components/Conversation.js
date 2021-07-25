import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

function Conversation({conversation,currentUser}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friend,setFriend] = useState(null);
    useEffect(()=> {
      const friendId = conversation ? conversation.members.find((m)=> m!==currentUser._id) : null;

      const getFriend = async () => {
        try {
        const res = await axios.get('/users?userId='+friendId);
        setFriend(res.data);
        } catch(err) {
          console.log(err);
        }
      };
      getFriend();
    },[currentUser,conversation]);
    return (
      <Container>
        {friend && (
          <React.Fragment>
            <ConversationImg
              src={
                friend.profilePicture
                  ? PF + friend.profilePicture
                  : PF + "/person/noAvatar.png"
              }
              alt=""
            />
            <ConversationName>{friend.username}</ConversationName>
          </React.Fragment>
        )}
      </Container>
    );
}

export default Conversation

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  :hover {
    background-color: #a2d9ce;
  }
`;

const ConversationImg = styled.img`
width:40px;
height:40px;
border-radius:50%;
object-fit:cover;
margin-right:20px;
`;

const ConversationName = styled.span`
font-weight:500;
`;


