import { Variants } from "framer-motion";

export const invoiceListVariants: Variants = {
    initial: {
        opacity: 0,
        y: 500,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            duration: 0.5,
            stiffness: 100,
            bounce: 0.3,
            damping: 13,
            delayChildren: 2
        }
    }
};

export const invoiceItemVariants: Variants = {
    initial: {
        x: -200,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 0.6,
            stiffness: 100,
            bounce: 0.6,
            damping: 17,
        } 
    },
    exit: {
        x: [0, 50, 150],
        opacity: [1, 0.3, 0],
        transition: {
            type: 'spring',
            duration: 0.5,
            stiffness: 100,
            bounce: 0.3,
            damping: 13,

            layout: {
                duration: 0.5,
                type: 'spring',
            }
        }
    }
};