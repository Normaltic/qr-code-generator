import React, { useEffect, useRef } from 'react';

import QR, { QRCodeOptions } from '../utils/qr';

export interface QRCanvasProps extends QRCodeOptions {
  className?: string;
}

const QRCanvas = ({
  className,
  link,
  contentColor,
  backgroundColor,
  errorCorrectionLevel,
  width,
}: QRCanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QR.draw(canvasRef.current, {
      link,
      width,
      contentColor,
      backgroundColor,
      errorCorrectionLevel,
    });
  }, [link, contentColor, backgroundColor, errorCorrectionLevel, width])

  return (
    <canvas ref={canvasRef} className={className} />
  )
};

export default QRCanvas;
