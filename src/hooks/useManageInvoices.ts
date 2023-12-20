import initialInvoices from '../data/data.json';
import { useReducer, useEffect, useState } from 'react';
import InvoiceReducer from '../reducer/reducer';
import { InvoiceListType, InitialInvoiceInterface, InitialItemsInterface, AddressInterface } from '../interfaces/invoiceTypes';

// helper localStorage functions
const getInvoicesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('invoices'));
};

const postInvoicesToLocalStorage = (invoices: InvoiceListType) => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
};

// initial state containers
const initialAddress: AddressInterface = {
    street: '',
    city: '',
    postCode: '',
    country: '',
};

const initialItems: InitialItemsInterface = {
    name: '',
    quantity: 0,
    price: 0,
    total: 0,
};

const initialInvoice: InitialInvoiceInterface = {
    name: '',
    email: '',
    description: '',
    userAddress: initialAddress,
    clientAddress: initialAddress,
    invoiceDate: new Date(),
    paymentDue: '30',
    items: [],
    total: 0,
};

// initial state - to retrieve than filterType === 'all' 
export const initialState = {
    invoices: getInvoicesFromLocalStorage() && initialInvoices,
    isFormOpen: false,
    isInvoiceEdited: false,
    isModalOpen: false,
};

const useManageInvoices = () => {

    // reducer
    const [globalState, dispatchAction] = (useReducer as any)(InvoiceReducer, initialState);
    const [invoice, setInvoice] = useState(initialInvoice);


    // everyTime state changes - reset in localStorage
    useEffect(() => {
        postInvoicesToLocalStorage(globalState.invoices);
    }, [globalState.invoices]);
    
    return {
        globalState,
        dispatchAction,
        invoice,
        setInvoice
    }
};

export default useManageInvoices;