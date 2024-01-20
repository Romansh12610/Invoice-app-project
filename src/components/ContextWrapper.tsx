import GlobalStyles, { styleTheme } from '../styledComponents/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import useThemeToggle from '../hooks/useThemeToggle';
import useFilterStatus from '../hooks/useFilterStatus';
import useManageInvoices from '../hooks/useManageInvoices';
import useDeviceOrientation from '../hooks/useDeviceOrientation';
import { AppContext } from '../hooks/useGlobalContext';

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
				<BrowserRouter basename='/Invoice-app-project/'>
					{children}
				</BrowserRouter>
			</ThemeProvider>
		</AppContext.Provider>
    );
}