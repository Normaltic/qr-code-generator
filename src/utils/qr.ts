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

export interface QRCodeStringOptions extends QRCodeOptions {
  extension: ImageExtension | 'svg',
}

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

function toString({
  link, width, contentColor, backgroundColor, errorCorrectionLevel, extension,
}: QRCodeStringOptions) {
  const options: QRCodeRenderersOptions = {
    width,
    color: {
      dark: contentColor,
      light: backgroundColor,
    },
    errorCorrectionLevel,
    maskPattern: 1,
  };

  if (extension === 'svg') {
    return QRCode.toString(link, { ...options });
  }

  return QRCode.toDataURL(link, { ...options, type: `image/${extension}` });
};

async function toImage({ extension, ...options }: QRCodeImageOptions) {
  const dataUrl = await toString({ ...options, extension })

  const blob = new Blob([dataUrl], { type: `image/${extension}` });

  return blob;
};

async function toSvg(options: QRCodeOptions) {
  const result = await toString({ ...options, extension: 'svg' });

  const svgBlob = new Blob([result], { type: "image/svg+xml;charset=utf-8" });

  return svgBlob;
}


function isErrorCorrectionLevel(value: unknown): value is ErrorCorrectionLevel {
  return typeof value === 'string' && ['L', 'M', 'Q', 'H'].includes(value);
}


const QR = {
  draw,
  toString,
  toImage,
  toSvg,
  isErrorCorrectionLevel,
};

export default QR;
