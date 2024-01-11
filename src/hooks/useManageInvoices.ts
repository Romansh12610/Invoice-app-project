import initialInvoices from '../data/data.json';
import React, { useReducer, useEffect, useState } from 'react';
import InvoiceReducer from '../reducer/reducer';
import { InvoiceListType, InitialInvoiceInterface, InitialItemInterface, AddressInterface, setItemsType, InitialErrorInterface, BoolAddressInterface } from '../interfaces/invoiceTypes';
import { GlobalStateInterface } from '../interfaces/globalContextInt';
import validateForm from '../utilities/formValidation';

// helper types
type RangeOfNames = 'clientName' | 'clientEmail' | 'street' | 'postCode' | 'country' | 'city' | 'description' | 'itemName' | 'quantity' | 'price';

type TypesOfEvents = 'newInvoice' | 'senderAddress' | 'clientAddress' | 'addItem' | 'removeItem' | 'changeItem';

export type ChangeEventInputType = React.ChangeEvent<HTMLInputElement & { name: RangeOfNames }>;

export type ChangeEventSelectType = React.MouseEvent<HTMLButtonElement>;

export type HandleInvoiceChangeType = (e: ChangeEventInputType | ChangeEventSelectType | false, type: TypesOfEvents, date?: Date | null, index?: number) => void;

// form submission types
export type ActionTypes = 'discard' | 'save' | 'add' | 'draft';

export type SubmitInvoiceForm = (e: React.MouseEvent<HTMLButtonElement & { name: ActionTypes }>, formRef: React.RefObject<HTMLFormElement>, setShouldShowError: React.Dispatch<React.SetStateAction<boolean>>) => void;

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

const initBoolAddress: BoolAddressInterface = {
    street: false,
    city: false,
    postCode: false,
    country: false,
};

const initialItem: InitialItemInterface = {
    name: '',
    quantity: 0,
    price: 0,
    total: 0,
};

const initialInvoice: InitialInvoiceInterface = {
    createdAt: new Date(),
    paymentDue: '',
    description: '',
    paymentTerms: '30',
    clientName: '',
    clientEmail: '',
    senderAddress: initialAddress,
    clientAddress: initialAddress,
    items: [],
    total: 0,
};

const initialErrors: InitialErrorInterface = {
    description: false,
    clientName: false,
    clientEmail: false,
    senderAddress: initBoolAddress,
    clientAddress: initBoolAddress,
    items: [],
};

// initial state - to retrieve than filterType === 'all' 
export const initialState: GlobalStateInterface = {
    invoices: getInvoicesFromLocalStorage() || initialInvoices,
    isFormOpen: false,
    isInvoiceEdited: false,
    isModalOpen: false,
    errors: initialErrors,
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
        
        e.preventDefault();

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
                const newItems = items.map((item, ind) => {
                    if (ind === index) {
                        const newItem = {...item, [name]: value};
                        return newItem;
                    } else {
                        return item;
                    }
                });

                newItems[index].total = newItems[index].price * newItems[index].quantity;

                setItems(newItems);
                break;
            }

            case 'removeItem': {
                const newItems = items.filter((item, ind) => {
                    if (ind === index) {
                        return false;
                    } else {
                        return true;
                    }
                });
                setItems(newItems);
                break;
            }
        }
    };


    // function to submit form
    // type also choosen from state (isInvoiceEdited)
    const submitInvoiceForm: SubmitInvoiceForm = (e, formRef, setShouldShowError) => {

        const { name } = e.currentTarget;

        switch(name) {
            case 'discard': {
                dispatchAction({
                    type: 'discardChanges',
                });
                restoreToInitial();
                break;
            }
            case 'draft': {
                dispatchAction({
                    type: 'addDraft',
                    payload: newInvoice,
                });
                restoreToInitial();
                break;
            }
            case 'add': {
                if (validateForm(formRef) == false) {
                    setShouldShowError(true);
                }
            }
        }
    };

    // restore to initial helper
    const restoreToInitial = () => {
        setNewInvoice(initialInvoice);
        setClientAddress(initialAddress);
        setSenderAddress(initialAddress);
        setItems([]);
    };

    
    return {
        globalState,
        dispatchAction,
        newInvoice,
        senderAddress,
        clientAddress,
        items,
        handleInvoiceChange,
        submitInvoiceForm
    }
};

export default useManageInvoices;