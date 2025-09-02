import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
    Helvetica, sans-serif;
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  );
}