import GlobalStyles, { colorTheme } from '../styledComponents/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import useThemeToggle from '../hooks/useThemeToggle';

// types
type VoidFunction = () => void;
type AppContextType = {
	[prop: string]: string | VoidFunction;
}

const AppContext = React.createContext<AppContextType | null>(null);

export default function ContextWrapper({ children }: { children: React.JSX.Element}) {

    const [theme, toggleTheme] = useThemeToggle();

	//global context

    return (
		<AppContext.Provider value={{
			theme,
			toggleTheme,
		}}>
			<ThemeProvider theme={colorTheme}>
				<GlobalStyles $isDark={theme === 'dark' ? true : false}/>
				<BrowserRouter>
					{children}
				</BrowserRouter>
			</ThemeProvider>
		</AppContext.Provider>
        
    )
}

export const useGlobalContext = () => {
	return React.useContext(AppContext) as AppContextType;
}