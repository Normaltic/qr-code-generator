import useInput from "./useInput";

import validator from "../utils/validator";

function preProcessor(value: string) {
  const replaced = value
    .slice(0, 7)
    .toUpperCase()
    .replace(/[^0-9|^A-F|]/gi, "");
  return `#${replaced}`;
}

function useHexCode(initialValue: string) {
  const inputs = useInput(initialValue, {
    preProcessor,
    validator: validator.isHEX
  });

  return inputs;
}

export default useHexCode;
