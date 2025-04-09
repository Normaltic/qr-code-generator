import useInput from "./useInput";
import validator from "../utils/validator";

function useURI(initialValue: string) {
  const inputs = useInput(initialValue, {
    validator: (value) => validator.isURI(value)
  });

  return inputs;
}

export default useURI;
