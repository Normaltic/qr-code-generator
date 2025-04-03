import React, { useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import useBoolean from "../hooks/useBoolean";
import Input from "./Input";

type Hex = `#${string}${string}${string}${string}${string}${string}`;

function isHex(value: unknown): value is Hex {
  return typeof value === "string" && value.includes("#") && value.length === 7;
}

export interface ColorPickerProps {
  className?: string;
  placeholder?: string;
  value: string;
  valid?: boolean;
  onChange: (value: ColorPickerProps["value"]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const ColorPicker = ({
  className,
  placeholder,
  value,
  valid = true,
  onChange,
  onFocus,
  onBlur
}: ColorPickerProps) => {
  const [isActive, toggleActive] = useBoolean(false);
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) onFocus?.();
    else onBlur?.();
  }, [isActive, onFocus, onBlur]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleTextFocus = useCallback(() => {
    textRef.current?.focus();
  }, []);

  return (
    <Wrapper
      as="div"
      valid={valid}
      className={className}
      active={isActive}
      onClick={handleTextFocus}
    >
      <input
        ref={textRef}
        placeholder={placeholder}
        value={value}
        onFocus={toggleActive}
        onBlur={toggleActive}
        onChange={handleChange}
      />
      <input
        type="color"
        value={isHex(value) ? value : "#FFFFFF"}
        onError={(e) => console.log(e)}
        onClick={stopPropagation}
        onFocus={toggleActive}
        onBlur={toggleActive}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default ColorPicker;

const Wrapper = styled(Input)<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding-right: 0.7rem;

  ${({ active }) => active && "outline: 2px solid #6200EE;"}

  & > input:first-child {
    width: 100%;
    height: 100%;
  }

  & > input:last-child {
    width: 2rem;
    height: 2rem;
    background: transparent;
  }
`;
