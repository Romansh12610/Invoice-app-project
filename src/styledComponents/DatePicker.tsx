import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { defaultInput } from './FormInvoiceStyled';
import Icon from '../Icon/Icon';
import convertDateOutput from '../utilities/convertDateOutput';
import React, { forwardRef } from 'react';
import { useGlobalContext } from '../components/ContextWrapper';
import { useTheme } from 'styled-components';
import rem from '../utilities/pxIntoRem';

export const StyledDatePicker = styled.input`
    ${defaultInput};
    width: 100%;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }`
;

interface CustomInputProps {
    isDisabled: boolean;
    color: string;
    value?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLButtonElement>, date: Date | null) => void;
    ref?: React.RefObject<HTMLInputElement>;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ isDisabled, value, color, onBlur, onFocus, onChange }, ref) => (
    <div style={{
        position: 'relative',
        display: 'flex',
        flex: '1',
        minWidth: `${rem(140)}`
    }}>
        <StyledDatePicker
            disabled={isDisabled}
            value={convertDateOutput(value)}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => onChange(e, new Date())}
            ref={ref}
            readOnly
        />
        <Icon 
            color={color}
            size={16}
            name='calendar'
            customStyle={{
                position: 'absolute',
                right: '5%',
                top: '50%',
                transform: 'translateY(-50%)'
            }}
        />
    </div>
));

const DatePicker = () => {

    const { globalState, newInvoice, handleInvoiceChange } = useGlobalContext();
    const colorTheme = useTheme();


    return (
        <ReactDatePicker 
            selected={new Date(newInvoice.createdAt)}
            onChange={(date: Date | null) => handleInvoiceChange(false, 'date', date)}
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