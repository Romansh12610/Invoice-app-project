import GlobalStyles, { styleTheme } from '../styledComponents/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import useThemeToggle from '../hooks/useThemeToggle';
import GlobalContextInt from '../interfaces/globalContextInt';


const AppContext = React.createContext<GlobalContextInt | null>(null);

export default function ContextWrapper({ children }: { children: React.JSX.Element}) {

    const [theme, toggleTheme] = useThemeToggle();

	//global context

    return (
		<AppContext.Provider value={{
			theme,
			toggleTheme,
		}}>
			<ThemeProvider theme={theme === 'dark' ? styleTheme.dark : styleTheme.light}>
				<GlobalStyles $isDark={theme === 'dark' ? true : false}/>
				<BrowserRouter>
					{children}
				</BrowserRouter>
			</ThemeProvider>
		</AppContext.Provider>
        
    )
}

export const useGlobalContext = () => {
	return React.useContext(AppContext) as GlobalContextInt;
}