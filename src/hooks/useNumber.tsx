import { useCallback } from "react";
import useInput from "./useInput";

function useNumber(initialValue: number, options?: { min?: number, max?: number }) {
  const [value, setValue, isValid] = useInput(`${initialValue}`, {
    preProcessor: value => {
      const replaced = value.replace(/[^0-9]/gi, '');
      return `${value.startsWith('-') ? '-' : ''}${replaced}`;
    },
    validator: value => {
      const { min = -Infinity, max = Infinity } = options ?? {};
      const numVal = +value;
      return Number.isNaN(numVal) === false && numVal >= min && numVal <= max
    },
  });

  const expandSetValue = useCallback((arg: Parameters<typeof setValue>[0] | number) => {
    setValue(typeof arg === 'number' ? `${arg}` : arg);
  }, [setValue]);

  return [value, expandSetValue, isValid] as const;
}

export default useNumber;