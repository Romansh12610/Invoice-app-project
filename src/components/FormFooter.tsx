import { FooterWrapper, DiscardBtn, SaveDraftBtn, SaveSendBtn } from "../styledComponents/FormFooterStyled";
import buttonVariants from "../utilities/variants/buttonVariants";
import { motion } from "framer-motion";
import { useGlobalContext } from "./ContextWrapper";
import { SubmitInvoiceForm, ActionTypes } from "../hooks/useManageInvoices";

interface FormFooterProps {
    formRef: React.RefObject<HTMLFormElement>;
    submitInvoiceForm: SubmitInvoiceForm;
    setShouldShowError: React.Dispatch<React.SetStateAction<boolean>>;
    exitAnimationCallback: () => void;
}

// types of handlers
type SubmitBtnClick = (e: React.MouseEvent<HTMLButtonElement & { name: ActionTypes }, MouseEvent>) => void;

const FormFooter = (props: FormFooterProps) => {

    const { globalState } = useGlobalContext();
    const { isInvoiceEdited } = globalState;

    // handler
    const handleSubmitBtnClick: SubmitBtnClick = (e) => {
        e.preventDefault();

        props.submitInvoiceForm(e, props.formRef, props.setShouldShowError, props.exitAnimationCallback);
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
            >Save & Send</SaveSendBtn>
        </FooterWrapper>
    )
};


export default FormFooter;