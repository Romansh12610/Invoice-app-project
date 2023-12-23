import { MainWrapper, Form, Input, Label, Title, FieldSet, Legend, Backdrop, StyledInputLabelWrapper, ItemsFieldSet, StyledFlexWrapper } from "../styledComponents/FormInvoiceStyled";
import { useGlobalContext } from "./ContextWrapper";
import { useParams } from "react-router-dom";
import {createPortal} from 'react-dom';
import GoBackLink from "../shared/goBackLink";
import { useEffect, useRef } from 'react';
import { focusTrapKeyDown, focusTrapKeyUp, keySetType, closeModalIfOutsideClick } from "../utilities/modalUtilities";


const FormController = () => {

    // refs for Backdrop and Form
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    const URLparams = useParams();
    const { globalState, dispatchAction } = useGlobalContext();
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
                        />
                        <FlexWrapper>
                            <InputLabelWrapper 
                                labelText="City"
                                inputName="city"
                            />
                            <InputLabelWrapper 
                                labelText="Post Code"
                                inputName="postCode"
                            />
                            <InputLabelWrapper 
                                labelText="Country"
                                inputName="country"
                            />
                        </FlexWrapper>
                    </FieldSet>
                    <FieldSet $name="clientAddress">
                        <Legend>Bill to</Legend>
                        <InputLabelWrapper 
                            labelText="Client's Name"
                            inputName="clientName"
                        />
                        <InputLabelWrapper 
                            labelText="Client's email"
                            inputName="clientEmail"
                        />
                        <InputLabelWrapper 
                            labelText="Street Address"
                            inputName="street"
                        />
                        <FlexWrapper>
                            <InputLabelWrapper 
                                labelText="City"
                                inputName="city"
                            />
                            <InputLabelWrapper 
                                labelText="Post Code"
                                inputName="postCode"
                            />
                            <InputLabelWrapper 
                                labelText="Country"
                                inputName="country"
                            />
                        </FlexWrapper>
                    </FieldSet>
                    <FieldSet $name='dateDescription'>
                        <InputLabelWrapper 
                            labelText="Invoice Date"
                            inputName="date"
                        />
                       // select + datePicker here //
                        <InputLabelWrapper 
                            labelText="Project Description"
                            inputName="description"
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
}

const InputLabelWrapper = (props: InputLabelWrapperProps) => {
    return (
        <StyledInputLabelWrapper>
            <Label>{props.labelText}</Label>
            <Input 
                name={props.inputName}
            />
        </StyledInputLabelWrapper>
    )
};

const FlexWrapper = (props: { children: React.ReactNode }) => {
    return (
        <StyledFlexWrapper>
            {props.children}
        </StyledFlexWrapper>
    )
};