import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import Feed from '../components/Feed';
import Leftbar from '../components/Leftbar';
import Rightbar from '../components/Rightbar';
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {Add,Remove} from '@material-ui/icons';

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser] = useState({});
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const username=useParams().username;
    const [followed,setFollowed] = useState(currentUser.following.includes(user._id));
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data);
    }
    const handleClick = async () => {
      try {
        if(followed) {
          await axios.put(`/users/${user._id}/unfollow`,{
            userId: currentUser._id,
          })
          dispatch({type:"UNFOLLOW",payload:user._id});
        } else {
          await axios.put(`/users/${user._id}/follow`,{
            userId : currentUser._id
          })
          dispatch({type:"FOLLOW",payload:user._id});
        }
        setFollowed(!followed);
      } catch(err) {}
    }
    useEffect(()=>{
      fetchUser();
    },[username]);
    return (
      <Container>
        <LeftBarContainer>
          <LeftTopBar>
            <Link to="/">
              <LeftTopBarLogo>SoConnect</LeftTopBarLogo>
            </Link>
          </LeftTopBar>
          <Leftbar />
        </LeftBarContainer>
        <ProfileRight>
          <ProfileRightTop>
            <ProfileCover>
              <CoverImg
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <UserIcons>
                <TopBarIconItem>
                  <PersonIconD />
                  <TopBarIconBadge>1</TopBarIconBadge>
                </TopBarIconItem>
                <TopBarIconItem>
                  <ChatIconD />
                  <TopBarIconBadge>3</TopBarIconBadge>
                </TopBarIconItem>
                <TopBarIconItem>
                  <NotificationsIconD />
                  <TopBarIconBadge>1</TopBarIconBadge>
                </TopBarIconItem>
              </UserIcons>
              <UserImg
                src={
                  user.profilePicture
                    ? PF + user.profilePictue
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </ProfileCover>
            <ProfileInfo>
              <ProfileInfoContainer>
                <ProfileInfoName>{user.username}</ProfileInfoName>
                <ProfileInfoDesc>Hello my lovely friends</ProfileInfoDesc>
              </ProfileInfoContainer>
              {user.username !== currentUser.username && (<ProfileFollowButton onClick={handleClick}>{followed ? "Unfollow":"Follow"}
              {followed ? <Remove /> : <Add />}</ProfileFollowButton>) }
            </ProfileInfo>
          </ProfileRightTop>
          <ProfileRightBottom>
            <Feed username={username} />
            <Rightbar user={user} />
          </ProfileRightBottom>
        </ProfileRight>
      </Container>
    );
}

export default Profile

const Container = styled.div`
display:flex;

`;

const LeftBarContainer = styled.div``;

const LeftTopBar = styled.div`
  flex: 3;
  height: 50px;
  background-image: linear-gradient(to right, #57bca2, #09d5d5);
  display:flex;
  align-items:center;
  position:sticky;
  top:0;
  a{
    text-decoration:none;
  }
`;

const LeftTopBarLogo = styled.span`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: #eaf5ff;
  cursor: pointer;
`;


const ProfileRight = styled.div`
flex:9;
`;

const ProfileRightTop = styled.div``;

const ProfileCover = styled.div`
height:470px;
position:relative;
background-color:white;
`;

const ProfileInfo = styled.div`
  background-color: white;
  display: flex;
  height: 70px;
  border-bottom: 2px solid black;
  align-items:center;
  justify-content: space-between;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 45px;
  background-color: white;
  
`;

const ProfileInfoName = styled.span`
font-size:24px;
font-weight:900px;
`;

const ProfileInfoDesc = styled.span`
font-weight:300;
`;

const ProfileFollowButton = styled.button`
  margin-right: 30px;
  border: none;
  background-color: #e27d60;
  color:white;
  border-radius:5px;
  padding:5px 10px;
  display:flex;
  align-items:center;
  font-size:16px;
  font-weight:500;
  cursor:pointer;
`;

const CoverImg = styled.img`
width:100%;
height:400px;
object-fit:cover;
`;

const UserIcons = styled.div`
  position: fixed;
  width: 50px;
  height: 130px;
  background-image: linear-gradient(to bottom, #57bca2, #09d5d5);
  top: 150px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px 0 5px 0;
  border:2px solid white;
`;

const TopBarIconItem = styled.div`
  margin-right: 15px;
  cursor: pointer;
  position: relative;
`;

const TopBarIconBadge = styled.span`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const PersonIconD=styled(PersonIcon)`
color:white;
`;

const ChatIconD = styled(ChatIcon)`
color:white;
`;

const NotificationsIconD = styled(NotificationsIcon)`
color:white;
`;

const UserImg = styled.img`
width:170px;
height:170px;
border-radius:50%;
object-fit:cover;
position:absolute;
left:20px;
margin:auto;
top:280px;
border:3px solid white;
`;

const ProfileRightBottom = styled.div`
display:flex;
`;
