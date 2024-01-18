import GlobalStyles, { styleTheme } from '../styledComponents/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import useThemeToggle from '../hooks/useThemeToggle';
import GlobalContextInt from '../interfaces/globalContextInt';
import useFilterStatus from '../hooks/useFilterChange';
import useManageInvoices from '../hooks/useManageInvoices';
import useDeviceOrientation from '../hooks/useDeviceOrientation';

const AppContext = React.createContext<GlobalContextInt | null>(null);

export default function ContextWrapper({ children }: { children: React.ReactNode }) {

	// device orientation
	const orientation = useDeviceOrientation();

	// take global state values from hooks
    const [theme, toggleTheme] = useThemeToggle();
	const [filterStatus, setFilterStatus] = useFilterStatus();
	const {
		globalState,
		dispatchAction,
	} = useManageInvoices();
	console.log('context rerender');
	console.log('CONTEXT current state: ', globalState.invoices);

    return (
		<AppContext.Provider value={{
			theme,
			toggleTheme,
			filterStatus,
			setFilterStatus,
			orientation,
			globalState,
			dispatchAction,
		}}>
			<ThemeProvider theme={theme === 'dark' ? styleTheme.dark : styleTheme.light}>
				<GlobalStyles $isDark={theme === 'dark' ? true : false}/>
				<BrowserRouter>
					{children}
				</BrowserRouter>
			</ThemeProvider>
		</AppContext.Provider>
    );
}

export const useGlobalContext = () => {
	return React.useContext(AppContext) as GlobalContextInt;
};