import React from "react";
import Invoices from '../data/data.json';

//invoice types
export type InvoiceListType = typeof Invoices;

export type InvoiceStatusType = 'draft' | 'pending' | 'paid';

export type InvoiceListDispatchType = React.Dispatch<{
    type: string;
    payload?: {
        [ind: string]: string;
    }
}>;

export interface AddressInterface {
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface InitialItemInterface {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface InitialInvoiceInterface {
    clientName: string;
    clientEmail: string;
    senderAddress: AddressInterface;
    clientAddress: AddressInterface;
    createdAt: Date | string; 
    paymentDue: string;
    description: string;
    items: Array<InitialItemInterface>;
    total: number;
    paymentTerms: '1' | '7' | '14' | '30';
}

export type setNewInvoiceType = React.Dispatch<React.SetStateAction<InitialInvoiceInterface>>; 

export type setAddressType = React.Dispatch<React.SetStateAction<AddressInterface>>;

export type setItemsType = React.Dispatch<React.SetStateAction<InitialInvoiceInterface['items']>>;