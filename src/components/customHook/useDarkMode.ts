import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useMedia } from './useMedia';

export function useDarkMode() {
    
    const [enabledState, setEnabledState] = useLocalStorage<boolean>(
        "dark-mode-enabled",
        false
    );

    const prefersDarkMode = usePrefersDarkMode();

    const enabled = enabledState ?? prefersDarkMode;

    useEffect(() => {
        const className = "dark-mode";
        const element = window.document.body;
        if(enabled) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        };
    }, [enabled])

    return [enabled, setEnabledState]

    function usePrefersDarkMode() {

        return useMedia(["prefers-color-scheme: dark"], [true], false);
    };
}