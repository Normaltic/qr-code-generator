import React from "react";
import styled from "@emotion/styled";

import useQROptionsBySearch from "@/hooks/useQROptionsBySearch";

import Section from "@/components/commons/Section";
import OptionForm from "@/components/qr/QROptionForm";
import QRResultPanel from "./components/qr/QRResultPanel";

function App() {
  const [qr, update] = useQROptionsBySearch({
    backgroundColor: "#FFFFFF",
    contentColor: "#000000",
    errorCorrectionLevel: "L",
    width: 100,
    link: "https://qr-code.yunji.kim"
  });

  return (
    <Wrapper>
      <Section>
        <OptionForm options={qr} onSubmit={update} />
      </Section>
      <Section>
        <QRResultPanel qr={qr} />
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
    }
  }
`;
