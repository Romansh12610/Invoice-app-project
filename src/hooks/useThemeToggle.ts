import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const getThemeFromLocalStorage = () => {
    return localStorage.getItem('theme') as Theme | null;
};

const postThemeToLocalStorage = (newTheme: Theme) => {
    return localStorage.setItem('theme', newTheme);
}

const getPreferredTheme = () => {
    const isUserPrefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return isUserPrefersDark ? 'dark' : 'light';
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

    return [theme, toggleTheme];
}

export default useThemeToggle;