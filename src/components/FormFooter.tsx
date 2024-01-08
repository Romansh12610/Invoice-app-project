import { FooterWrapper, DiscardBtn, SaveDraftBtn, SaveSendBtn } from "../styledComponents/FormFooterStyled";
import buttonVariants from "../utilities/buttonVariants";
import { motion } from "framer-motion";
import { useGlobalContext } from "./ContextWrapper";


const FormFooter = () => {

    const { globalState } = useGlobalContext();
    const { isInvoiceEdited } = globalState;

    return (
        <FooterWrapper>
            <DiscardBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
                type='submit'
                name='discard'
                form="invoice-form"
            >Discard</DiscardBtn>
            { isInvoiceEdited === false && <SaveDraftBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
                type='submit'
                name='draft'
                form="invoice-form"
            >Save as Draft</SaveDraftBtn> }
            <SaveSendBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
                type='submit'
                name={isInvoiceEdited ? 'save' : 'add'}
                form="invoice-form"
            >Save & Send</SaveSendBtn>
        </FooterWrapper>
    )
};


export default FormFooter;