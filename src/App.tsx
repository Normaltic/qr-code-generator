import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

import QR from "@/utils/qr";

import useQROptionsBySearch from "@/hooks/useQROptionsBySearch";

import Section from "@/components/commons/Section";
import OptionForm from "@/components/forms/QROptionForm";
import Button from "@/components/inputs/Button";

const QRCODE_PREVIEW_SIZE = 300;

function App() {
  const [qr, update] = useQROptionsBySearch({
    backgroundColor: "#FFFFFF",
    contentColor: "#000000",
    errorCorrectionLevel: "L",
    width: 100,
    link: "https://qr-code.yunji.kim"
  });

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const str = await QR.toString({
        ...qr,
        width: QRCODE_PREVIEW_SIZE,
        extension: "svg"
      });
      if (previewRef.current) previewRef.current.innerHTML = str;
    })();
  }, [qr]);

  return (
    <Wrapper>
      <Section>
        <OptionForm options={qr} onSubmit={update} />
      </Section>
      <Section>
        <div ref={previewRef} />
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
