import React, { FormEvent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import useInput from "../hooks/useInput";

import validator from "../utils/validator";

import Button from "./Button";
import Dropdown from "./Dropdown";
import Heading3 from "./Heading3";
import Input from "./Input";
import ColorInput from "./ColorPicker";

const DROPDOWN_OPTIONS = [
  { label: 'Low( ~7% )', value: 'L' },
  { label: 'Medium( ~15% )', value: 'M' },
  { label: 'Quartile( ~25% )', value: 'Q' },
  { label: 'High( ~30% )', value: 'H' },
]

export interface QROptionFormProps {
  className?: string;
  onSubmit: ({
    url, contentColor, backgroundColor, errorCorrectionLevel, width,
  }: {
    url: string, contentColor: string, backgroundColor: string, errorCorrectionLevel: string, width: string,
  }) => void;
}

const QROptionForm = ({ className, onSubmit }: QROptionFormProps) => {
  const [url, setUrl, isValidUrl] = useInput('naver.com', {
    validator: validator.isURL
  });

  const [contentColor, setContentColor, isValidContentColor] = useInput('#000000', {
    preProcessor: value => {
      const replaced = value.slice(0, 7).toUpperCase().replace(/[^0-9|^A-F|]/gi, '');
      return `#${replaced}`;
    },
    validator: validator.isHEX,
  });

  const [backgroundColor, setBackgroundColor, isValidBackgroundColor] = useInput('#FFFFFF', {
    preProcessor: value => {
      const replaced = value.slice(0, 7).toUpperCase().replace(/[^0-9|^A-F|]/gi, '');
      return `#${replaced}`;
    },
    validator: value => value.length === 7,
  });

  const [errorLevel, setErrorLevel] = useState('L');

  const [width, setWidth, isValidWidth] = useInput('37', {
    preProcessor: value => {
      const replaced = value.replace(/[^0-9]/gi, '');
      return replaced;
    },
    validator: value => {
      return Number.isNaN(+value) === false && +value >= 37;
    },
  })

  const isCanSubmit = useMemo(() => {
    return isValidUrl && isValidContentColor && isValidBackgroundColor && isValidWidth;
  }, [isValidUrl, isValidContentColor, isValidBackgroundColor, isValidWidth]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!isCanSubmit) return;
    onSubmit({ url, contentColor, backgroundColor, errorCorrectionLevel: errorLevel, width });
  }, [isCanSubmit, onSubmit, url, contentColor, backgroundColor, errorLevel, width]);

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <Item>
        <Heading3>URL</Heading3>
        <Input
          value={url}
          onChange={setUrl}
          valid={isValidUrl}
          placeholder={`URL without 'https://'`}
        />
      </Item>
      <Item>
        <Heading3>Content color</Heading3>
        <ColorInput
          value={contentColor}
          onChange={setContentColor}
          valid={isValidContentColor}
          placeholder='#000000'
        />
      </Item>
      <Item>
        <Heading3>Background color</Heading3>
        <ColorInput
          value={backgroundColor}
          onChange={setBackgroundColor}
          placeholder='#FFFFFF'
        />
      </Item>
      <Item>
        <Heading3>Error correction level</Heading3>
        <Dropdown
          selected={errorLevel}
          options={DROPDOWN_OPTIONS}
          onSelect={setErrorLevel}
        />
      </Item>
      <Item>
        <Heading3>Width</Heading3>
        <Input
          value={width}
          onChange={setWidth}
          valid={isValidWidth}
          placeholder={`Value is larger than '37'`}
        />
      </Item>
      <Button
        type='submit'
        disabled={!isValidUrl || !isValidContentColor || !isValidWidth}
      >
        Generate QR code
      </Button>
    </Form>
  )
}

const Form = styled.form`
  & > *:nth-child(n + 2) {
    margin-top: 2rem;
  }
`;

const Item = styled.div`
  flex: 1;
  & > ${Heading3} {
    margin-bottom: 0.5rem;
  }
`;

export default QROptionForm;

