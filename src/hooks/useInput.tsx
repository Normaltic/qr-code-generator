import { ChangeEvent, useCallback, useRef, useState } from "react";

type Validator = (value: string) => boolean;

type PreProcessor = (value: string) => string;

type Conditioner = (value: string) => boolean;

export interface UseInputOptions {
  validator?: Validator;
  preProcessor?: PreProcessor;
  conditioner?: Conditioner;
}

const DEFAULT_VALIDATOR: Validator = () => true;

const DEFAULT_PREPROCESSOR: PreProcessor = (value) => value;

const DEFAULT_CONDITIONER: Conditioner = (value) => true;

const DEFAULT_OPTIONS: UseInputOptions = {
  validator: DEFAULT_VALIDATOR,
  preProcessor: DEFAULT_PREPROCESSOR,
  conditioner: DEFAULT_CONDITIONER
};

function useInput(initialValue = "", options = DEFAULT_OPTIONS) {
  const [value, setValue] = useState(initialValue);

  const val = useRef(options?.validator ?? DEFAULT_VALIDATOR);
  const pre = useRef(options?.preProcessor ?? DEFAULT_PREPROCESSOR);
  const con = useRef(options?.conditioner ?? DEFAULT_CONDITIONER);
  const isValid = useRef(val.current(initialValue));

  val.current = options?.validator ?? DEFAULT_VALIDATOR;
  pre.current = options?.preProcessor ?? DEFAULT_PREPROCESSOR;
  con.current = options?.conditioner ?? DEFAULT_CONDITIONER;
  isValid.current = val.current(value);

  const change = useCallback((e: string | ChangeEvent<HTMLInputElement>) => {
    const next = typeof e === "string" ? e : e.target.value;
    const proceed = pre.current(next);
    if (!con.current(proceed)) return;
    setValue(proceed);
  }, []);

  return [value, change, isValid.current] as const;
}

export default useInput;
