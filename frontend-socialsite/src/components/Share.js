import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if(file) {
      const data=new FormData();
      const fileName = Date.now() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      newPost.img=fileName;
      console.log(newPost);
      try {
        await axios.post("/upload",data);
      } catch(err) {}
    }
    try {
      await axios.post("/posts", newPost);
      
    } catch (err) {}
    window.location.reload();
  };
  return (
    <Container>
      <Wrapper>
        <ShareTop>
          <ShareProfileImg
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <ShareInput
            placeholder={"What's on your mind " + user.username + "?"}
            ref={desc}
          />
        </ShareTop>
        <ShareHr />
        { file && (
          <ShareImgContainer>
            <ShareImg src={URL.createObjectURL(file)} alt="" />
            <ShareCancelImg onClick={()=>setFile(null)} />
          </ShareImgContainer>
        )}
        <ShareBottom onSubmit={submitHandler}>
          <ShareOptions>
            <ShareOption htmlFor="file">
              <PermMediaIcon />
              <ShareOptionText>Photo or Video</ShareOptionText>
              <TakeInput
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </ShareOption>
            <ShareOption>
              <LabelIcon />
              <ShareOptionText>Tag</ShareOptionText>
            </ShareOption>
            <ShareOption>
              <RoomIcon />
              <ShareOptionText>Location</ShareOptionText>
            </ShareOption>
            <ShareOption>
              <EmojiEmotionsIcon />
              <ShareOptionText>Feelings</ShareOptionText>
            </ShareOption>
          </ShareOptions>
          <ShareButton type="submit">Share</ShareButton>
        </ShareBottom>
      </Wrapper>
    </Container>
  );
}

export default Share;

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const ShareTop = styled.div`
  display: flex;
  align-items: center;
`;

const ShareProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ShareInput = styled.input`
  border: none;
  width: 80%;
  background-color: #f1f1f1;
  :focus {
    outline: none;
  }
`;

const ShareHr = styled.hr`
  margin: 20px;
`;

const ShareImgContainer = styled.div`
padding:0 20px 10px 20px;
postion:relative;
`;

const ShareImg = styled.img`
width:100%;
object-fit:cover;
`;

const ShareCancelImg = styled(Cancel)`
position:absolute;
top:0;
right:0px;
cursor:pointer;
opacity:0.7;
z-index:999;
`;

const ShareBottom = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ShareOptions = styled.div`
  display: flex;
  margin-left: 20px;
`;

const ShareOption = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
`;

const PermMediaIcon = styled(PermMedia)`
  color: tomato;
  font-size: 18px;
  margin-right: 3px;
`;

const LabelIcon = styled(Label)`
  color: blue;
  font-size: 18px;
  margin-right: 3px;
`;

const RoomIcon = styled(Room)`
  color: green;
  font-size: 18px;
  margin-right: 3px;
`;

const EmojiEmotionsIcon = styled(EmojiEmotions)`
  color: goldenrod;
  font-size: 18px;
  margin-right: 3px;
`;

const ShareOptionText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const ShareButton = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: green;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  color: white;
`;

const TakeInput = styled.input``;
