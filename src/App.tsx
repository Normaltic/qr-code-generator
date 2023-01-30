import React, { useState } from 'react';
import styled from 'styled-components';

import Section from './components/Section';
import QROptionForm, { QROptionFormProps } from './components/QROptionForm';
import QRCanvas from './components/QRCanvas';
import { QRCodeOptions } from './utils/qr';

function App() {
  const [options, setOptions] = useState<QRCodeOptions>({
    backgroundColor: '#FFFFFF',
    contentColor: '#000000',
    errorCorrectionLevel: 'L',
    width: 37,
    link: 'https://naver.com',
  });

  const handleSubmit: QROptionFormProps['onSubmit'] = (values) => {
    setOptions({
      backgroundColor: values.backgroundColor,
      contentColor: values.contentColor,
      errorCorrectionLevel: values.errorCorrectionLevel as QRCodeOptions['errorCorrectionLevel'],
      width: +values.width,
      link: `https://${values.url}`,
    })
  }

  return (
    <Wrapper>
      <Section>
        <QROptionForm onSubmit={handleSubmit} />
      </Section>
      <Section>
        <QRCanvas {...options} />
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
  padding: 2rem;

  & > ${Section} {
    flex: 1;
  }
`