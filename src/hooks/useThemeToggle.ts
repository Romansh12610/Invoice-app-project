import { useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark';

const getThemeFromLocalStorage = () => {
    return localStorage.getItem('theme') as ThemeType | null;
};

const postThemeToLocalStorage = (newTheme: ThemeType) => {
    return localStorage.setItem('theme', newTheme);
}

const getPreferredTheme = () => {
    const isUserPrefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return isUserPrefersDark ? 'dark' : 'light' as ThemeType;
}

const useThemeToggle = () => {
    
    const [theme, setTheme] = useState(
        () => getThemeFromLocalStorage() || getPreferredTheme()
    );

    useEffect(() => {
        postThemeToLocalStorage(theme);
    }, [theme]);

    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    return [theme, toggleTheme] as const;
}

export default useThemeToggle;