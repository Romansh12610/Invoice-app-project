import { MainWrapper, Form, Input, Label, Title, FieldSet, Legend, Backdrop, InputLabelWrapper } from "../styledComponents/FormInvoiceStyled";
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
    const { isInvoiceEdited } = globalState;

    useEffect(() => {
        // prevent scroll when modal is active
        document.body.style.overflow = 'hidden';
        // focus trap
        const keySet: keySetType = new Set();
        const closeFormCallback = () => dispatchAction({ type: 'closeForm' });

        const onKeyDown = (e: KeyboardEvent) => focusTrapKeyDown(e, modalRef, closeFormCallback, keySet);
        const onKeyUp = (e: KeyboardEvent) => focusTrapKeyUp(e, keySet);

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            // enable scrolling after modal closing
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
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
                        <InputLabelWrapper $gridArea="street">
                            <Label>Street Address</Label>
                            <Input />
                        </InputLabelWrapper>
                    </FieldSet>
                </Form>
            </MainWrapper>
        </>
    );

    return createPortal(controller, document.body);
};

export default FormController;