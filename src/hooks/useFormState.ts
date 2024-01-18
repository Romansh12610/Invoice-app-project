// IMPORTS
// types
import { AddressInterface, InitialItemInterface } from "../interfaces/invoiceTypes";
import { InvoicePayload } from "../interfaces/reducerTypes";
// hooks
import { useState, useCallback } from 'react';


//TYPES
// form changing types
export type RangeOfNames = 'clientName' | 'clientEmail' | 'street' | 'postCode' | 'country' | 'city' | 'description' | 'name' | 'quantity' | 'price';

type TypesOfEvents = 'newInvoice' | 'senderAddress' | 'clientAddress' | 'addItem' | 'removeItem' | 'changeItem' | 'date';

export type ChangeEventInputType = React.ChangeEvent<HTMLInputElement & { name: RangeOfNames }>;

export type ChangeEventSelectType = React.MouseEvent<HTMLButtonElement>;

export type FormChangeEventType = (e: ChangeEventInputType | ChangeEventSelectType | false, type: TypesOfEvents | null, date?: Date | null, index?: number) => void;



// DATA
// initial state
const initialItem: InitialItemInterface = {
    name: '',
    quantity: 0,
    price: 0,
    total: 0,
};

function InitialAddress() {
    this.street = '';
    this.postCode = '';
    this.country = '';
    this.city = '';
};

const getInitialFormState = (): InvoicePayload => {
    return {
        status: 'pending',
        createdAt: new Date(),
        paymentDue: '',
        description: '',
        paymentTerms: 30,
        clientName: '',
        clientEmail: '',
        senderAddress: new InitialAddress() as AddressInterface,
        clientAddress: new InitialAddress() as AddressInterface,
        items: [] as InitialItemInterface[],
        total: 0,
    }
};


// custom hook
const useFormState = () => {

    const [formState, setFormState] = useState(() => getInitialFormState());

    // FORM STATE HANDLING
    const handleChangeField: FormChangeEventType = useCallback((e, type, date, index) => {

        // if date changes
        if (e === false) {
            setFormState(prevState => ({
                ...prevState,
                createdAt: date
            }));
            return;
        }
        

        e.preventDefault();
        const { name, value } = e.currentTarget;


        switch (type) {
            // all text inputs
            case 'newInvoice': {
                setFormState(prevState => ({
                    ...prevState,
                    [name]: value
                }));
                break;
            }

            // addresses
            case 'senderAddress': {
                setFormState(prevState => ({
                    ...prevState,
                    senderAddress: {
                        ...prevState.senderAddress,
                        [name]: value
                    }
                }));
                break;
            }

            case 'clientAddress': {
                setFormState(prevState => ({
                    ...prevState,
                    clientAddress: {
                        ...prevState.clientAddress,
                        [name]: value,
                    }
                }));
                break;
            }

            // items: add / change / delete 
            case 'addItem': {
                setFormState(prevState => ({
                    ...prevState,
                    items: [...prevState.items, {...initialItem}]
                }));
                break;
            }

            case 'changeItem': {
                const newItems = formState.items.map((item: InitialItemInterface, ind: number) => {
                    if (ind === index) {
                        const newItem = {...item, [name]: value};
                        return newItem;
                    } else {
                        return item;
                    }
                });

                newItems[index].total = newItems[index].price * newItems[index].quantity;

                setFormState(prevState => ({
                    ...prevState,
                    items: newItems,
                }));
                break;
            }

            case 'removeItem': {
                const newItems = formState.items.filter((item, ind) => {
                    if (ind === index && item) {
                        return false;
                    } else {
                        return true;
                    }
                });

                setFormState(prevState => ({
                    ...prevState,
                    items: newItems,
                }));
                break;
            }
        }

    }, [formState]);

    // helper functions
    const restoreToInitial = () => {
        const initState = getInitialFormState();
        setFormState(initState);
    };

    return [formState, handleChangeField, restoreToInitial] as const;
};


export default useFormState;