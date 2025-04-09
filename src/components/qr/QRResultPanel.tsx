import QRCode from "@/utils/qr";
import styled from "@emotion/styled";

import Button from "@/components/inputs/Button";
import { useCallback, useEffect, useRef } from "react";
import { download } from "@/utils/download";

export interface QRResultPanelProps {
  className?: string;
  qr: QRCode;
}

const QRCODE_PREVIEW_SIZE = 250;

function QRResultPanel({ className, qr }: QRResultPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const str = await QRCode.toString({
        ...qr,
        width: QRCODE_PREVIEW_SIZE,
        extension: "svg"
      });
      if (previewRef.current) previewRef.current.innerHTML = str;
    })();
  }, [qr]);

  const onPNG = useCallback(async () => {
    const blob = await qr.toImage("png");
    download(new File([blob], "qr_code.png"));
  }, [qr]);

  const onSVG = useCallback(async () => {
    const blob = await qr.toSVG();
    download(new File([blob], "qr_code.svg"));
  }, [qr]);

  return (
    <Wrapper className={className}>
      <div ref={previewRef} />
      <Button type="button" onClick={onPNG}>
        Download PNG
      </Button>
      <Button type="button" onClick={onSVG}>
        Download SVG
      </Button>
    </Wrapper>
  );
}

export default QRResultPanel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
