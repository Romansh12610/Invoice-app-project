import { Variants } from "framer-motion";

export const mainContentVariants: Variants = {

}

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
    }
} 