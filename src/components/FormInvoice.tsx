import { MainWrapper, StyledForm, Input, Label, Title, FieldSet, Legend, StyledInputLabelWrapper, ItemsFieldSet, StyledFlexWrapper, TopWrapper, StyledError } from "../styledComponents/FormInvoiceStyled";
// hooks
import { useGlobalContext } from "./ContextWrapper";
import { useParams } from "react-router-dom";
import {createPortal} from 'react-dom';
import React, { useRef, useState, forwardRef, useCallback } from 'react';
import useFormState, { ChangeEventInputType, FormChangeEventType } from "../hooks/useFormState";
import useModal from "../hooks/useModal";
// helper components
import FormFooter from "./FormFooter";
import GoBackLink from "../shared/goBackLink";
import DatePicker from "./DatePicker";
import SelectLabel from "./Select";
import Items from "./Items";
// for animations
import getFormVariants from "../utilities/variants/formVariants";
import keyMap from "../utilities/uniqueKeysForAnimation";
// types
import { RangeOfNames } from "../hooks/useFormState";
import { InvoicePayload } from "../interfaces/reducerTypes";


const FormController = () => {

    // local state for form error
    const [shouldShowError, setShouldShowError] = useState(false);
    // animation state (for exit animation)
    const [animationState, setAnimationState] = useState<'animate' | 'exit'>('animate');

    // refs
    const modalRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const URLparams = useParams();
    // global state
    const { globalState, dispatchAction } = useGlobalContext();
    const { isInvoiceEdited } = globalState;
    const [formState, handleChangeField, restoreToInitial] = useFormState();

    // focus trap + click outside
    const closeCallback = useCallback(async () => {
        // do exit animation
        setAnimationState('exit');
        // wait some time
        await new Promise(res => setTimeout(res, 400));
        // unmount form
        dispatchAction({
            type: 'closeForm'
        });
    }, [dispatchAction]);
    
    // custom hook
    useModal(modalRef, closeCallback);

    // animation
    const formVariants = getFormVariants();
    const elKey = keyMap.get('FORM');
    
    const controller = (
        <MainWrapper
            aria-modal={true}
            aria-label="Invoice form"
            tabIndex={-1}
            role="dialog"
            ref={modalRef}

            key={elKey}
            variants={formVariants}
            animate={animationState}
            initial='initial'
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
                        value={formState.senderAddress.street}
                        onChange={(e) => handleChangeField(e, 'senderAddress')}
                    />
                    <FlexWrapper>
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="City"
                            inputName="city"
                            inputType="text"
                            required
                            htmlForID="sender-city"
                            value={formState.senderAddress.city}
                            onChange={(e) => handleChangeField(e, 'senderAddress')}
                        />
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="Post Code"
                            inputName="postCode"
                            inputType="text"
                            required
                            htmlForID="sender-postcode"
                            value={formState.senderAddress.postCode}
                            onChange={(e) => handleChangeField(e, 'senderAddress')}
                        />
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="Country"
                            inputName="country"
                            inputType="text"
                            required
                            htmlForID="sender-country"
                            value={formState.senderAddress.country}
                            onChange={(e) => handleChangeField(e, 'senderAddress')}
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
                        value={formState.clientName}
                        onChange={(e) => handleChangeField(e, 'newInvoice')}
                    />
                    <InputLabelWrapper
                        shouldShowError={shouldShowError} 
                        labelText="Client's email"
                        inputName="clientEmail"
                        inputType="email"
                        required
                        htmlForID="client-email"
                        value={formState.clientEmail}
                        onChange={(e) => handleChangeField(e, 'newInvoice')}
                    />
                    <InputLabelWrapper
                        shouldShowError={shouldShowError} 
                        labelText="Street Address"
                        inputName="street"
                        inputType="text"
                        required
                        htmlForID="client-street"
                        value={formState.clientAddress.street}
                        onChange={(e) => handleChangeField(e, 'clientAddress')}
                    />
                    <FlexWrapper>
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="City"
                            inputName="city"
                            inputType="text"
                            required
                            htmlForID="client-city"
                            value={formState.clientAddress.city}
                            onChange={(e) => handleChangeField(e, 'clientAddress')}
                        />
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="Post Code"
                            inputName="postCode"
                            inputType="text"
                            required
                            htmlForID="client-postcode"
                            value={formState.clientAddress.postCode}
                            onChange={(e) => handleChangeField(e, 'clientAddress')}
                        />
                        <InputLabelWrapper
                            shouldShowError={shouldShowError} 
                            labelText="Country"
                            inputName="country"
                            inputType="text"
                            required
                            htmlForID="client-country"
                            value={formState.clientAddress.country}
                            onChange={(e) => handleChangeField(e, 'clientAddress')}
                        />
                    </FlexWrapper>
                </FieldSet>
                <FieldSet>
                    <FlexWrapper>
                        <InputLabelWrapper 
                            labelText="Invoice Date"
                            date
                            formState={formState}
                            hanldeChangeField={handleChangeField}
                        />
                        <SelectLabel
                            formState={formState}
                            handleChangeField={handleChangeField} 
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
                        value={formState.description}
                        onChange={(e) => handleChangeField(e, 'newInvoice')}
                    />
                </FieldSet>
                <ItemsFieldSet>
                    <Legend $items>Item List</Legend>
                    <StyledFlexWrapper $col>
                        <Items
                            itemsState={formState.items}
                            handleChangeField={handleChangeField} 
                            shouldShowError={shouldShowError} 
                        />
                    </StyledFlexWrapper>
                </ItemsFieldSet>
                <FormFooter 
                    formRef={formRef}
                    formState={formState}
                    setShouldShowError={setShouldShowError}
                    dispatchAction={dispatchAction}
                    restoreCallback={restoreToInitial}
                    exitAnimationCallback={() => setAnimationState('exit')}
                />
            </Form>
        </MainWrapper>
    ); 

    return createPortal(controller, document.body);
};

export default FormController;

// types for helper components
interface InputLabelWrapperProps {
    labelText: string;
    htmlForID?: string;
    inputName?: RangeOfNames;
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
    formState?: InvoicePayload;
    hanldeChangeField?: FormChangeEventType;
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
                <DatePicker 
                    formState={props.formState}
                    handleChangeField={props.hanldeChangeField} 
                />
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