import React, { useContext } from 'react'
import styled from 'styled-components';
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    return (
      <Container>
        <LeftContainer>
          <Link to="/">
            <Logo>SoConnect</Logo>
          </Link>
        </LeftContainer>
        <CenterContainer>
          <SearchIconContainer />
          <SearchInput placeholder="Search for friend, post or video" />
        </CenterContainer>
        <RightContainer>
          <TopBarLinks>
            <TopBarLink>Homepage</TopBarLink>
            <TopBarLink>Timeline</TopBarLink>
          </TopBarLinks>
          <TopBarIcons>
            <TopBarIconItem>
              <PersonIcon />
              <TopBarIconBadge>1</TopBarIconBadge>
            </TopBarIconItem>
            <TopBarIconItem>
              <ChatIcon />
              <TopBarIconBadge>3</TopBarIconBadge>
            </TopBarIconItem>
            <TopBarIconItem>
              <NotificationsIcon />
              <TopBarIconBadge>1</TopBarIconBadge>
            </TopBarIconItem>
          </TopBarIcons>
          <Link to={`/profile/${user.username}`}>
            <TopBarImg
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
          </Link>
        </RightContainer>
      </Container>
    );
}

export default Topbar

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-image: linear-gradient(to right, #57bca2, #09d5d5);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index:999;
`;

const LeftContainer = styled.div`
flex:3;
a{
  text-decoration:none;
}
`;

const Logo = styled.span`
font-size:24px;
margin-left:20px;
font-weight:bold;
color:#eaf5ff;
cursor:pointer;
`;

const CenterContainer = styled.div`
  flex: 5;
  width: 100%;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
`;

const SearchIconContainer = styled(SearchIcon)`
font-size:20px !important;
margin-left:10px;
`;

const SearchInput = styled.input`
border:none;
width:70%;
:focus{
  outline:none;
}
`;

const RightContainer = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
`;

const TopBarLinks = styled.div``;

const TopBarLink = styled.span`
margin-right:10px;
font-size:14px;
cursor:pointer;
`;

const TopBarIcons = styled.div`
display:flex;
`;

const TopBarIconItem = styled.div`
margin-right:15px;
cursor:pointer;
position:relative;
`;

const TopBarIconBadge = styled.span`
width:15px;
height:15px;
background-color:red;
border-radius:50%;
color:white;
position:absolute;
top:-5px;
right:-5px;
display:flex;
align-items:center;
justify-content:center;
font-size:12px;
`;

const TopBarImg = styled.img`
width:32px;
height:32px;
border-radius:50%;
object-fit:cover;
cursor:pointer;
`;
