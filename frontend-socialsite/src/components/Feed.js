import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import Share from "./Share";
import axios from "axios";
import {AuthContext} from '../context/AuthContext';

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  const fetchPosts = async () => {
    const res = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("posts/timeline/" + user._id);
    setPosts(res.data.sort((p1,p2)=> {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }));
  };
  useEffect(() => {
    fetchPosts();
  }, [username,user]);
  return (
    <Container>
      <Wrapper>
       { (!username || username === (user ? user.username : "")) && <Share /> }
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Wrapper>
    </Container>
  );
}

export default Feed;

const Container = styled.div`
  flex: 6;
  background-color: #f1f1f1;
`;

const Wrapper = styled.div`
  padding: 20px 100px 20px 100px;
`;
