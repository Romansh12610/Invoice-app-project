import { Variants } from "framer-motion";

const initClipPath = 'inset(10% 50% 90% 50% round 10px)';

export const SelectListVariants: Variants = {
    open: {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        transition: {
            type: 'spring',
            duration: 0.5,
            delayChildren: 0.2,
            staggerChildren: 0.1,
        }
    },
    closed: {
        clipPath: initClipPath,
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.3,
            when: 'afterChildren',
            reverse: true,
        }
    }
};

export const SelectItemVariants: Variants = {
    open: {
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 0.3
        }
    },
    closed: {
        opacity: 0,
        transition: {
            type: 'tween',
            duration: 0.15,
        }
    }
};