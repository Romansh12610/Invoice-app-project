import GlobalStyles, { styleTheme } from '../styledComponents/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useThemeToggle from '../hooks/useThemeToggle';
import GlobalContextInt from '../interfaces/globalContextInt';
import useFilterChange from '../hooks/useFilterChange';
import useManageInvoices from '../hooks/useManageInvoices';

const mobileWidthCondition = "(max-width: 768px)";

const AppContext = React.createContext<GlobalContextInt | null>(null);

export default function ContextWrapper({ children }: { children: React.JSX.Element}) {

	// defining and listening for device orientation
	const [isMobile, setIsMobile] = useState(
		window.matchMedia(mobileWidthCondition).matches
	)
	
	useEffect(() => {
		function checkCondition() {
			setIsMobile(window.matchMedia(mobileWidthCondition).matches);
		}

		window.matchMedia(mobileWidthCondition)
			.addEventListener('change', checkCondition);

		return () => {
			window.matchMedia(mobileWidthCondition)
				.removeEventListener('change', checkCondition)
		}
	});

	// take global values from hooks
    const [theme, toggleTheme] = useThemeToggle();
	const [filterStatus, handleFilterChange] = useFilterChange();
	const {
		currentInvoiceList
	} = useManageInvoices();

    return (
		<AppContext.Provider value={{
			theme,
			toggleTheme,
			filterStatus,
			handleFilterChange,
			orientation: isMobile ? "mobile" : "desktop",
			currentInvoiceList,
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