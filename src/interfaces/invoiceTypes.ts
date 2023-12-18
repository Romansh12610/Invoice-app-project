import React from "react";
import Invoices from '../data/data.json';

//invoice types
export type InvoiceListType = typeof Invoices;

export type InvoiceListDispatchType = React.Dispatch<{
    type: string;
    payload: {
        [ind: string]: string;
    }
}>;