import { FooterWrapper, DiscardBtn, SaveDraftBtn, SaveSendBtn } from "../styledComponents/FormFooterStyled";
import buttonVariants from "../utilities/variants/buttonVariants";
import { motion } from "framer-motion";
import { useGlobalContext } from "./ContextWrapper";
import { submitInvoiceForm, ActionTypes } from "../utilities/submitForm";
import { InvoicePayload, RestoreCallback } from "../interfaces/reducerTypes";
import { InvoiceListDispatchType } from "../interfaces/invoiceTypes";

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
type SubmitBtnClick = (e: React.MouseEvent<HTMLButtonElement & { name: ActionTypes }, MouseEvent>) => void;

const FormFooter = (props: FormFooterProps) => {

    const { globalState } = useGlobalContext();
    const { isInvoiceEdited } = globalState;

    // handler
    const handleSubmitBtnClick: SubmitBtnClick = (e) => {
        e.preventDefault();

        submitInvoiceForm(e, props.formState, props.formRef, props.setShouldShowError, props.dispatchAction, props.restoreCallback, props.exitAnimationCallback, props.editedInvoiceId);
    };

    return (
        <FooterWrapper>
            <DiscardBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
                name='discard'
                form="invoice-form"

                onClick={handleSubmitBtnClick}
            >Discard</DiscardBtn>
            { isInvoiceEdited === false && <SaveDraftBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
                name='draft'
                form="invoice-form"

                onClick={handleSubmitBtnClick}
            >Save as Draft</SaveDraftBtn> }
            <SaveSendBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
                name={isInvoiceEdited ? 'save' : 'add'}
                form="invoice-form"

                onClick={handleSubmitBtnClick}
            >Save {isInvoiceEdited ? 'Changes' : '& Send'}</SaveSendBtn>
        </FooterWrapper>
    )
};


export default FormFooter;