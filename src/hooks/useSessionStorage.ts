import * as React from "react";

const useSessionStorage = (key: string) => {
  const [storageValue, setStorageValue] = React.useState<string | null>();

  React.useEffect(() => {
    const _value = sessionStorage.getItem(key);
    setStorageValue(_value);
  }, [setStorageValue]);

  const setValueOfSessionStorage = (value: string) => {
    setStorageValue(value);
    sessionStorage.setItem(key, value);
  };

  return [storageValue, setValueOfSessionStorage];
};

export default useSessionStorage;
