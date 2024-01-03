import { MainWrapper, Form, Input, Label, Title, FieldSet, Legend, Backdrop, StyledInputLabelWrapper, ItemsFieldSet, StyledFlexWrapper, TopWrapper } from "../styledComponents/FormInvoiceStyled";
import DatePicker from "../styledComponents/DatePicker";
import { useGlobalContext } from "./ContextWrapper";
import { useParams } from "react-router-dom";
import {createPortal} from 'react-dom';
import GoBackLink from "../shared/goBackLink";
import { useEffect, useRef } from 'react';
import { focusTrapKeyDown, focusTrapKeyUp, keySetType, closeModalIfOutsideClick } from "../utilities/modalUtilities";
import { ChangeEventInputType } from "../hooks/useManageInvoices";
import SelectLabel from "./Select";
import Items from "./items";


const FormController = () => {
    // refs for Backdrop and Form
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    const URLparams = useParams();
    const { globalState, dispatchAction, newInvoice, senderAddress, clientAddress, handleInvoiceChange } = useGlobalContext();
    const { isInvoiceEdited, isFormOpen } = globalState;

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
                <Form>
                    <FieldSet>
                        <Legend>Bill from</Legend>
                        <InputLabelWrapper 
                            labelText="Street Address"
                            htmlForID="sender-street"
                            inputName="street"
                            value={senderAddress.street}
                            onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                        />
                        <FlexWrapper>
                            <InputLabelWrapper 
                                labelText="City"
                                inputName="city"
                                htmlForID="sender-city"
                                value={senderAddress.city}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                            <InputLabelWrapper 
                                labelText="Post Code"
                                inputName="postCode"
                                htmlForID="sender-postcode"
                                value={senderAddress.postCode}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                            <InputLabelWrapper 
                                labelText="Country"
                                inputName="country"
                                htmlForID="sender-country"
                                value={senderAddress.country}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                        </FlexWrapper>
                    </FieldSet>
                    <FieldSet>
                        <Legend>Bill to</Legend>
                        <InputLabelWrapper 
                            labelText="Client's Name"
                            inputName="clientName"
                            htmlForID="client-name"
                            value={newInvoice.clientName}
                            onChange={(e) => handleInvoiceChange(e, 'newInvoice')}
                        />
                        <InputLabelWrapper 
                            labelText="Client's email"
                            inputName="clientEmail"
                            htmlForID="client-email"
                            value={newInvoice.clientEmail}
                            onChange={(e) => handleInvoiceChange(e, 'newInvoice')}
                        />
                        <InputLabelWrapper 
                            labelText="Street Address"
                            inputName="street"
                            htmlForID="client-street"
                            value={clientAddress.street}
                            onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                        />
                        <FlexWrapper>
                            <InputLabelWrapper 
                                labelText="City"
                                inputName="city"
                                htmlForID="client-city"
                                value={clientAddress.city}
                                onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                            />
                            <InputLabelWrapper 
                                labelText="Post Code"
                                inputName="postCode"
                                htmlForID="client-postcode"
                                value={clientAddress.postCode}
                                onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                            />
                            <InputLabelWrapper 
                                labelText="Country"
                                inputName="country"
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
                            labelText="Project Description"
                            inputName="description"
                            htmlForID="description"
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
    value?: string | number;
    onChange?: (e: ChangeEventInputType) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    date?: true;
    quantity?: true;
    price?: true;
}

// helper components
export const InputLabelWrapper = (props: InputLabelWrapperProps) => {
    return (
        <StyledInputLabelWrapper
            $minWidth={props.date ? 270 : props.quantity ? 60 : props.price ? 100 : 140}
        >
            <Label
                htmlFor={props.htmlForID}
            >{props.labelText}</Label>
            {props.date ? (
                <DatePicker />
            ) : (<Input
                id={props.htmlForID} 
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