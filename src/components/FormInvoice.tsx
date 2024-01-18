import { MainWrapper, StyledForm, Input, Label, Title, FieldSet, Legend, StyledInputLabelWrapper, ItemsFieldSet, StyledFlexWrapper, TopWrapper, StyledError } from "../styledComponents/FormInvoiceStyled";
// hooks
import { useGlobalContext } from "./ContextWrapper";
import { useParams } from "react-router-dom";
import {createPortal} from 'react-dom';
import React, { useRef, useState, forwardRef, useCallback } from 'react';
import { ChangeEventInputType } from "../hooks/useManageInvoices";
import useModal from "../hooks/useModal";
// helper components
import FormFooter from "./FormFooter";
import GoBackLink from "../shared/goBackLink";
import DatePicker from "./DatePicker";
import SelectLabel from "./Select";
import Items from "./Items";
// for animations
import { AnimatePresence } from "framer-motion";
import getFormVariants from "../utilities/formVariants";
import keyMap from "../utilities/uniqueKeysForAnimation";

const FormController = () => {

    // local state for form error
    const [shouldShowError, setShouldShowError] = useState(false);

    // refs
    const modalRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const URLparams = useParams();
    // global state
    const { globalState, dispatchAction, newInvoice, senderAddress, clientAddress, handleInvoiceChange, submitInvoiceForm, orientation } = useGlobalContext();
    const { isInvoiceEdited } = globalState;

    // focus trap + click outside
    const closeCallback = useCallback(() => {
        dispatchAction({
            type: 'closeForm'
        });
    }, [dispatchAction]);
    
    // custom hook
    useModal(modalRef, closeCallback);

    // animation
    const formVariants = getFormVariants(orientation);
    const elKey = keyMap.get('FORM');
    
    const controller = (
        <AnimatePresence>
            <MainWrapper
                aria-modal={true}
                aria-label="Invoice form"
                tabIndex={-1}
                role="dialog"
                ref={modalRef}

                key={elKey}
                layout="position"
                variants={formVariants}
                exit='exit'
                animate='animate'
            >
                <TopWrapper>
                    <GoBackLink to="/" />
                    <Title>
                        {isInvoiceEdited == false ? 'New Invoice' : `Edit &#35;${URLparams.invoiceId}`}
                    </Title>
                </TopWrapper>
                <Form id='invoice-form' ref={formRef}>
                    <FieldSet>
                        <Legend>Bill from</Legend>
                        <InputLabelWrapper
                            shouldShowError={shouldShowError}
                            labelText="Street Address"
                            htmlForID="sender-street"
                            inputName="street"
                            inputType="text"
                            required
                            value={senderAddress.street}
                            onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                        />
                        <FlexWrapper>
                            <InputLabelWrapper
                                shouldShowError={shouldShowError} 
                                labelText="City"
                                inputName="city"
                                inputType="text"
                                required
                                htmlForID="sender-city"
                                value={senderAddress.city}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                            <InputLabelWrapper
                                shouldShowError={shouldShowError} 
                                labelText="Post Code"
                                inputName="postCode"
                                inputType="text"
                                required
                                htmlForID="sender-postcode"
                                value={senderAddress.postCode}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                            <InputLabelWrapper
                                shouldShowError={shouldShowError} 
                                labelText="Country"
                                inputName="country"
                                inputType="text"
                                required
                                htmlForID="sender-country"
                                value={senderAddress.country}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                        </FlexWrapper>
                    </FieldSet>
                    <FieldSet>
                        <Legend>Bill to</Legend>
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="Client's Name"
                            inputName="clientName"
                            inputType="text"
                            required
                            htmlForID="client-name"
                            value={newInvoice.clientName}
                            onChange={(e) => handleInvoiceChange(e, 'newInvoice')}
                        />
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="Client's email"
                            inputName="clientEmail"
                            inputType="email"
                            required
                            htmlForID="client-email"
                            value={newInvoice.clientEmail}
                            onChange={(e) => handleInvoiceChange(e, 'newInvoice')}
                        />
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="Street Address"
                            inputName="street"
                            inputType="text"
                            required
                            htmlForID="client-street"
                            value={clientAddress.street}
                            onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                        />
                        <FlexWrapper>
                            <InputLabelWrapper
                                shouldShowError={shouldShowError} 
                                labelText="City"
                                inputName="city"
                                inputType="text"
                                required
                                htmlForID="client-city"
                                value={clientAddress.city}
                                onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                            />
                            <InputLabelWrapper
                                shouldShowError={shouldShowError} 
                                labelText="Post Code"
                                inputName="postCode"
                                inputType="text"
                                required
                                htmlForID="client-postcode"
                                value={clientAddress.postCode}
                                onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                            />
                            <InputLabelWrapper
                                shouldShowError={shouldShowError} 
                                labelText="Country"
                                inputName="country"
                                inputType="text"
                                required
                                htmlForID="client-country"
                                value={clientAddress.country}
                                onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                            />
                        </FlexWrapper>
                    </FieldSet>
                    <FieldSet>
                        <FlexWrapper>
                            <InputLabelWrapper 
                                labelText="Invoice Date"
                                date
                            />
                            <SelectLabel 
                                labelText="Payment Terms" 
                            />
                        </FlexWrapper>
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="Project Description"
                            inputName="description"
                            inputType="text"
                            htmlForID="description"
                            required
                            value={newInvoice.description}
                            onChange={(e) => handleInvoiceChange(e, 'newInvoice')}
                        />
                    </FieldSet>
                    <ItemsFieldSet>
                        <Legend $items>Item List</Legend>
                        <StyledFlexWrapper $col>
                            <Items shouldShowError={shouldShowError} />
                        </StyledFlexWrapper>
                    </ItemsFieldSet>
                    <FormFooter 
                        formRef={formRef}
                        submitInvoiceForm={submitInvoiceForm}
                        setShouldShowError={setShouldShowError}
                    />
                </Form>
            </MainWrapper>
        </AnimatePresence>
    ); 

    return createPortal(controller, document.body);
};

