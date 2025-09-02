import styled from 'styled-components';
import Head from 'next/head';

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  font-size: 3rem;
  text-align: center;
`;

const DemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const DemoItem = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  width: 80%;
  text-align: center;
`;

export default function Demo() {
  return (
    <Container>
      <Head>
        <title>SlavkoKernel™ Demo</title>
        <meta name="description" content="Interactive demo of SlavkoKernel™ features" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Title>SlavkoKernel™ Platform Demo</Title>
        <DemoContainer>
          <DemoItem>
            <h2>Gamification Elements</h2>
            <p>Experience our XP system and achievement tracking</p>
          </DemoItem>
          <DemoItem>
            <h2>AI Integration</h2>
            <p>See how AI enhances user engagement</p>
          </DemoItem>
          <DemoItem>
            <h2>Real-time Analytics</h2>
            <p>Watch user progress and platform metrics update live</p>
          </DemoItem>
        </DemoContainer>
      </Main>
    </Container>
  );
}