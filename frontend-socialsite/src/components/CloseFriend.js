import React from 'react'
import styled from 'styled-components'

function CloseFriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <SideBarFriend>
        <FriendImage
          src={PF + user.profilePicture}
          alt=""
        />
        <FriendName>{user.username}</FriendName>
      </SideBarFriend>
    );
}

export default CloseFriend

const SideBarFriend = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const FriendImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const FriendName = styled.span``;