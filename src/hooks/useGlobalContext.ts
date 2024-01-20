import GlobalContextInt from '../interfaces/globalContextInt';
import React from 'react';

export const AppContext = React.createContext<GlobalContextInt>({} as unknown as GlobalContextInt);

export const useGlobalContext = () => {
	return React.useContext(AppContext) as GlobalContextInt;
};