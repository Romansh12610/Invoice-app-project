import initialInvoices from '../data/data.json';
import { useReducer } from 'react';
import InvoiceReducer from '../reducer/reducer';
// util functions
// helper types
import { InvoiceListType } from '../interfaces/invoiceTypes';
import { GlobalStateInterface } from '../interfaces/globalContextInt'

// helper types
type getInvoicesFromStorage = () => InvoiceListType | [];

// helper localStorage functions
const getInvoicesFromLocalStorage: getInvoicesFromStorage = () => {
    console.log('get from storage:' + localStorage.getItem('invoices'));
    return JSON.parse(localStorage.getItem('invoices'));
};


// initial state - to retrieve than filterType === 'all' 
export function getInitialState(): GlobalStateInterface {
    return {
        invoices: getInvoicesFromLocalStorage() as InvoiceListType || initialInvoices as InvoiceListType,
        isFormOpen: false,
        isInvoiceEdited: false,
        isModalOpen: false,
        isBackdropOpen: false,
        isInvoiceDeleted: false,
    };
};

const useManageInvoices = () => {
    // reducer
    const [globalState, dispatchAction] = useReducer(InvoiceReducer, getInitialState());

    
    return {
        globalState,
        dispatchAction,
    }
};

export default useManageInvoices;