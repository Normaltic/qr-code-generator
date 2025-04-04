/** @jsxImportSource @emotion/react */

import React, { FormEvent, useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";

import { ErrorCorrectionLevel } from "../utils/qr";

import useQROptionsBySearch from '../hooks/useQROptionsBySearch';
import useHexCode from "../hooks/useHexCode";
import useNumber from "../hooks/useNumber";
import useURI from "../hooks/useURI";

import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Heading3 from "../components/Heading3";
import Input from "../components/Input";
import ColorInput from "../components/ColorPicker";

const DROPDOWN_OPTIONS = [
  { label: 'Low( ~7% )', value: 'L' },
  { label: 'Medium( ~15% )', value: 'M' },
  { label: 'Quartile( ~25% )', value: 'Q' },
  { label: 'High( ~30% )', value: 'H' },
]

export interface OptionFormProps {
  className?: string;
}

const OptionForm = ({ className }: OptionFormProps) => {
  const [options, update] = useQROptionsBySearch({
    backgroundColor: '#FFFFFF',
    contentColor: '#000000',
    errorCorrectionLevel: 'L',
    width: 100,
    link: 'https://qr-code.yunji.kim',
  });

  const [uri, setUri, isValidUri] = useURI(options.link);

  const [contentColor, setContentColor, isValidContentColor] = useHexCode(options.contentColor);

  const [backgroundColor, setBackgroundColor, isValidBackgroundColor] = useHexCode(options.backgroundColor);

  const [errorLevel, setErrorLevel] = useState(options.errorCorrectionLevel);

  const [width, setWidth, isValidWidth] = useNumber(options.width, { min: 37 });

  const isCanSubmit = useMemo(() => {
    return isValidUri && isValidContentColor && isValidBackgroundColor && isValidWidth;
  }, [isValidUri, isValidContentColor, isValidBackgroundColor, isValidWidth]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!isCanSubmit) return;
    update({ link: uri, contentColor, backgroundColor, errorCorrectionLevel: errorLevel, width });
  }, [isCanSubmit, uri, contentColor, backgroundColor, errorLevel, width, update]);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <StyledHeading3>URL</StyledHeading3>
      <Input
        value={uri}
        onChange={setUri}
        valid={isValidUri}
        placeholder={`URI without 'https://'`}
      />
      <StyledHeading3>Content color</StyledHeading3>
      <ColorInput
        value={contentColor}
        onChange={setContentColor}
        valid={isValidContentColor}
        placeholder='#000000'
      />
      <StyledHeading3>Background color</StyledHeading3>
      <ColorInput
        value={backgroundColor}
        onChange={setBackgroundColor}
        placeholder='#FFFFFF'
      />
      <StyledHeading3>Error correction level</StyledHeading3>
      <Dropdown
        selected={errorLevel}
        options={DROPDOWN_OPTIONS}
        onSelect={(args) => setErrorLevel(args as ErrorCorrectionLevel)}
      />
      <StyledHeading3>Width</StyledHeading3>
      <Input
        value={width}
        onChange={setWidth}
        valid={isValidWidth}
        placeholder={`Value is larger than '37'`}
      />
      <Button
        type='submit'
        disabled={isCanSubmit === false}
        css={{
          marginTop: '2rem',
        }}
      >
        Generate QR code
      </Button>
    </form>
  )
}

const StyledHeading3 = styled(Heading3)`
  margin-bottom: 0.5rem;

  &:nth-child(2n + 3) {
    margin-top: 2rem;
  }
`

export default OptionForm;

