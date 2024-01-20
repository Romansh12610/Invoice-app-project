import { Variants } from "framer-motion";

const initClipPath = 'inset(10% 50% 90% 50% round 20px)';
const initBlurFilter = 'blur(10px)';

const MainWrapperVariants: Variants = {
    initial: {
        clipPath: initClipPath,
        filter: initBlurFilter,
    },
    animate: {
        clipPath: 'inset(0 0 0 0)',
        filter: '',
        transition: {
            duration: 0.5,
            ease: 'circInOut',
            staggerChildren: 0.5
        }
    },
    exit: {
        clipPath: initClipPath,
        filter: initBlurFilter,
        transition: {
            duration: 0.4,
            ease: 'circOut',
            when: 'afterChildren'
        }
    }
};

const HeaderBarVariants: Variants = {
    initial: {
        rotateX: 90,
        filter: initBlurFilter, // mb change to opacity later
    },
    animate: {
        rotateX: 0,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            ease: 'circInOut',
            duration: 1,
            mass: 0.5,
            stiffness: 50,
            bounce: 0.15,
            damping: 15
        }
    },
    exit: {
        rotateX: 180,
        opacity: 0,
        transition: {
            type: 'spring',
            duration: 0.6,
            ease: 'easeInOut',
            mass: 0.5,
            stiffness: 50,
            bounce: 0,
            damping: 15
        }
    }
};

const InfoSectionVariants: Variants = {
    initial: {
        transformOrigin: 'center left',
        rotateX: 180,
        opacity: 0
    },
    animate: {
        opacity: [0, 0.8, 1],
        rotateX: [180, 150, 0],
        transition: {
            type: 'spring',
            ease: 'easeInOut',
            duration: 0.7,
            mass: 0.5,
            stiffness: 50,
            bounce: 0.15,
            damping: 15
        }
    },
    exit: {
        rotateY: 180,
        opacity: 0,
        transition: {
            type: 'spring',
            duration: 0.6,
            ease: 'circInOut',
            mass: 0.5,
            stiffness: 50,
            bounce: 0,
            damping: 15
        }
    }
};

export { MainWrapperVariants, HeaderBarVariants, InfoSectionVariants};