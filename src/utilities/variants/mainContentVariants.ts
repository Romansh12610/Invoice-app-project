import { Variants } from "framer-motion";

export const headerVariants: Variants = {
    initial: {
        x: -200,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 0.5,
            bounce: 0.5,
            stiffness: 100,
            damping: 10
        }
    },
    exit: {
        x: [0, 80, 190], 
        opacity: [1, 0.2, 0],
        transition: {
            type: 'spring',
            duration: 0.5,
            stiffness: 50,
        }
    }
} 