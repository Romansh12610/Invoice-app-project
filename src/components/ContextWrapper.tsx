import GlobalStyles, { theme as stylesTheme } from '../styledComponents/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import useThemeToggle from '../hooks/useThemeToggle';

export default function ContextWrapper({ children }: { children: React.JSX.Element}) {

    const [theme, toggleTheme] = useThemeToggle();

    return (
        <ThemeProvider theme={stylesTheme}>
			<GlobalStyles $isDark={theme === 'dark' ? true : false}/>
			<BrowserRouter>
				{children}
			</BrowserRouter>
		</ThemeProvider>
    )
}