import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from 'styled-components';
import { defaultInput } from './FormInvoiceStyled';
import { forwardRef } from 'react';
import Icon from '../Icon/Icon';
import convertDateFromString from '../utilities/convertDate';
import React from 'react';
import { useGlobalContext } from '../components/ContextWrapper';

export const StyledDatePicker = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${defaultInput};

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    };
`;

interface CustomInputProps {
    isDisabled: boolean;
    value: string;
    onClick: (e?: React.MouseEvent) => void;
    color: string;
}

export const CustomInput = forwardRef(({ isDisabled, value, onClick, color }: CustomInputProps, ref: React.RefObject<HTMLButtonElement>) => (
    <StyledDatePicker
        disabled={isDisabled}
        value={value}
        onClick={onClick}
        ref={ref}
    >
        {convertDateFromString(value)}
        <Icon 
            name='calendar'
            size={12}
            color={color}
        />
    </StyledDatePicker>
));


const DatePicker = () => {

    const { globalState, newInvoice, handleInvoiceChange } = useGlobalContext();

    return (
        <ReactDatePicker 
            selected={new Date(newInvoice.createdAt)}
            onChange={(date) => handleInvoiceChange(null, 'date', date)}
            minDate={newInvoice.createdAt}
            customInput={<CustomInput isDisabled={ globalState.isInvoiceEdited } />}
        />
    )
}