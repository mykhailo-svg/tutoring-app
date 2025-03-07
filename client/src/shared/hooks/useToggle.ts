import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean = false) => {
  const [isActive, setIsActive] = useState(defaultValue);

  const toggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, [setIsActive]);

  const setActive = useCallback(() => setIsActive(true), [setIsActive]);

  const setNotActive = useCallback(() => setIsActive(false), [setIsActive]);

  const setValue = useCallback(
    (value: boolean) => {
      setIsActive(value);
    },
    [setIsActive]
  );
  return { toggle, setActive, setNotActive, setValue, isActive };
};
