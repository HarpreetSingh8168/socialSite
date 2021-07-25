import React from 'react'
import styled from 'styled-components';
import {format} from 'timeago.js';

function Message({message,mine}) {
    return (
      <Container mine={mine}>
        <MessageTop>
          <MessageImg
            src="https://images.unsplash.com/photo-1626833449760-d75b498a0059?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80"
            alt=""
          />
          <MessageText mine={mine}>{message.text}</MessageText>
        </MessageTop>
        <MessageBottom>{format(message.createdAt)}</MessageBottom>
      </Container>
    );
}

export default Message

const Container = styled.div`
display:flex;
flex-direction:column;
margin-top:20px;
align-items:${props => props.mine ? "flex-end" : "flex-start"};
`;

const MessageTop = styled.div`
display:flex;
`;

const MessageImg = styled.img`
width:32px;
height:32px;
border-radius:50%;
object-fit:cover;
margin-right:10px;
`;

const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.mine ? "white" : "#25ba90")};
  color: ${(props) => (props.mine? "black" : "white")};
  max-width: 300px;
  border: 1px solid ${(props) => (props.mine ? "#25ba90" : "white")};
`;

const MessageBottom = styled.div`
font-size:12px;
margin-top:10px;
`;
