import initialInvoices from '../data/data.json';
import { useReducer, useEffect } from 'react';
import InvoiceReducer from '../reducer/reducer';
import { InvoiceListType } from '../interfaces/invoiceTypes';

// helper localStorage functions
const getInvoicesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('invoices'));
};

const postInvoicesToLocalStorage = (invoices: InvoiceListType) => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
};

// initial state - to retrieve than filterType === 'all' 
export const initialState = getInvoicesFromLocalStorage() && initialInvoices;

const useManageInvoices = () => {

    // reducer
    const [invoices, dispatchInvoices] = (useReducer as any)(InvoiceReducer, initialState);

    // everyTime state changes - reset in localStorage
    useEffect(() => {
        postInvoicesToLocalStorage(invoices);
    }, [invoices]);
    
    return {
        invoices,
        dispatchInvoices
    }
};

export default useManageInvoices;