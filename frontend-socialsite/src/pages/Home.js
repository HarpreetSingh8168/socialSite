import React from 'react';
import styled from 'styled-components';
import Feed from '../components/Feed';
import Leftbar from '../components/Leftbar';
import Rightbar from '../components/Rightbar';
import Topbar from '../components/Topbar';

function Home() {
    return (
        <Container>
            <Topbar />
            <HomeContainer>
                <Leftbar />
                <Feed />
                <Rightbar />
            </HomeContainer>
        </Container>
    )
}

export default Home

const Container = styled.div``;

const HomeContainer = styled.div`
display:flex;
width:100%;
`;