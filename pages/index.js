import styled from 'styled-components';
import Head from 'next/head';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>SlavkoKernel™ Platform</title>
        <meta name="description" content="SlavkoKernel™ - AI-Powered Gamification Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Title>SlavkoKernel™ Platform</Title>
        <Description>
          AI-powered gamification platform for enhanced user engagement
        </Description>
      </Main>
    </Container>
  );
}