import { Variants } from "framer-motion";

const initClipPath = 'inset(10% 50% 90% 50% round 15px)';

export const invoiceListVariants: Variants = {
    initial: {
        opacity: 0,
        clipPath: initClipPath,
    },
    animate: {
        opacity: 1,
        clipPath: 'inset(0 0 0 0)',
        transition: {
            duration: 0.7,
            delayChildren: 1,
            staggerChildren: 0.4,
        }
    },
    exit: {
        opacity: 0,
        clipPath: initClipPath,
        transition: {
            duration: 0.5,
            when: 'afterChildren'
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
            mass: 0.5
        } 
    },
    exit: {
        x: [0, 50, 150],
        opacity: [1, 0.3, 0],
        transition: {
            type: 'spring',
            duration: 0.5,
            mass: 0.5,

            layout: {
                duration: 0.5,
                type: 'spring',
                mass: 0.5
            }
        }
    }
};