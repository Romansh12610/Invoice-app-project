import { MainWrapper, Form, Input, Label, Title, FieldSet, Legend, Backdrop, StyledInputLabelWrapper, ItemsFieldSet } from "../styledComponents/FormInvoiceStyled";
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
        console.log('is form open: ', isFormOpen);

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
        const handleOutsideClick = (e: MouseEvent) => closeModalIfOutsideClick(e, modalRef, closeFormCallback);
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
                    <FieldSet $name='user-address'>
                        <Legend>Bill from</Legend>
                        <InputLabelWrapper 
                            gridArea="street"
                            labelText="StreetAddress"
                        />
                        <InputLabelWrapper 
                            gridArea="city"
                            labelText="City"
                        />
                        <InputLabelWrapper 
                            gridArea="postCode"
                            labelText="Post Code"
                        />
                        <InputLabelWrapper 
                            gridArea="country"
                            labelText="Country"
                        />
                    </FieldSet>
                    <FieldSet $name="client-address">
                        <Legend>Bill to</Legend>
                        <InputLabelWrapper 
                            gridArea="name"
                            labelText="Client's Name"
                        />
                        <InputLabelWrapper 
                            gridArea="email"
                            labelText="Client's email"
                        />
                        <InputLabelWrapper 
                            gridArea="street"
                            labelText="Street Address"
                        />
                        <InputLabelWrapper 
                            gridArea="city"
                            labelText="City"
                        />
                        <InputLabelWrapper 
                            gridArea="postCode"
                            labelText="Post Code"
                        />
                        <InputLabelWrapper 
                            gridArea="country"
                            labelText="Country"
                        />
                    </FieldSet>
                    <FieldSet $name='date-description'>
                        <InputLabelWrapper 
                            gridArea="date"
                            labelText="Invoice Date"
                        />
                       // select + datePicker here //
                        <InputLabelWrapper 
                            gridArea="description"
                            labelText="Project Description"
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
    gridArea: string;
    labelText: string;
}

const InputLabelWrapper = (props: InputLabelWrapperProps) => {
    return (
        <StyledInputLabelWrapper $gridArea={props.gridArea}>
            <Label>{props.labelText}</Label>
            <Input 

            />
        </StyledInputLabelWrapper>
    )
}