import React, { useContext, useRef } from 'react'
import styled from 'styled-components';
import { loginCall } from '../apiCalls'
import {AuthContext} from '../context/AuthContext'
import {CircularProgress} from '@material-ui/core';
import {useHistory} from 'react-router-dom'

function Login() {
    const email = useRef();
    const password = useRef();
    const {isFetching,dispatch} = useContext(AuthContext);
    const handleClick = (e) => {
      e.preventDefault();
      loginCall({email: email.current.value ,password: password.current.value },
           dispatch,
        );
    };
    const history = useHistory();
    const redirectRegister = () => {
      history.push('/register');
    }
    return (
      <Container>
        <Wrapper>
          <LoginLeft>
            <LoginLogo>SoConnect</LoginLogo>
            <LoginDesc>Connect React Act Select</LoginDesc>
          </LoginLeft>
          <LoginRight>
            <LoginBox onSubmit={handleClick}>
              <LoginInput
                type="email"
                required
                placeholder="Email"
                ref={email}
              />
              <LoginInput
                type="password"
                required
                minLength="6"
                placeholder="Password"
                ref={password}
              />
              <LoginButton type="submit" disabled={isFetching} >
                {isFetching ? <CircularProgress color="white" size="20px" /> : "Log In"}
              </LoginButton>
              <LoginForgot>Forgot Password?</LoginForgot>
              <RegisterButton onClick={redirectRegister} >
                {isFetching ? <CircularProgress color="white" size="20px" /> : "Create a New Account"}
              </RegisterButton>
            </LoginBox>
          </LoginRight>
        </Wrapper>
      </Container>
    );
}

export default Login

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:#c5c6c7;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const Wrapper = styled.div`
width:70%;
height:70%;
display:flex;
`;

const LoginLeft = styled.div`
flex:1;
display:flex;
flex-direction:column;
justify-content:center;
`;

const LoginLogo = styled.h3`
font-size:50px;
font-weight:800;
color:#e27d60;
`;

const LoginDesc = styled.span``;
  
const LoginRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginBox = styled.form`
  height: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 8px 7px 18px -6px rgba(0, 0, 0, 0.68);
`;

const LoginInput = styled.input`
height:50px;
border-radius:10px;
border:1px solid gray;
font-size:18px;
padding-left:20px;

:focus{
    outline:none;
}
`;

const LoginButton = styled.button`
height:50px;
border-radius:10px;
border:none;
background-color:#e27d60;
color:white;
font-size:20px;
cursor:pointer;
font-weight:500;

:disabled {
  cursor:not-allowed;
}
`;

const LoginForgot = styled.span`
text-align:center;
color:#1775ee;
`;

const RegisterButton = styled.button`
width:60%;
  align-self: center;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #c38d9e;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-weight: 500;
`;


