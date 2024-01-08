import { MainWrapper, Form, Input, Label, Title, FieldSet, Legend, Backdrop, StyledInputLabelWrapper, ItemsFieldSet, StyledFlexWrapper, TopWrapper, StyledError } from "../styledComponents/FormInvoiceStyled";
import FormFooter from "./FormFooter";
import DatePicker from "../styledComponents/DatePicker";
import { useGlobalContext } from "./ContextWrapper";
import { useParams } from "react-router-dom";
import {createPortal} from 'react-dom';
import GoBackLink from "../shared/goBackLink";
import { useEffect, useRef, useState } from 'react';
import { focusTrapKeyDown, focusTrapKeyUp, keySetType, closeModalIfOutsideClick } from "../utilities/modalUtilities";
import { ActionTypes, ChangeEventInputType } from "../hooks/useManageInvoices";
import SelectLabel from "./Select";
import Items from "./Items";


const FormController = () => {

    // local state for form error
    const [shouldShowError, setShouldShowError] = useState(false);

    // refs
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    const URLparams = useParams();
    // global state
    const { globalState, dispatchAction, newInvoice, senderAddress, clientAddress, handleInvoiceChange, submitInvoiceForm } = useGlobalContext();
    const { isInvoiceEdited } = globalState;

    useEffect(() => {
        // prevent scroll when modal is active
        document.body.style.overflow = 'hidden';

        // focus trap
        const keySet: keySetType = new Set();
        
        const closeFormCallback = () => {
            dispatchAction({ type: 'closeForm' });
        };

        const onKeyDown = (e: KeyboardEvent) => focusTrapKeyDown(e, modalRef, closeFormCallback, keySet);
        const onKeyUp = (e: KeyboardEvent) => focusTrapKeyUp(e, keySet);

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        // if click outside --> close modal
        const handleOutsideClick = (e: MouseEvent) => closeModalIfOutsideClick(e, backdropRef, closeFormCallback);
        document.addEventListener('click', handleOutsideClick);

        return () => {
            // enable scrolling after modal closing
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    // form submit handler
    type SubmitForm = (e: React.FormEvent<HTMLFormElement> & { submitter: { name: ActionTypes }}) => void;

    const handleSubmitForm: SubmitForm = (e) => {
        console.log('submit');

        e.preventDefault();
        const typeOfAction: ActionTypes = e.submitter.name;

        console.log('type of action: ' + typeOfAction);
        
        if ((typeOfAction === 'add' || typeOfAction === 'save') && shouldShowError == false) {
            setShouldShowError(true);
        };

        return submitInvoiceForm(e, typeOfAction);
    };
    
    const controller = (
        <>
            <Backdrop 
                ref={backdropRef}
            />
            <MainWrapper
                aria-modal={true}
                aria-label="Invoice form"
                tabIndex={-1}
                role="dialog"
                ref={modalRef}
            >
                <TopWrapper>
                    <GoBackLink to="/" />
                    <Title>
                        {isInvoiceEdited == false ? 'New Invoice' : `Edit &#35;${URLparams.invoiceId}`}
                    </Title>
                </TopWrapper>
                <Form id='invoice-form' onSubmit={handleSubmitForm}>
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
                            <Items />
                        </StyledFlexWrapper>
                    </ItemsFieldSet>
                    <FormFooter />
                </Form>
            </MainWrapper>
        </>
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

    console.log('should show? :' + shouldShow);

    return (
        <StyledInputLabelWrapper
            $minWidth={props.date ? 270 : props.quantity ? 60 : props.price ? 100 : 140}
        >
            <Label
                htmlFor={props.htmlForID}
            >
                {props.labelText}
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

    const text = props.reason === 'valueMissing' ? "field can't be empty" : 'incorrect format of input';

    return (
        <StyledError>{text}</StyledError>
    )
};