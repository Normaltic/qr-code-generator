import QRCode, { QRCodeErrorCorrectionLevel, QRCodeDataURLType, QRCodeRenderersOptions } from 'qrcode';

type RequiredQRCodeRenderersOptions = Required<QRCodeRenderersOptions>;

type RequiredQRCodeRenderersColorOptions = Required<Exclude<QRCodeRenderersOptions['color'], undefined>>;

type ExtractExtension<T> = T extends `image/${infer A}` ? A : never;

export type ImageExtension = ExtractExtension<QRCodeDataURLType>;

export type ErrorCorrectionLevel = Extract<QRCodeErrorCorrectionLevel, 'L' | 'M' | 'Q' | 'H'>;

export interface QRCodeOptions {
  link: string;
  width: RequiredQRCodeRenderersOptions['width'],
  contentColor: RequiredQRCodeRenderersColorOptions['dark'],
  backgroundColor: RequiredQRCodeRenderersColorOptions['light'],
  errorCorrectionLevel: ErrorCorrectionLevel,
};

export interface QRCodeImageOptions extends QRCodeOptions {
  extension: ImageExtension,
};

function draw(canvas: HTMLCanvasElement, {
  link, width, contentColor, backgroundColor, errorCorrectionLevel
}: QRCodeOptions) {
  return QRCode.toCanvas(canvas, link, {
    width,
    color: {
      dark: contentColor,
      light: backgroundColor,
    },
    errorCorrectionLevel,
    maskPattern: 1,
  });
};

async function image({
  link, width, contentColor, backgroundColor, errorCorrectionLevel, extension,
}: QRCodeImageOptions) {
  const dataUrl = await QRCode.toDataURL(link, {
    width,
    color: {
      dark: contentColor,
      light: backgroundColor,
    },
    errorCorrectionLevel,
    maskPattern: 1,
    type: `image/${extension}`,
  });

  const blob = new Blob([dataUrl], { type: `image/${extension}` });

  return blob;
};

async function svg({
  link, width, contentColor, backgroundColor, errorCorrectionLevel,
}: QRCodeImageOptions) {
  const result = await QRCode.toString(link, {
    width,
    color: {
      dark: contentColor,
      light: backgroundColor,
    },
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: 1,
  })
  const svgBlob = new Blob([result], { type: "image/svg+xml;charset=utf-8" });

  return svgBlob;
}

const QR = {
  draw,
  image,
  svg,
};

export default QR;
