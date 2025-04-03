/** @jsxImportSource @emotion/react */

import { MouseEvent, useCallback, useMemo } from "react";
import styled from "@emotion/styled";

import useBoolean from "../hooks/useBoolean";

import { ReactComponent as ArrowUp } from "../assets/arrow-up.svg";
import { css } from "@emotion/react";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  className?: string;
  placeholder?: string;
  selected: DropdownOption["value"];
  options: DropdownOption[];
  onSelect: (value: DropdownOption["value"]) => void;
}

const Dropdown = ({
  className,
  placeholder = "Select",
  selected,
  options,
  onSelect
}: DropdownProps) => {
  const [isOpen, toggleOpen] = useBoolean(false);

  const currentLabel = useMemo(() => {
    const picked = options.find((item) => item.value === selected);
    return picked?.label ?? placeholder;
  }, [placeholder, selected, options]);

  const handleSelect = useCallback(
    (e: MouseEvent) => {
      const { target } = e;
      if (target instanceof HTMLElement) {
        const { value } = target.dataset;
        if (!value) return;
        onSelect(value);
      }
    },
    [onSelect]
  );

  return (
    <Wrapper
      tabIndex={1}
      className={className}
      active={isOpen}
      onClick={toggleOpen}
    >
      <div css={itemStyle}>{currentLabel}</div>
      <ArrowArea up={isOpen}>
        <ArrowUp />
      </ArrowArea>
      <Options expand={isOpen}>
        {options.map(({ label, value }) => (
          <Item
            data-value={value}
            selected={selected === value}
            key={value}
            onClick={handleSelect}
          >
            {label}
          </Item>
        ))}
      </Options>
    </Wrapper>
  );
};

export default Dropdown;

const ArrowArea = styled.div<{ up: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  & > svg {
    width: 1.4rem;
    height: 1.4rem;
    transform: rotate(${({ up }) => (up ? "0" : "-180deg")});
    transition: transform 0.15s linear;
  }
`;

const itemStyle = css`
  flex: 1;
  display: flex;
  height: 3rem;
  align-items: center;
  padding: 0 1rem;
`;

const Item = styled.div<{ selected?: boolean }>`
  flex: 1;
  display: flex;
  height: 3rem;
  align-items: center;
  padding: 0 1rem;

  transition: background-color 0.2s linear;

  ${({ selected }) => selected && "background-color: #EFE5FD"}

  &:hover {
    background-color: #d5bff9;
  }

  &:nth-child(n + 1) {
    border-top: 1px solid #d5bff9;
  }
`;

const Options = styled.div<{ expand: boolean }>`
  position: absolute;
  z-index: 1;
  top: calc(100% - 2px);
  left: -2px;
  display: ${({ expand }) => (expand ? "block" : "none")};
  width: calc(100% + 4px);
  max-height: 12rem;
  overflow: scroll;
  background-color: white;
  border: 2px solid #6200ee;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Wrapper = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  outline: ${({ active }) =>
    active ? "2px solid #6200EE" : "1px solid black"};
  border-radius: 4px;
`;
