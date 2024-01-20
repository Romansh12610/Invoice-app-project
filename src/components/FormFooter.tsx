import { FooterWrapper, DiscardBtn, SaveDraftBtn, SaveSendBtn } from "../styledComponents/FormFooterStyled";
import buttonVariants from "../utilities/variants/buttonVariants";
import { useGlobalContext } from '../hooks/useGlobalContext';
import { submitInvoiceForm, ActionTypes } from "../utilities/submitForm";
import { InvoicePayload, RestoreCallback } from "../interfaces/reducerTypes";
import { InvoiceListDispatchType } from "../interfaces/invoiceTypes";
// modal logic
import Modal from "./Modal";
import { useState, useEffect, useCallback } from 'react';

interface FormFooterProps {
    formRef: React.RefObject<HTMLFormElement>;
    formState: InvoicePayload;
    setShouldShowError: React.Dispatch<React.SetStateAction<boolean>>;
    dispatchAction: InvoiceListDispatchType;
    restoreCallback: RestoreCallback;
    exitAnimationCallback: () => void;
    editedInvoiceId: null | string;
}

// types of handlers
export type ButtonClick = (e: React.MouseEvent<HTMLButtonElement & { name: ActionTypes }, MouseEvent>) => void;

const FormFooter = (props: FormFooterProps) => {

    const { globalState, dispatchAction } = useGlobalContext();
    const { isInvoiceEdited, isModalOpen } = globalState;

    // discard & draft handlers
    const handleButtonClick: ButtonClick = useCallback((e) => {
        e.preventDefault();

        const { currentTarget } = e;

        submitInvoiceForm(currentTarget, props.formState, props.formRef, props.setShouldShowError, props.dispatchAction, props.restoreCallback, props.exitAnimationCallback, props.editedInvoiceId);
    }, 
    [props.formState, props.formRef, props.setShouldShowError, props.dispatchAction, props.restoreCallback, props.exitAnimationCallback, props.editedInvoiceId]);

    // submit button click + modal
    const [isSubmitModalOpen, setisSubmitModalOpen] = useState(false);

    const handleSubmitBtnClick: ButtonClick = (e) => {
        e.preventDefault();

        setisSubmitModalOpen(true);
        dispatchAction({
            type: 'openModal'
        });
    };

    useEffect(() => {
        if (!isModalOpen && isSubmitModalOpen) {
            setisSubmitModalOpen(false);
        }
    }, [isModalOpen]);

    return (
        <>
            <FooterWrapper>
                <DiscardBtn
                    variants={buttonVariants}
                    whileHover={'hover'}
                    whileTap={'tap'}
                    name='discard'
                    form="invoice-form"

                    onClick={handleButtonClick}
                >Discard</DiscardBtn>
                { isInvoiceEdited === false && <SaveDraftBtn
                    variants={buttonVariants}
                    whileHover={'hover'}
                    whileTap={'tap'}
                    name='draft'
                    form="invoice-form"

                    onClick={handleButtonClick}
                >Save as Draft</SaveDraftBtn> }
                <SaveSendBtn
                    variants={buttonVariants}
                    whileHover={'hover'}
                    whileTap={'tap'}
                    name={isInvoiceEdited ? 'save' : 'add'}
                    form="invoice-form"

                    onClick={handleSubmitBtnClick}
                >Save {isInvoiceEdited ? 'Changes' : '& Send'}</SaveSendBtn>
            </FooterWrapper>
            {/* Modal open logic */}
            {isModalOpen && (
                <Modal 
                    mod="SAVE_CHANGES"               
                    id={props.editedInvoiceId}
                    customActiveBtnClickCallback={handleButtonClick}
                    customBtnName='save' 
                />)}
        </>
    )
};


export default FormFooter;