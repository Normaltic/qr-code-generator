import { FormEvent, useCallback, useMemo, useState } from "react";
import styled from "@emotion/styled";

import { ErrorCorrectionLevel, QRCodeOptions } from "@/utils/qr";

import useHexCode from "@/hooks/useHexCode";
import useNumber from "@/hooks/useNumber";
import useURI from "@/hooks/useURI";

import Button from "@/components/inputs/Button";
import Dropdown from "@/components/inputs/Dropdown";
import Heading3 from "@/components/commons/Heading3";
import Input from "@/components/inputs/Input";
import ColorInput from "@/components/inputs/ColorPicker";

const DROPDOWN_OPTIONS = [
  { label: "Low( ~7% )", value: "L" },
  { label: "Medium( ~15% )", value: "M" },
  { label: "Quartile( ~25% )", value: "Q" },
  { label: "High( ~30% )", value: "H" }
];

export interface OptionFormProps {
  className?: string;
  options: QRCodeOptions;
  onSubmit: (options: QRCodeOptions) => void;
}

const OptionForm = ({ className, options, onSubmit }: OptionFormProps) => {
  const [uri, setUri, isValidUri] = useURI(options.link);

  const [contentColor, setContentColor, isValidContentColor] = useHexCode(
    options.contentColor
  );

  const [backgroundColor, setBackgroundColor, isValidBackgroundColor] =
    useHexCode(options.backgroundColor);

  const [errorLevel, setErrorLevel] = useState(options.errorCorrectionLevel);

  const [width, setWidth, isValidWidth] = useNumber(options.width, {
    min: 37
  });

  const isCanSubmit = useMemo(() => {
    return (
      isValidUri &&
      isValidContentColor &&
      isValidBackgroundColor &&
      isValidWidth
    );
  }, [isValidUri, isValidContentColor, isValidBackgroundColor, isValidWidth]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!isCanSubmit) return;
      onSubmit({
        link: uri,
        contentColor,
        backgroundColor,
        errorCorrectionLevel: errorLevel,
        width: +width
      });
    },
    [
      isCanSubmit,
      uri,
      contentColor,
      backgroundColor,
      errorLevel,
      width,
      onSubmit
    ]
  );

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <Heading3>URL</Heading3>
      <Input
        value={uri}
        onChange={setUri}
        valid={isValidUri}
        placeholder={`URI without 'https://'`}
      />
      <Heading3>Content color</Heading3>
      <ColorInput
        value={contentColor}
        onChange={setContentColor}
        valid={isValidContentColor}
        placeholder="#000000"
      />
      <Heading3>Background color</Heading3>
      <ColorInput
        value={backgroundColor}
        onChange={setBackgroundColor}
        placeholder="#FFFFFF"
      />
      <Heading3>Error correction level</Heading3>
      <Dropdown
        selected={errorLevel}
        options={DROPDOWN_OPTIONS}
        onSelect={(args) => setErrorLevel(args as ErrorCorrectionLevel)}
      />
      <Heading3>Width</Heading3>
      <Input
        value={width}
        onChange={setWidth}
        valid={isValidWidth}
        placeholder={`Value is larger than '37'`}
      />
      <Button type="submit" disabled={isCanSubmit === false}>
        Generate QR code
      </Button>
    </Form>
  );
};

const Form = styled.form`
  ${Heading3} {
    margin-bottom: 0.5rem;

    &:nth-child(2n + 3) {
      margin-top: 2rem;
    }
  }

  ${Button}:last-child {
    margin-top: 2rem;
  }
`;

export default OptionForm;
