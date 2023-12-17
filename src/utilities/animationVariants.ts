// filter
import { Variants } from "framer-motion";

export const filterListVariants: Variants = {
    visible: {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        transition: {
            type: 'spring',
            duration: 0.6,
            delayChildren: 0.3,
            staggerChildren: 0.2,
        }
    },
    hidden: {
        clipPath: "inset(10% 50% 90% 50% round 10px)",
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.3,
            when: 'afterChildren'
        }
    }
};

export const filterItemVariants: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            bounce: 0.5,
            damping: 15,
            duration: 0.5
        }
    },
    hidden: {
        opacity: 0,
        y: -50,
        transition: {
            opacity: {
                duration: 0.15
            },
            y: {
                duration: 0.3,
                stiffness: 200
            }
        }
    }
}