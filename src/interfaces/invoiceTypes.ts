import React from "react";
import Invoices from '../data/data.json';

//invoice types
export type InvoiceListType = typeof Invoices;

export type InvoiceStatusType = 'draft' | 'pending' | 'paid';

export type InvoiceListDispatchType = React.Dispatch<{
    type: string;
    payload: {
        [ind: string]: string;
    }
}>;

export interface AddressInterface {
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface InitialItemsInterface {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface InitialInvoiceInterface {
    name: string;
    email: string;
    userAddress: AddressInterface;
    clientAddress: AddressInterface;
    invoiceDate: Date; 
    paymentDue: string;
    description: string;
    items: Array<InitialItemsInterface>;
    total: number;
}