export default FormController;

// types for helper components
interface InputLabelWrapperProps {
    labelText: string;
    htmlForID?: string;
    inputName?: string;
    inputType?: 'text' | 'email';
    required?: boolean;
    value?: string | number;
    onChange?: (e: ChangeEventInputType) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    date?: true;
    quantity?: true;
    price?: true;
    // shouldShowError state from form
    shouldShowError?: boolean;
}

// helper components
export const InputLabelWrapper = (props: InputLabelWrapperProps) => {

    // form validation logic (error showing)
    const emailInputRegexp = /\w{5,}@\w{2,}\.\w{2,}/;
    // default for reason is null
    let reason: Reason | null = null;

    if (props.shouldShowError && typeof props.value === 'string') {
        if (props.value.length === 0) {
            reason = 'valueMissing';
        }
        else if (props.inputType === 'email' && !emailInputRegexp.test(props.value)) {
            reason = 'typeMismatch';
        }
    }

    // additional check cause not all inputs should show err
    const shouldShow: boolean = (props.required && reason !== null) ? true : false; 

    return (
        <StyledInputLabelWrapper
            $minWidth={props.date ? 270 : props.quantity ? 60 : props.price ? 100 : 172}
        >
            <Label
                htmlFor={props.htmlForID}
            >
                {props.labelText}
                {' '}
                {shouldShow && <Error reason={reason} />}
            </Label>
            {props.date ? (
                <DatePicker />
            ) : (<Input
                id={props.htmlForID}
                required={props.required} 
                type={props.inputType}
                name={props.inputName}
                value={props.value}
                onChange={props.onChange}
                onKeyPress={(props.quantity || props.price) && props.onKeyPress}
                $showError={shouldShow}
            />)}
        </StyledInputLabelWrapper>
    )
};

export const FlexWrapper = (props: { children: React.ReactNode }) => {
    return (
        <StyledFlexWrapper>
            {props.children}
        </StyledFlexWrapper>
    )
};

// custom error for inputs
type Reason = 'valueMissing' | 'typeMismatch';

interface ErrorProps {
    reason: Reason
}

export const Error = (props: ErrorProps) => {

    const text = props.reason === 'valueMissing' ? "can't be empty" : 'incorrect format';

    return (
        <StyledError>{text}</StyledError>
    )
};

// form component
interface FormProps {
    children: React.ReactNode;
    id: string;
}

type FormRef = React.RefObject<HTMLFormElement>;

const Form = forwardRef((props: FormProps, ref: FormRef) => {
    
    return (
        <StyledForm ref={ref} id={props.id} noValidate>
            {props.children}
        </StyledForm>
    )
});