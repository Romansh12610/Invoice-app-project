import { styled } from "styled-components";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { createPortal } from "react-dom";
import keyMap from "../utilities/uniqueKeysForAnimation";

export const StyledBackdrop = styled(motion.div)`
    z-index: 98;
    background-color: #000000a7;
    position: fixed;
    top: 0;
    left: 0;
`;

const Backdrop = () => {

    const elementKey = keyMap.get('BACKDROP');

    const component = (
        <AnimatePresence initial={false}>
            <StyledBackdrop
                id="backdrop"
                key={elementKey} 
                layout='position'
                animate='animate'
                exit='exit'
                variants={backdropVariants}
            />
        </AnimatePresence>
    );

    return createPortal(component, document.body);
};

export default Backdrop;

const backdropVariants: Variants = {
    animate: {
        right: 0,
        bottom: 0,
        transition: {
            layout: {
                duration: 0.7,
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    },
    exit: {
        right: '-100vw',
        bottom: '100vh',
        transition: {
            layout: {
                duration: 0.6,
                type: 'spring'
            },
        },
    },
};