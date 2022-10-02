import { useState, useCallback } from 'react';

function useBoolean(initialValue: boolean) {
  const [bool, setBool] = useState(initialValue);

  const toggle = useCallback(() => {
    setBool(prev => !prev)
  }, []);

  return [bool, toggle, setBool] as const;
}

export default useBoolean;
