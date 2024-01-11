import { FooterWrapper, DiscardBtn, SaveDraftBtn, SaveSendBtn } from "../styledComponents/FormFooterStyled";
import buttonVariants from "../utilities/buttonVariants";
import { motion } from "framer-motion";
import { useGlobalContext } from "./ContextWrapper";
import { SubmitInvoiceForm, ActionTypes } from "../hooks/useManageInvoices";

interface FormFooterProps {
    formRef: React.RefObject<HTMLFormElement>;
    submitInvoiceForm: SubmitInvoiceForm;
    setShouldShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

// types of handlers
type SafeBtnClick = (e: React.MouseEvent<HTMLButtonElement & { name: ActionTypes }, MouseEvent>) => void;

const FormFooter = (props: FormFooterProps) => {

    const { globalState } = useGlobalContext();
    const { isInvoiceEdited } = globalState;

    // handlers
    const handleSaveBtnClick: SafeBtnClick = (e) => {
        e.preventDefault();

        console.log('FormFooter: isEdited: ' + isInvoiceEdited);

        props.submitInvoiceForm(e, props.formRef, props.setShouldShowError);
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
            >Discard</DiscardBtn>
            { isInvoiceEdited === false && <SaveDraftBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
                name='draft'
                form="invoice-form"
            >Save as Draft</SaveDraftBtn> }
            <SaveSendBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
                name={isInvoiceEdited ? 'save' : 'add'}
                form="invoice-form"

                onClick={handleSaveBtnClick}
            >Save & Send</SaveSendBtn>
        </FooterWrapper>
    )
};


export default FormFooter;