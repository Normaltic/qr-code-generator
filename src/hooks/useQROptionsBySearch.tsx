import { useCallback, useMemo, useRef } from "react";
import { useLocation, useNavigate } from 'react-router';

import QR, { QRCodeOptions } from "../utils/qr";
import validator from "../utils/validator";

const KEYS = {
  BACKGROUND_COLOR: 'bgc',
  CONTENT_COLOR: 'ctc',
  ERROR_CORRECTION_LEVEL: 'ecl',
  WIDTH: 'wid',
  LINK: 'lnk',
} as const;

type SearchOptions = {
  [KEYS.BACKGROUND_COLOR]: QRCodeOptions['backgroundColor'],
  [KEYS.CONTENT_COLOR]: QRCodeOptions['contentColor'],
  [KEYS.ERROR_CORRECTION_LEVEL]: QRCodeOptions['errorCorrectionLevel'],
  [KEYS.WIDTH]: QRCodeOptions['width'],
  [KEYS.LINK]: QRCodeOptions['link'],
}

function useQROptionsBySearch(defaultOprion: QRCodeOptions) {
  const optRef = useRef(defaultOprion);
  optRef.current = defaultOprion;

  const location = useLocation();
  const navigate = useNavigate();

  const option = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    const bgColor = searchParams.get(KEYS.BACKGROUND_COLOR);
    const ctColor = searchParams.get(KEYS.CONTENT_COLOR);
    const ecLevel = searchParams.get(KEYS.ERROR_CORRECTION_LEVEL);
    const width = searchParams.get(KEYS.WIDTH);
    const link = searchParams.get(KEYS.LINK);

    const parsed: QRCodeOptions = {
      backgroundColor: bgColor && validator.isHEX(bgColor) ? bgColor : optRef.current.backgroundColor,
      contentColor: ctColor && validator.isHEX(ctColor) ? ctColor : optRef.current.contentColor,
      errorCorrectionLevel: ecLevel && QR.isErrorCorrectionLevel(ecLevel) ? ecLevel : optRef.current.errorCorrectionLevel,
      width: width && Number.isSafeInteger(+width) ? +width : optRef.current.width,
      link: link && validator.isURL(link) ? link : optRef.current.link,
    }

    return parsed;
  }, [location.search]);

  const update = useCallback((args: Record<keyof QRCodeOptions, number | string>) => {
    const {
      backgroundColor,
      contentColor,
      errorCorrectionLevel,
      width,
      link,
    } = args;

    const parsed: SearchOptions = {
      [KEYS.BACKGROUND_COLOR]: typeof backgroundColor === 'string' && validator.isHEX(backgroundColor) ? backgroundColor : optRef.current.backgroundColor,
      [KEYS.CONTENT_COLOR]: typeof contentColor === 'string' && validator.isHEX(contentColor) ? contentColor : optRef.current.contentColor,
      [KEYS.ERROR_CORRECTION_LEVEL]: QR.isErrorCorrectionLevel(errorCorrectionLevel) ? errorCorrectionLevel : optRef.current.errorCorrectionLevel,
      [KEYS.WIDTH]: Number.isSafeInteger(+width) ? +width : optRef.current.width,
      [KEYS.LINK]: typeof link === 'string' && validator.isURL(link) ? link : optRef.current.link
    };

    const searchParams = new URLSearchParams({
      ...parsed,
      [KEYS.WIDTH]: `${parsed[KEYS.WIDTH]}`
    });

    navigate({ search: searchParams.toString() });
  }, [navigate]);

  return [option, update] as const;
}

export default useQROptionsBySearch;
