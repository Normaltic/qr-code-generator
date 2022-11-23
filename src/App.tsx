import React from 'react';
import styled from 'styled-components';

import Section from './components/Section';
import QROptionForm from './components/QROptionForm';
import QRCanvas from './components/QRCanvas';

function App() {
  return (
    <Wrapper>
      <Section>
        <QROptionForm onSubmit={args => console.log(args)} />
      </Section>
      <Section>
        <QRCanvas
          backgroundColor='#FFFFFF'
          contentColor='#000000'
          errorCorrectionLevel='L'
          width={37}
          link='https://naver.com'
        />
      </Section>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1400px;
  margin: auto;
  padding: 0 2rem;

  & > ${Section} {
    flex: 1;
  }
`