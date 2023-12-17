import React from "react";
import Invoices from '../data/data.json';

// generic helper types
type VoidFuncType = () => void;

// filter types
export type FilterActiveType = 'paid' | 'pending' | 'draft';
export type FilterStatusType = 'all' | FilterActiveType;

export interface CustomHTMLButtonElement extends React.ComponentPropsWithoutRef<"button"> {
    'data-filtertype': FilterStatusType; 
    $checked: boolean;
};

export type FilterEventType = React.MouseEvent<CustomHTMLButtonElement>; 

type FilterHandleType = (filterType: FilterStatusType) => void;

//invoice types
export type InvoiceListType = typeof Invoices;

export type InvoiceListSetterType = React.Dispatch<React.SetStateAction<InvoiceListType>>

// globalContext interface
export default interface GlobalContextInt {
    theme: "light" | "dark";
    toggleTheme: VoidFuncType;
    filterStatus: FilterStatusType;
    handleFilterChange: FilterHandleType;
    orientation: "mobile" | "desktop";
    currentInvoiceList: InvoiceListType;
    setCurrentInvoiceList: InvoiceListSetterType;
}