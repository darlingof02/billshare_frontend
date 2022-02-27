import React, { useState } from "react";

export function useLocalStorage(key, defaultValue) {
    const getInitialValue = () => localStorage.getItem(key) ??  defaultValue;
    const [value, setValue] = useState(getInitialValue);
    const setAndStorageValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, newValue);
    }
    return [value, setAndStorageValue];
}

