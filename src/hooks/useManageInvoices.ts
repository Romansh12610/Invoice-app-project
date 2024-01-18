import initialInvoices from '../data/data.json';
import React, { useReducer, useEffect, useState, useCallback } from 'react';
import InvoiceReducer from '../reducer/reducer';
import { InvoiceListType, InitialInvoiceInterface, InitialItemInterface, AddressInterface, setItemsType } from '../interfaces/invoiceTypes';
import { GlobalStateInterface } from '../interfaces/globalContextInt';
// util functions
import validateForm from '../utilities/formValidation';
import getPaymentDueDate from '../utilities/getPaymentDueDate';
import sumTotal from '../utilities/sumTotal';


// helper types
type getInvoicesFromStorage = () => InvoiceListType | [];

type RangeOfNames = 'clientName' | 'clientEmail' | 'street' | 'postCode' | 'country' | 'city' | 'description' | 'itemName' | 'quantity' | 'price';

type TypesOfEvents = 'newInvoice' | 'senderAddress' | 'clientAddress' | 'addItem' | 'removeItem' | 'changeItem' | 'date';

export type ChangeEventInputType = React.ChangeEvent<HTMLInputElement & { name: RangeOfNames }>;

export type ChangeEventSelectType = React.MouseEvent<HTMLButtonElement>;

export type HandleInvoiceChangeType = (e: ChangeEventInputType | ChangeEventSelectType | false, type: TypesOfEvents, date?: Date | null, index?: number) => void;

// form submission types
export type ActionTypes = 'discard' | 'save' | 'add' | 'draft';

export type SubmitInvoiceForm = (e: React.MouseEvent<HTMLButtonElement & { name: ActionTypes }>, formRef: React.RefObject<HTMLFormElement>, setShouldShowError: React.Dispatch<React.SetStateAction<boolean>>, exitAnimationStateCallback: () => void) => void;

// helper localStorage functions
const getInvoicesFromLocalStorage: getInvoicesFromStorage = () => {
    console.log('get from storage:' + localStorage.getItem('invoices'));
    return JSON.parse(localStorage.getItem('invoices'));
};

const postInvoicesToLocalStorage = (invoices: InvoiceListType) => {
    console.log('post inv to storage: ', invoices);
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
    id: '',
    status: 'pending',
    createdAt: new Date(),
    paymentDue: '',
    description: '',
    paymentTerms: 30,
    clientName: '',
    clientEmail: '',
    senderAddress: initialAddress,
    clientAddress: initialAddress,
    items: [],
    total: 0,
};

// get init invoices function
const getInitialInvoices = () => {
    const invoicesFromStorage = getInvoicesFromLocalStorage();
    if (invoicesFromStorage.length > 1) {
        return invoicesFromStorage;
    } else {
    }
    return initialInvoices;
};

// initial state - to retrieve than filterType === 'all' 
export const initialState: GlobalStateInterface = {
    invoices: getInitialInvoices() as InvoiceListType,
    isFormOpen: false,
    isInvoiceEdited: false,
    isModalOpen: false,
    isBackdropOpen: false,
    isInvoiceDeleted: false,
};

const useManageInvoices = () => {
    // reducer
    const [globalState, dispatchAction] = useReducer(InvoiceReducer, initialState);

    // form state
    const [newInvoice, setNewInvoice] = useState(initialInvoice);
    const [senderAddress, setSenderAddress] = useState(initialAddress);
    const [clientAddress, setClientAddress] = useState(initialAddress);
    const [items, setItems]: [InitialItemInterface[], setItemsType] = useState([]);

    // *** effect to track updates ***
    useEffect(() => {   
        console.log('invoice changed, here new: ', newInvoice);
    }, [newInvoice]);

    // each time one of states changes => change new invoice
    useEffect(() => {

        console.log('useEffect triggers, new state of invoice: ', newInvoice);

        setNewInvoice(i => ({
            ...i,
            senderAddress,
            clientAddress,
            items
        }));
    }, [senderAddress, clientAddress, items]); 

    // every time state changes - reset in localStorage
    useEffect(() => {
        postInvoicesToLocalStorage(globalState.invoices as InvoiceListType);
    }, [globalState.invoices]);

    // function to change new invoice (or edited)
    const handleInvoiceChange: HandleInvoiceChangeType = useCallback((e, type, date, index) => {
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
        console.log('name/value of redacted event: ' + name + ' / ' + value);

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
                    if (ind === index && item) {
                        return false;
                    } else {
                        return true;
                    }
                });
                setItems(newItems);
                break;
            }
        }
    }, [setNewInvoice, setClientAddress, setClientAddress, items]);


    // function to submit form
    // type also choosen from state (isInvoiceEdited)
    const submitInvoiceForm: SubmitInvoiceForm = useCallback(async (e, formRef, setShouldShowError, exitAnimationStateCallback) => {

        const { name } = e.currentTarget;

        // call exit animation
        exitAnimationStateCallback();

        // wait
        await new Promise(res => setTimeout(res, 400));

        // dispatch
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
                    payload: {
                        ...newInvoice,
                        paymentDue: getPaymentDueDate(newInvoice.createdAt, newInvoice.paymentTerms),
                        status: 'draft',
                        total: sumTotal(newInvoice.items),
                    },
                });
                restoreToInitial();
                break;
            }
            case 'add': {
                if (validateForm(formRef) == false) {
                    setShouldShowError(true);
                    return;
                } 
                else {
                    dispatchAction({
                        type: 'addInvoice',
                        payload: {
                            ...newInvoice,
                            paymentDue: getPaymentDueDate(newInvoice.createdAt, newInvoice.paymentTerms),
                            status: 'pending',
                            total: sumTotal(newInvoice.items),
                        },
                    });
                    restoreToInitial();
                    break;
                }
            }
        }
    }, []);

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