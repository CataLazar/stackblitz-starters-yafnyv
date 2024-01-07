import APICaller from './APICaller';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  padding-left: 20px;
  padding-right: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 50px;
  font-size: 3rem;
`;

const Subtitle = styled.h2`
  position: relative;
  bottom: 10px;
  left: 200px;
  font-size: 0.5em;
  font-weight: 300;
`;

function App() {
  return(
    <AppContainer>
      <Title>Creatopy AI Challenge
        <Subtitle>by Cătălin Lazăr</Subtitle>
      </Title>
      <APICaller/>
    </AppContainer>
  )
};

export default App;
