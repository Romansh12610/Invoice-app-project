import React from 'react';

// filter types
export type FilterActiveType = 'paid' | 'pending' | 'draft';

export type FilterStatusType = 'all' | FilterActiveType;

export type FilterStatusSetterType = React.Dispatch<React.SetStateAction<FilterStatusType>>;

export interface CustomHTMLButtonElement extends React.ComponentPropsWithoutRef<"button"> {
    'data-filterstatus': FilterStatusType; 
    $checked: boolean;
};

export type FilterEventType = React.MouseEvent<CustomHTMLButtonElement>; 

export type FilterHandleType = (filterType: FilterStatusType) => void;