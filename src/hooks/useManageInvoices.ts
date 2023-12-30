import initialInvoices from '../data/data.json';
import React, { useReducer, useEffect, useState } from 'react';
import InvoiceReducer from '../reducer/reducer';
import { InvoiceListType, InitialInvoiceInterface, InitialItemInterface, AddressInterface, setItemsType } from '../interfaces/invoiceTypes';
import { GlobalStateInterface } from '../interfaces/globalContextInt';

// helper types
type RangeOfNames = 'clientName' | 'clientEmail' | 'street' | 'postCode' | 'country' | 'city' | 'description' | 'itemName' | 'quantity' | 'price';

type TypesOfEvents = 'newInvoice' | 'senderAddress' | 'clientAddress' | 'addItem' | 'removeItem' | 'changeItem';

export type ChangeEventInputType = React.ChangeEvent<HTMLInputElement & { name: RangeOfNames }>;

export type ChangeEventSelectType = React.MouseEvent<HTMLButtonElement>;

export type HandleInvoiceChangeType = (e: ChangeEventInputType | ChangeEventSelectType | false, type: TypesOfEvents, date?: Date, index?: number) => void;

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

const initialItem: InitialItemInterface = {
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
    const [items, setItems]: [InitialItemInterface[], setItemsType] = useState([]);

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
    const handleInvoiceChange: HandleInvoiceChangeType = (e, type, date, index) => {
        // setting date instantly:
        if (e === false) {
            setNewInvoice(i => ({
                ...i,
                createdAt: date
            }));
            return;
        }

        const { name, value } = e.currentTarget;

        // if paymentTerms --> update paymentDue
        switch (type) {
            case 'newInvoice': {
                setNewInvoice(i => ({
                    ...i,
                    [name]: value
                }));
                break;
            }

            case 'clientAddress': {
                setClientAddress(a => ({
                    ...a,
                    [name]: value
                }));
                break;
            }

            case 'senderAddress': {
                setSenderAddress(a => ({
                    ...a,
                    [name]: value
                }));
                break;
            }

            case 'addItem': {
                setItems(prevItems => [...prevItems, { ...initialItem }]);
                break;
            }

            case 'changeItem': {

            }

            case 'removeItem': {

            }
        }
    }
    
    return {
        globalState,
        dispatchAction,
        newInvoice,
        senderAddress,
        clientAddress,
        items,
        handleInvoiceChange
    }
};

export default useManageInvoices;