import { Variants } from "framer-motion";

const getFormVariants = () => {

    const formVariants: Variants = {
        animate: {
            x: 0,
            transition: {
                duration: 1.2,
                type: 'spring',
                ease: 'easeIn',
                stiffness: 110,
                damping: 20,
                bounce: 0,
            }
        },
        exit: {
            x: -800,
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            }
        },
        initial: {
            x: -750
        }
    };

    return formVariants;
};

export default getFormVariants;