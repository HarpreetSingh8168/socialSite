import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { MoreVert } from "@material-ui/icons";
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(false);
  const [user,setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user: currentUser} = useContext(AuthContext);
  useEffect(()=> {
    setisLiked(post.likes.includes(currentUser._id));
  },[currentUser._id,post.likes]);
  const fetchUser = async () => {
    const res = await axios.get(`users?userId=${post.userId}`);
    setUser(res.data);
  };
  useEffect(() => {
    fetchUser();
  }, [post.userId]);
  const likeHandler = () => {
    try {
      axios.put("/posts/"+post._id+"/like",{userId:currentUser._id});
    } catch(err) {}
    setLike(isLiked ? like-1 : like+1);
    setisLiked(!isLiked);
  }
  return (
    <Container>
      <Wrapper>
        <PostTop>
          <PostTopLeft>
            <Link to={`/profile/${user.username}`}>
              <PostProfileImg
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                alt=""
              />
            </Link>
            <PostUsername>{user.username}</PostUsername>
            <PostDate>{format(post.createdAt)}</PostDate>
          </PostTopLeft>
          <PostTopRight>
            <MoreVertIcon />
          </PostTopRight>
        </PostTop>
        <PostCenter>
          <PostText>{post.desc}</PostText>
          <PostImg src={PF + post.img} alt="" />
        </PostCenter>
        <PostBottom>
          <PostBottomLeft>
            <LikeIcon
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <LikeIcon src={`${PF}heart.png`} alt="" />
            <PostLikeCounter>{like} people like it</PostLikeCounter>
          </PostBottomLeft>
          <PostBottomRight>
            <PostCommentText>{post.comment} comments</PostCommentText>
          </PostBottomRight>
        </PostBottom>
      </Wrapper>
    </Container>
  );
}

export default Post;

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #a4b3b6;
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

const PostProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const PostUsername = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin: 0 10px;
`;

const PostDate = styled.span`
  font-size: 12px;
`;

const PostTopRight = styled.div``;

const MoreVertIcon = styled(MoreVert)``;

const PostCenter = styled.div`
  margin: 20px 0;
`;

const PostText = styled.span``;

const PostImg = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostBottomLeft = styled.div`
  display: flex;
  align-items: center;
`;

const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
`;

const PostLikeCounter = styled.span`
  font-size: 15px;
`;

const PostBottomRight = styled.div``;

const PostCommentText = styled.span`
  cursor: pointer;
  border-bottom: 1px dashed gray;
`;
