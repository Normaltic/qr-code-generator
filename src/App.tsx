import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Section from './components/Section';
import QROptionForm, { QROptionFormProps } from './components/QROptionForm';
import QR, { QRCodeOptions } from './utils/qr';
import Button from './components/Button';

const QRCODE_PREVIEW_SIZE = 300;

function App() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<QRCodeOptions>({
    backgroundColor: '#FFFFFF',
    contentColor: '#000000',
    errorCorrectionLevel: 'L',
    width: 100,
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

  useEffect(() => {
    (async () => {
      const str = await QR.toString({ ...options, width: QRCODE_PREVIEW_SIZE, contentColor: '#000000FF', extension: 'svg' });
      if (previewRef.current) previewRef.current.innerHTML = str;
    })()
  }, [options]);

  return (
    <Wrapper>
      <Section>
        <QROptionForm onSubmit={handleSubmit} />
      </Section>
      <Section>
        <QRPreviewArea ref={previewRef} />
        <Button>Download PNG</Button>
        <Button>Download SVG</Button>
      </Section>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1100px;
  margin: auto;
  padding: 2rem;

  & > ${Section} {
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 0;

      & > button {
        margin: 0.25rem 0;
      }
    }
  }
`;

const QRPreviewArea = styled.div`
  width: ${QRCODE_PREVIEW_SIZE}px;
  height: ${QRCODE_PREVIEW_SIZE}px;
`;
