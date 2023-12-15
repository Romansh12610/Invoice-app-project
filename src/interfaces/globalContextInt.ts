import React from "react";

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

// globalContext interface
export default interface GlobalContextInt {
    theme: "light" | "dark";
    toggleTheme: VoidFuncType;
    filterStatus: FilterStatusType;
    handleFilterChange: FilterHandleType;
    orientation: "mobile" | "desktop";
}