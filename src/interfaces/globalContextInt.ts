import React from "react";
import Invoices from '../data/data.json';

// generic helper types
type VoidFuncType = () => void;

// filter stuff
export type FilterUnionType = 'pending' | 'draft' | 'paid';

export type FilterStatusType = {
    all: boolean,
    draft: boolean,
    pending: boolean,
    paid: boolean,
};

export interface CustomHTMLButtonElement extends React.ComponentPropsWithoutRef<"button"> {
    'data-filtertype': FilterUnionType; 
    $checked: boolean;
};

export type FilterEventType = React.MouseEvent<CustomHTMLButtonElement>; 

type FilterHandleType = (filterType: FilterUnionType) => void;

//invoice types
type InvoiceList = typeof Invoices;


// globalContext interface
export default interface GlobalContextInt {
    theme: "light" | "dark";
    toggleTheme: VoidFuncType;
    filterStatus: FilterStatusType;
    handleFilterChange: FilterHandleType;
    orientation: "mobile" | "desktop";
    currentInvoiceList: InvoiceList;
}