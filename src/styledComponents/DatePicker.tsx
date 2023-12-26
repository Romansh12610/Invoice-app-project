import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { defaultInput } from './FormInvoiceStyled';
import Icon from '../Icon/Icon';
import convertDateOutput from '../utilities/convertDateOutput';
import React from 'react';
import { useGlobalContext } from '../components/ContextWrapper';
import { useTheme } from 'styled-components';

export const StyledDatePicker = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${defaultInput};

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }`
;

interface CustomInputProps {
    isDisabled: boolean;
    value?: string;
    onClick?: (e?: React.MouseEvent) => void;
    color: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ isDisabled, value, onClick, color }) => (
    <StyledDatePicker
        disabled={isDisabled}
        value={value}
        onClick={onClick}
    >
        {convertDateOutput(value)}
        <Icon 
            name='calendar'
            size={12}
            color={color}
        />
    </StyledDatePicker>
);


const DatePicker = () => {

    const { globalState, newInvoice, handleInvoiceChange } = useGlobalContext();
    const colorTheme = useTheme();

    return (
        <ReactDatePicker 
            selected={new Date(newInvoice.createdAt)}
            onChange={(date) => handleInvoiceChange(null, 'date', date)}
            minDate={new Date()}
            customInput={
            <CustomInput 
                isDisabled={globalState.isInvoiceEdited} 
                color={colorTheme.general.purple} 
            />}
        />
    )
};

export default DatePicker;