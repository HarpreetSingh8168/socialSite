import React, { useRef } from "react";
import styled from "styled-components";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don't match");
    } else {
      const user={
        username:username.current.value,
        email: email.current.value,
        password:password.current.value,
      }
      try {
        await axios.post('/auth/register',user);
        history.push('/login');
      } catch(err) {
        console.log(err);
      }
    }
  }

  const redirectLogin = () => {
    history.push('/login');
  }
  return (
    <Container>
      <Wrapper>
        <LoginLeft>
          <LoginLogo>SoConnect</LoginLogo>
          <LoginDesc>Connect React Act Select</LoginDesc>
        </LoginLeft>
        <LoginRight>
          <LoginBox onSubmit={handleClick} >
            <LoginInput required placeholder="Username" ref={username} />
            <LoginInput required placeholder="Email" type="email" ref={email} />
            <LoginInput
              required
              placeholder="Password"
              type="password"
              ref={password}
            />
            <LoginInput
              required
              placeholder="Password Again"
              type="password"
              ref={passwordAgain}
            />
            <LoginButton type="submit" >Sign Up</LoginButton>
            <RegisterButton onClick={redirectLogin} >Log into Account</RegisterButton>
          </LoginBox>
        </LoginRight>
      </Wrapper>
    </Container>
  );
}

export default Register;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e3e2df;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
`;

const LoginLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginLogo = styled.h3`
  font-size: 50px;
  font-weight: 800;
  color: #e27d60;
`;

const LoginDesc = styled.span``;

const LoginRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginBox = styled.form`
  height: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 8px 7px 18px -6px rgba(0, 0, 0, 0.68);
`;

const LoginInput = styled.input`
  height: 50px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 18px;
  padding-left: 20px;

  :focus {
    outline: none;
  }
`;

const LoginButton = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #e27d60;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-weight: 500;
`;

const RegisterButton = styled.button`
  width: 60%;
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
