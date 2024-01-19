import { Variants } from "framer-motion";


const closingClipPath = 'inset(50% 50% 50% 50% round 20px)';

const modalVariants: Variants = {
    initial: {
        clipPath: closingClipPath,
        filter: 'blur(10px)',
    },
    animate: {
        clipPath: 'inset(0 0 0 0 round 20px)',
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: 'circInOut',
        }
    },
    exit: {
        clipPath: closingClipPath,
        transition: {
            duration: 0.4,
            ease: 'circIn'
        }
    }
};

export default modalVariants;