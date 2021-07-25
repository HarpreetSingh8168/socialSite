import React from 'react'
import styled from 'styled-components';
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import {Users} from '../dummyData'
import CloseFriend from './CloseFriend';

function Leftbar() {
    return (
      <Container>
        <Wrapper>
          <SideBarList>
            <SideBarListItem>
              <RssFeedIcon />
              <ListItemText>Feed</ListItemText>
            </SideBarListItem>
            <SideBarListItem>
              <ChatIcon />
              <ListItemText>Chats</ListItemText>
            </SideBarListItem>
            <SideBarListItem>
              <PlayCircleFilledOutlinedIcon />
              <ListItemText>Videos</ListItemText>
            </SideBarListItem>
            <SideBarListItem>
              <GroupIcon />
              <ListItemText>Groups</ListItemText>
            </SideBarListItem>
            <SideBarListItem>
              <BookmarkIcon />
              <ListItemText>Bookmarks</ListItemText>
            </SideBarListItem>
            <SideBarListItem>
              <HelpOutlineIcon />
              <ListItemText>Questions</ListItemText>
            </SideBarListItem>
            <SideBarListItem>
              <WorkOutlineIcon />
              <ListItemText>Jobs</ListItemText>
            </SideBarListItem>
            <SideBarListItem>
              <EventIcon />
              <ListItemText>Events</ListItemText>
            </SideBarListItem>
            <SideBarListItem>
              <SchoolIcon />
              <ListItemText>Courses</ListItemText>
            </SideBarListItem>
          </SideBarList>
          <SideBarButton>Show More</SideBarButton>
          <SideBarHr />
          <SideBarFriendList>
            {
              Users.map((user)=><CloseFriend key={user.id} user={user} />)
            }
          </SideBarFriendList>
        </Wrapper>
      </Container>
    );
}

export default Leftbar

const Container = styled.div`
  flex: 3;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  position:sticky;
  top:50px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color:#f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color:rgb(179,179,179);
  }
`;



const Wrapper = styled.div`
padding:20px;
`;

const SideBarList = styled.ul`
padding:0;
margin:0;
list-style:none;
`;

const SideBarListItem = styled.li`
display:flex;
align-items:center;
margin-bottom:20px;
`;

const RssFeedIcon = styled(RssFeed)``;

const ChatIcon = styled(Chat)``;

const PlayCircleFilledOutlinedIcon=styled(PlayCircleFilledOutlined)``;

const GroupIcon=styled(Group)``;

const BookmarkIcon=styled(Bookmark)``;

const HelpOutlineIcon=styled(HelpOutline)``;

const WorkOutlineIcon=styled(WorkOutline)``;

const EventIcon = styled(Event)``;

const SchoolIcon=styled(School)``;

const ListItemText=styled.span`
margin-left:15px;
`;

const SideBarButton = styled.button`
  width: 150px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: 500;
  background-color: #a4b3b6;
`;

const SideBarHr = styled.hr`
margin:20px 0;
`;

const SideBarFriendList = styled.ul`
padding:0;
margin:0;
list-style:none;
`;