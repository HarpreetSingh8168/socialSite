import React from 'react'
import styled from "styled-components";

function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <RightBarFriend>
        <RightBarFriendImgContainer>
          <RightBarFriendImg
            src={PF + user.profilePicture}
            alt=""
          />
          <RightBarOnline />
        </RightBarFriendImgContainer>
        <RightBarUsername>{user.username}</RightBarUsername>
      </RightBarFriend>
    );
}

export default Online


const RightBarFriend = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const RightBarFriendImgContainer = styled.div`
  margin-right: 10px;
  position: relative;
`;

const RightBarFriendImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const RightBarOnline = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: limegreen;
  position: absolute;
  top: -2px;
  right: 0;
  border: 2px solid white;
`;

const RightBarUsername = styled.span`
  font-weight: 500;
`;

