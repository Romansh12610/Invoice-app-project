import React from "react";
import ReducerActions from "./reducerTypes";

//invoice types
export type InvoiceListType = InitialInvoiceInterface[];

export type InvoiceStatusType = 'draft' | 'pending' | 'paid';

export type InvoiceListDispatchType = React.Dispatch<ReducerActions>;

// helper int for items
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

// items int
export interface InitialInvoiceInterface {
    id: string;
    status: 'pending' | 'draft' | 'paid';
    clientName: string;
    clientEmail: string;
    senderAddress: AddressInterface;
    clientAddress: AddressInterface;
    createdAt: Date | string; 
    paymentDue: string;
    description: string;
    items: Array<InitialItemInterface> | [];
    total: number;
    paymentTerms: 1 | 7 | 14 | 30;
}

export type setNewInvoiceType = React.Dispatch<React.SetStateAction<InitialInvoiceInterface>>; 

export type setAddressType = React.Dispatch<React.SetStateAction<AddressInterface>>;

export type setItemsType = React.Dispatch<React.SetStateAction<InitialInvoiceInterface['items']>>;