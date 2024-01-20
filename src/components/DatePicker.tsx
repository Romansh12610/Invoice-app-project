import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { defaultInput } from '../styledComponents/FormInvoiceStyled';
import Icon from '../Icon/Icon';
import convertDateOutput from '../utilities/convertDateOutput';
import React, { forwardRef, useMemo } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useTheme } from 'styled-components';
import rem from '../utilities/pxIntoRem';
// types
import { FormChangeEventType } from '../hooks/useFormState';
import { InvoicePayload } from '../interfaces/reducerTypes';

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
    onChange?: any;
    ref?: React.RefObject<HTMLInputElement>;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ isDisabled, value, color, onBlur, onFocus, onChange }, ref) => {

    const dateOutput = useMemo(() => {
        return convertDateOutput(value);
    }, [value]);

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            flex: '1',
            minWidth: `${rem(140)}`
        }}>
            <StyledDatePicker
                disabled={isDisabled}
                value={dateOutput}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
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
    )
});


// Main component
interface DatePickerProps {
    formState: InvoicePayload;
    handleChangeField: FormChangeEventType; 
}

const DatePicker = (props: DatePickerProps) => {

    const { globalState } = useGlobalContext();
    const colorTheme = useTheme();

    return (
        <ReactDatePicker 
            selected={new Date(props.formState.createdAt)}
            onChange={(date: Date | null) => props.handleChangeField(false, 'date', date)}
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