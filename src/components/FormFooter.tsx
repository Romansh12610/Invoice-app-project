import { FooterWrapper, DiscardBtn, SaveDraftBtn, SaveSendBtn } from "../styledComponents/FormFooterStyled";
import buttonVariants from "../utilities/buttonVariants";
import { motion } from "framer-motion";

const FormFooter = () => {

    return (
        <FooterWrapper>
            <DiscardBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
            >Discard</DiscardBtn>
            <SaveDraftBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
            >Save as Draft</SaveDraftBtn>
            <SaveSendBtn
                as={motion.button} 
                variants={buttonVariants}
                whileHover={'hover'}
                whileTap={'tap'}
            >Save & Send</SaveSendBtn>
        </FooterWrapper>
    )
};


export default FormFooter;