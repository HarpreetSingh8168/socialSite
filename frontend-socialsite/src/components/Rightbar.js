import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import {Users} from '../dummyData';
import Online from './Online';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Rightbar({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends] = useState([]);
    useEffect(()=>{
      const getFriends = async () => {
        if(user){
        try {
          const friendList = await axios.get("/users/friends/"+ user._id);
          setFriends(friendList.data);
        } catch(err) {
          console.log(err);
        }
      }
      }
      getFriends();
    },[user])
    const HomeRightbar = () => {
      return (
        <React.Fragment>
          <BirthdayContainer>
            <BirthdayImg src={PF + "/gift.png"} alt="" />
            <BirthdayText>
              <b>Jas</b> and <b>3 others</b> have birthday today
            </BirthdayText>
          </BirthdayContainer>
          <RightBarAd src={PF + "/ad.png"} alt="" />
          <RightBarTitle>Online Friends</RightBarTitle>
          <RightBarFriendList>
            {Users.map((user) => (
              <Online key={user.id} user={user} />
            ))}
          </RightBarFriendList>
        </React.Fragment>
      );
    }

    const ProfileRightBar = () => {
      return (
        <React.Fragment>
          <RightBarTitle>User Information</RightBarTitle>
          <RightBarInfo>
            <RightBarInfoItem>
              <RightBarInfoItemKey>City:</RightBarInfoItemKey>
              <RightBarInfoItemValue>{user && user.city}</RightBarInfoItemValue>
            </RightBarInfoItem>
            <RightBarInfoItem>
              <RightBarInfoItemKey>From:</RightBarInfoItemKey>
              <RightBarInfoItemValue>{user && user.from}</RightBarInfoItemValue>
            </RightBarInfoItem>
            <RightBarInfoItem>
              <RightBarInfoItemKey>Relationship:</RightBarInfoItemKey>
              <RightBarInfoItemValue>{user && user.relationship===1 ? "Single" : user && user.relationship===2 ? "Married" : "-"}</RightBarInfoItemValue>
            </RightBarInfoItem>
          </RightBarInfo>
          <RightBarTitle>User Friends</RightBarTitle>
          <RightBarFollowings>
            {friends.map((friend) => (
              <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}} >
                <RightBarFollowing>
                  <RightBarFollowingImg
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                  />
                  <RightBarFollowingName>
                    {friend.username}
                  </RightBarFollowingName>
                </RightBarFollowing>
              </Link>
            ))}
          </RightBarFollowings>
        </React.Fragment>
      );
    }
    return (
      <Container>
        <Wrapper>
          {user? <ProfileRightBar />:<HomeRightbar />}
        </Wrapper>
      </Container>
    );
}

export default Rightbar

const Container = styled.div`
  flex: 3;
`;

const Wrapper = styled.div`
padding:20px 20px 0 10px;
`;

const BirthdayContainer = styled.div`
display:flex;
align-items:center;
`;

const BirthdayImg = styled.img`
width:40px;
height:40px;
margin-right:10px;
`;

const BirthdayText = styled.span`
font-weight:300;
font-size:15px;
`;

const RightBarAd = styled.img`
width:100%;
border-radius:10px;
margin:30px 0;
`;

const RightBarTitle = styled.h4`
font-size:18px;
font-weight:500;
margin-bottom:20px;
`;

const RightBarFriendList = styled.ul`
padding:0;
margin:0;
list-style:none;
`;

const RightBarInfo = styled.div`
margin-bottom:30px;
`;

const RightBarInfoItem = styled.div`
margin-bottom:10px;
`;

const RightBarInfoItemKey = styled.span`
font-weight:500;
margin-right:15px;
color:#555;
`;

const RightBarInfoItemValue = styled.span`
font-weight:300;
`;

const RightBarFollowings = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`;

const RightBarFollowing = styled.div`
display:flex;
flex-direction:column;
cursor:pointer;
`;

const RightBarFollowingImg = styled.img`
width:100px;
height:100px;
object-fit:cover;
border-radius:5px;
`;

const RightBarFollowingName = styled.span``;

