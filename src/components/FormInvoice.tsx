import { MainWrapper, Form, Input, Label, Title, FieldSet, Legend, Backdrop, StyledInputLabelWrapper, ItemsFieldSet, StyledFlexWrapper, Select } from "../styledComponents/FormInvoiceStyled";
import { useGlobalContext } from "./ContextWrapper";
import { useParams } from "react-router-dom";
import {createPortal} from 'react-dom';
import GoBackLink from "../shared/goBackLink";
import { useEffect, useRef } from 'react';
import { focusTrapKeyDown, focusTrapKeyUp, keySetType, closeModalIfOutsideClick } from "../utilities/modalUtilities";
import { ChangeEventInputType, ChangeEventSelectType } from "../hooks/useManageInvoices";


const FormController = () => {

    // refs for Backdrop and Form
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    const URLparams = useParams();
    const { globalState, dispatchAction, newInvoice, senderAddress, clientAddress, items, handleInvoiceChange } = useGlobalContext();
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
                <GoBackLink to="/" />
                <Title>
                    {isInvoiceEdited == false ? 'New Invoice' : `Edit &#35;${URLparams.invoiceId}`}
                </Title>
                <Form>
                    <FieldSet $name='userAddress'>
                        <Legend>Bill from</Legend>
                        <InputLabelWrapper 
                            labelText="StreetAddress"
                            inputName="street"
                            value={senderAddress.street}
                            onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                        />
                        <FlexWrapper>
                            <InputLabelWrapper 
                                labelText="City"
                                inputName="city"
                                value={senderAddress.city}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                            <InputLabelWrapper 
                                labelText="Post Code"
                                inputName="postCode"
                                value={senderAddress.postCode}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                            <InputLabelWrapper 
                                labelText="Country"
                                inputName="country"
                                value={senderAddress.country}
                                onChange={(e) => handleInvoiceChange(e, 'senderAddress')}
                            />
                        </FlexWrapper>
                    </FieldSet>
                    <FieldSet $name="clientAddress">
                        <Legend>Bill to</Legend>
                        <InputLabelWrapper 
                            labelText="Client's Name"
                            inputName="clientName"
                            value={newInvoice.clientName}
                            onChange={(e) => handleInvoiceChange(e, 'newInvoice')}
                        />
                        <InputLabelWrapper 
                            labelText="Client's email"
                            inputName="clientEmail"
                            value={newInvoice.clientEmail}
                            onChange={(e) => handleInvoiceChange(e, 'newInvoice')}
                        />
                        <InputLabelWrapper 
                            labelText="Street Address"
                            inputName="street"
                            value={clientAddress.street}
                            onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                        />
                        <FlexWrapper>
                            <InputLabelWrapper 
                                labelText="City"
                                inputName="city"
                                value={clientAddress.city}
                                onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                            />
                            <InputLabelWrapper 
                                labelText="Post Code"
                                inputName="postCode"
                                value={clientAddress.postCode}
                                onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                            />
                            <InputLabelWrapper 
                                labelText="Country"
                                inputName="country"
                                value={clientAddress.country}
                                onChange={(e) => handleInvoiceChange(e, 'clientAddress')}
                            />
                        </FlexWrapper>
                    </FieldSet>
                    <FieldSet $name='dateDescription'>
                        
                       // select + datePicker here //
                        <InputLabelWrapper 
                            labelText="Project Description"
                            inputName="description"
                            value={newInvoice.description}
                            onChange={(e) => handleInvoiceChange(e, 'newInvoice')}
                        />
                    </FieldSet>
                    <ItemsFieldSet>
                        <Legend>Item List</Legend>

                    </ItemsFieldSet>
                </Form>
            </MainWrapper>
        </>
    );

    return createPortal(controller, document.body);
};

export default FormController;

interface InputLabelWrapperProps {
    labelText: string;
    inputName: string;
    value: string;
    onChange: (e: ChangeEventInputType) => void;
}

interface SelectLabelWrapperProps {
    labelText: string;
    onChange: (e: ChangeEventSelectType) => void;
}

const InputLabelWrapper = (props: InputLabelWrapperProps) => {
    return (
        <StyledInputLabelWrapper>
            <Label>{props.labelText}</Label>
            <Input 
                name={props.inputName}
                value={props.value}
                onChange={props.onChange}
            />
        </StyledInputLabelWrapper>
    )
};

const SelectLabelWrapper = (props: SelectLabelWrapperProps) => {
    return (
        <StyledInputLabelWrapper>
            <Label>{props.labelText}</Label>
            <Select>
                // style option
                <option value=''></option>
                <option value=''></option>
                <option value=''></option>
                <option value=''></option>
            </Select>
        </StyledInputLabelWrapper>
    )
}

const FlexWrapper = (props: { children: React.ReactNode }) => {
    return (
        <StyledFlexWrapper>
            {props.children}
        </StyledFlexWrapper>
    )
};