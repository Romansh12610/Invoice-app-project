import initialInvoices from '../data/data.json';
import React, { useReducer, useEffect, useState } from 'react';
import InvoiceReducer from '../reducer/reducer';
import { InvoiceListType, InitialInvoiceInterface, InitialItemsInterface, AddressInterface } from '../interfaces/invoiceTypes';
import { GlobalStateInterface } from '../interfaces/globalContextInt';

// helper types
type RangeOfNames = 'clientName' | 'clientEmail' | 'street' | ''

type HandleInvoiceChangeType = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

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
    createdAt: new Date(),
    paymentDue: ``,
    description: '',
    paymentTerms: '30',
    clientName: '',
    clientEmail: '',
    senderAddress: initialAddress,
    clientAddress: initialAddress,
    items: [],
    total: 0,
};

// initial state - to retrieve than filterType === 'all' 
export const initialState: GlobalStateInterface = {
    invoices: getInvoicesFromLocalStorage() || initialInvoices,
    isFormOpen: false,
    isInvoiceEdited: false,
    isModalOpen: false,
};

const useManageInvoices = () => {

    // reducer
    const [globalState, dispatchAction] = (useReducer as any)(InvoiceReducer, initialState);
    const [newInvoice, setNewInvoice] = useState(initialInvoice);
    const [senderAddress, setSenderAddress] = useState(initialAddress);
    const [clientAddress, setClientAddress] = useState(initialAddress);
    const [items, setItems] = useState([]);

    // each time one of states changes => change new invoice
    useEffect(() => {
        setNewInvoice(i => ({
            ...i,
            senderAddress,
            clientAddress,
            items
        }));
    }, [senderAddress, clientAddress, items]); 

    // every time state changes - reset in localStorage
    useEffect(() => {
        postInvoicesToLocalStorage(globalState.invoices);
    }, [globalState.invoices]);

    // function to change new invoice (or edited)
    const handleInvoiceChange: HandleInvoiceChangeType = (e) => {
        const { name, value }: {
            name: 'gang' | 'rang' | 'bang';
            value: '10' | '14'
        } = e.currentTarget;

        // if paymentTerms --> update paymentDue
        switch (name) {
            case 'rang':
        }
    }
    
    return {
        globalState,
        dispatchAction,
        newInvoice,
        setNewInvoice,
        senderAddress,
        clientAddress,
        items
    }
};

export default useManageInvoices;