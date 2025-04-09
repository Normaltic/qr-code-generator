import qr, {
  QRCodeErrorCorrectionLevel,
  QRCodeDataURLType,
  QRCodeRenderersOptions
} from "qrcode";

type RequiredQRCodeRenderersOptions = Required<QRCodeRenderersOptions>;

type RequiredQRCodeRenderersColorOptions = Required<
  Exclude<QRCodeRenderersOptions["color"], undefined>
>;

type ExtractExtension<T> = T extends `image/${infer A}` ? A : never;

export type ImageExtension = ExtractExtension<QRCodeDataURLType>;

export type ErrorCorrectionLevel = Extract<
  QRCodeErrorCorrectionLevel,
  "L" | "M" | "Q" | "H"
>;

export interface QRCodeOptions {
  link: string;
  width: RequiredQRCodeRenderersOptions["width"];
  contentColor: RequiredQRCodeRenderersColorOptions["dark"];
  backgroundColor: RequiredQRCodeRenderersColorOptions["light"];
  errorCorrectionLevel: ErrorCorrectionLevel;
}

export interface QRCodeImageOptions extends QRCodeOptions {
  extension: ImageExtension;
}

export interface QRCodeStringOptions extends QRCodeOptions {
  extension: ImageExtension | "svg";
}

class QRCode implements QRCodeOptions {
  link: string;

  width: RequiredQRCodeRenderersOptions["width"];

  contentColor: RequiredQRCodeRenderersColorOptions["dark"];

  backgroundColor: RequiredQRCodeRenderersColorOptions["light"];

  errorCorrectionLevel: ErrorCorrectionLevel;

  constructor(options: QRCodeOptions) {
    this.link = options.link;
    this.width = options.width;
    this.contentColor = options.contentColor;
    this.backgroundColor = options.backgroundColor;
    this.errorCorrectionLevel = options.errorCorrectionLevel;
  }

  static draw(
    canvas: HTMLCanvasElement,
    {
      link,
      width,
      contentColor,
      backgroundColor,
      errorCorrectionLevel
    }: QRCodeOptions
  ) {
    return qr.toCanvas(canvas, link, {
      width,
      color: {
        dark: contentColor,
        light: backgroundColor
      },
      errorCorrectionLevel,
      maskPattern: 1
    });
  }

  static toString({
    link,
    width,
    contentColor,
    backgroundColor,
    errorCorrectionLevel,
    extension
  }: QRCodeStringOptions) {
    const options: QRCodeRenderersOptions = {
      width,
      color: {
        dark: contentColor,
        light: backgroundColor
      },
      errorCorrectionLevel,
      maskPattern: 1
    };

    if (extension === "svg") {
      return qr.toString(link, { ...options });
    }

    return qr.toDataURL(link, { ...options, type: `image/${extension}` });
  }

  static async toImage({ extension, ...options }: QRCodeImageOptions) {
    const dataUrl = await QRCode.toString({ ...options, extension });

    const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");

    const binary = window.atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([array], { type: `image/${extension}` });

    return blob;
  }

  static async toSVG(options: QRCodeOptions) {
    const result = await QRCode.toString({ ...options, extension: "svg" });
    console.log(result);

    const svgBlob = new Blob([result], { type: "image/svg+xml;charset=utf-8" });

    return svgBlob;
  }

  static isErrorCorrectionLevel(value: unknown): value is ErrorCorrectionLevel {
    return typeof value === "string" && ["L", "M", "Q", "H"].includes(value);
  }

  draw(canvas: HTMLCanvasElement) {
    return QRCode.draw(canvas, this);
  }

  toString(extension: QRCodeStringOptions["extension"]) {
    return QRCode.toString({ extension, ...this });
  }

  toImage(extension: QRCodeImageOptions["extension"]) {
    return QRCode.toImage({ extension, ...this });
  }

  toSVG() {
    return QRCode.toSVG(this);
  }
}

export default QRCode;
